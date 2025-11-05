/**
 * Auto-Correction Utilities for QuickClick Media Tools
 *
 * Provides intelligent auto-correction for common data quality issues:
 * - Date format normalization
 * - Numeric value extraction from formatted strings
 * - Platform name normalization
 * - Whitespace trimming
 *
 * All functions return corrected values with confidence scores to allow
 * user review before applying corrections.
 */

export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface CorrectionResult<T = string> {
  original: any;
  corrected: T;
  confidence: ConfidenceLevel;
  changed: boolean;
  method?: string;
  warning?: string;
}

// ============================================================================
// PLATFORM NAME NORMALIZATION
// ============================================================================

/**
 * Platform aliases map - normalized name to array of variations
 */
export const PLATFORM_ALIASES: Record<string, string[]> = {
  'Meta': ['Facebook', 'FB', 'Instagram', 'IG', 'Insta', 'Meta'],
  'TradeDesk': ['Trade Desk', 'TTD', 'TheTradeDesk', 'The Trade Desk', 'TradeDesk'],
  'TikTok': ['Tik Tok', 'TikTok', 'Tik-Tok'],
  'Snapchat': ['Snap', 'Snapchat', 'SnapChat'],
  'Pinterest': ['Pin', 'Pinterest'],
  'Reddit': ['Reddit'],
  'Amazon': ['Amazon DSP', 'AMZ', 'ADSP', 'Amazon', 'Amazon Ads'],
  'DV360': ['Display & Video 360', 'DV 360', 'DV360', 'Google DV360', 'Display and Video 360'],
  'YouTube': ['YouTube', 'Youtube', 'You Tube', 'YT'],
  'LinkedIn': ['LinkedIn', 'Linkedin', 'Linked In'],
  'Twitter': ['Twitter', 'X', 'X.com'],
  'Spotify': ['Spotify'],
  'Pandora': ['Pandora'],
};

/**
 * Normalizes platform names to standard format
 * Examples: "Facebook" → "Meta", "TTD" → "TradeDesk"
 */
export function normalizePlatformName(value: string | null | undefined): CorrectionResult {
  if (!value || typeof value !== 'string') {
    return {
      original: value,
      corrected: '',
      confidence: 'high',
      changed: false,
    };
  }

  const trimmed = value.trim();
  const lower = trimmed.toLowerCase();

  // Find matching platform
  for (const [canonical, aliases] of Object.entries(PLATFORM_ALIASES)) {
    for (const alias of aliases) {
      if (alias.toLowerCase() === lower) {
        return {
          original: value,
          corrected: canonical,
          confidence: 'high',
          changed: canonical !== trimmed,
          method: canonical !== trimmed ? 'normalized' : 'exact_match',
        };
      }
    }
  }

  // No match found - return trimmed value
  return {
    original: value,
    corrected: trimmed,
    confidence: 'high',
    changed: trimmed !== value,
    method: trimmed !== value ? 'trimmed' : 'unchanged',
    warning: 'Platform name not recognized - using as-is',
  };
}

// ============================================================================
// DATE FORMAT NORMALIZATION
// ============================================================================

interface DatePattern {
  regex: RegExp;
  parser: (match: RegExpMatchArray) => { year: number; month: number; day: number } | null;
  confidence: ConfidenceLevel;
  description: string;
}

/**
 * Supported date format patterns
 */
const DATE_PATTERNS: DatePattern[] = [
  {
    // YYYY-MM-DD (ISO format - preferred)
    regex: /^(\d{4})-(\d{2})-(\d{2})$/,
    parser: (m) => ({ year: parseInt(m[1]), month: parseInt(m[2]), day: parseInt(m[3]) }),
    confidence: 'high',
    description: 'ISO format (YYYY-MM-DD)',
  },
  {
    // YYYY/MM/DD
    regex: /^(\d{4})\/(\d{2})\/(\d{2})$/,
    parser: (m) => ({ year: parseInt(m[1]), month: parseInt(m[2]), day: parseInt(m[3]) }),
    confidence: 'high',
    description: 'Alternative ISO (YYYY/MM/DD)',
  },
  {
    // M/D/YYYY or MM/DD/YYYY (US format)
    regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    parser: (m) => {
      const month = parseInt(m[1]);
      const day = parseInt(m[2]);
      const year = parseInt(m[3]);

      // Could be ambiguous if both <= 12
      if (month <= 12 && day <= 12) {
        // Assume US format (M/D/YYYY)
        return { year, month, day };
      } else if (month > 12 && day <= 12) {
        // Must be D/M/YYYY
        return { year, month: day, day: month };
      } else if (day > 12 && month <= 12) {
        // Must be M/D/YYYY
        return { year, month, day };
      }
      return null;
    },
    confidence: 'medium',
    description: 'US format (M/D/YYYY) - may be ambiguous',
  },
  {
    // D/M/YYYY or DD/MM/YYYY (EU format)
    regex: /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/,
    parser: (m) => {
      const first = parseInt(m[1]);
      const second = parseInt(m[2]);
      const year = parseInt(m[3]);

      // Prefer EU format if explicitly using this pattern
      if (first <= 31 && second <= 12) {
        return { year, month: second, day: first };
      }
      return null;
    },
    confidence: 'low',
    description: 'EU format (D/M/YYYY) - ambiguous with US',
  },
  {
    // MMM D, YYYY (e.g., "Mar 15, 2025")
    regex: /^([A-Za-z]{3})\s+(\d{1,2}),?\s+(\d{4})$/,
    parser: (m) => {
      const monthMap: Record<string, number> = {
        jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
        jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
      };
      const month = monthMap[m[1].toLowerCase()];
      if (!month) return null;
      return { year: parseInt(m[3]), month, day: parseInt(m[2]) };
    },
    confidence: 'high',
    description: 'Month name format (MMM D, YYYY)',
  },
  {
    // D MMM YYYY (e.g., "15 Mar 2025")
    regex: /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{4})$/,
    parser: (m) => {
      const monthMap: Record<string, number> = {
        jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
        jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
      };
      const month = monthMap[m[2].toLowerCase()];
      if (!month) return null;
      return { year: parseInt(m[3]), month, day: parseInt(m[1]) };
    },
    confidence: 'high',
    description: 'Day first format (D MMM YYYY)',
  },
  {
    // YYYYMMDD (no separators)
    regex: /^(\d{4})(\d{2})(\d{2})$/,
    parser: (m) => ({ year: parseInt(m[1]), month: parseInt(m[2]), day: parseInt(m[3]) }),
    confidence: 'high',
    description: 'Compact format (YYYYMMDD)',
  },
];

/**
 * Validates a date object
 */
function isValidDate(year: number, month: number, day: number): boolean {
  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Check specific month day limits
  const daysInMonth = new Date(year, month, 0).getDate();
  return day <= daysInMonth;
}

/**
 * Formats date as ISO string (YYYY-MM-DD)
 */
function formatISODate(year: number, month: number, day: number): string {
  const yyyy = year.toString();
  const mm = month.toString().padStart(2, '0');
  const dd = day.toString().padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Normalizes date strings to YYYY-MM-DD format
 */
export function normalizeDateFormat(value: any): CorrectionResult {
  // Handle null/undefined
  if (value === null || value === undefined || value === '') {
    return {
      original: value,
      corrected: '',
      confidence: 'high',
      changed: false,
    };
  }

  // Handle Date objects
  if (value instanceof Date) {
    if (isNaN(value.getTime())) {
      return {
        original: value,
        corrected: '',
        confidence: 'high',
        changed: false,
        warning: 'Invalid Date object',
      };
    }
    const formatted = formatISODate(value.getFullYear(), value.getMonth() + 1, value.getDate());
    return {
      original: value,
      corrected: formatted,
      confidence: 'high',
      changed: true,
      method: 'date_object_conversion',
    };
  }

  // Convert to string
  const str = String(value).trim();

  // Try each pattern
  for (const pattern of DATE_PATTERNS) {
    const match = str.match(pattern.regex);
    if (match) {
      const parsed = pattern.parser(match);
      if (parsed && isValidDate(parsed.year, parsed.month, parsed.day)) {
        const formatted = formatISODate(parsed.year, parsed.month, parsed.day);
        return {
          original: value,
          corrected: formatted,
          confidence: pattern.confidence,
          changed: formatted !== str,
          method: pattern.description,
        };
      }
    }
  }

  // No pattern matched
  return {
    original: value,
    corrected: str,
    confidence: 'low',
    changed: false,
    warning: `Date format not recognized. Expected formats: YYYY-MM-DD, M/D/YYYY, MMM D YYYY`,
  };
}

// ============================================================================
// NUMERIC VALUE EXTRACTION
// ============================================================================

/**
 * Extracts numeric value from formatted strings
 * Examples: "$45,000" → 45000, "15.5%" → 15.5
 */
export function extractNumericValue(value: any): CorrectionResult<number | null> {
  // Handle null/undefined/empty
  if (value === null || value === undefined || value === '') {
    return {
      original: value,
      corrected: null,
      confidence: 'high',
      changed: false,
    };
  }

  // Already a number
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      return {
        original: value,
        corrected: null,
        confidence: 'high',
        changed: false,
        warning: 'Invalid number (NaN or Infinity)',
      };
    }
    return {
      original: value,
      corrected: value,
      confidence: 'high',
      changed: false,
    };
  }

  // Convert to string
  const str = String(value).trim();

  // Check for non-numeric placeholders
  const placeholders = ['TBD', 'N/A', 'NA', 'TBC', 'TBA', '-', '--', '—'];
  if (placeholders.includes(str.toUpperCase())) {
    return {
      original: value,
      corrected: null,
      confidence: 'high',
      changed: true,
      method: 'placeholder_removed',
    };
  }

  // Remove currency symbols and separators
  let cleaned = str
    .replace(/[$€£¥₹]/g, '') // Currency symbols
    .replace(/,/g, '')        // Thousand separators
    .trim();

  // Handle percentage
  const isPercentage = cleaned.endsWith('%');
  if (isPercentage) {
    cleaned = cleaned.replace(/%$/, '');
  }

  // Try to parse
  const parsed = parseFloat(cleaned);

  if (isNaN(parsed) || !isFinite(parsed)) {
    return {
      original: value,
      corrected: null,
      confidence: 'high',
      changed: false,
      warning: `Cannot extract number from "${str}"`,
    };
  }

  // Note: We return the percentage value as-is (15.5, not 0.155)
  // The calling code can decide how to interpret it based on context
  return {
    original: value,
    corrected: parsed,
    confidence: 'high',
    changed: parsed !== value,
    method: isPercentage ? 'percentage_parsed' : 'currency_parsed',
  };
}

// ============================================================================
// WHITESPACE TRIMMING
// ============================================================================

/**
 * Trims whitespace from string values
 */
export function trimValue(value: any): CorrectionResult {
  if (value === null || value === undefined) {
    return {
      original: value,
      corrected: '',
      confidence: 'high',
      changed: false,
    };
  }

  if (typeof value !== 'string') {
    return {
      original: value,
      corrected: String(value),
      confidence: 'high',
      changed: false,
    };
  }

  const trimmed = value.trim();
  return {
    original: value,
    corrected: trimmed,
    confidence: 'high',
    changed: trimmed !== value,
    method: trimmed !== value ? 'whitespace_trimmed' : 'unchanged',
  };
}

// ============================================================================
// BATCH CORRECTION
// ============================================================================

export interface FieldCorrection {
  field: string;
  result: CorrectionResult;
}

export interface RowCorrections {
  rowIndex: number;
  corrections: FieldCorrection[];
  hasChanges: boolean;
  highConfidenceChanges: number;
  mediumConfidenceChanges: number;
  lowConfidenceChanges: number;
}

/**
 * Applies auto-corrections to a row of data
 */
export function correctRow(
  row: Record<string, any>,
  rowIndex: number,
  options: {
    trimWhitespace?: boolean;
    normalizeDates?: boolean;
    normalizeNumbers?: boolean;
    normalizePlatforms?: boolean;
  } = {}
): RowCorrections {
  const {
    trimWhitespace = true,
    normalizeDates = true,
    normalizeNumbers = true,
    normalizePlatforms = true,
  } = options;

  const corrections: FieldCorrection[] = [];
  let highConfidenceChanges = 0;
  let mediumConfidenceChanges = 0;
  let lowConfidenceChanges = 0;

  // Key fields that should be trimmed
  const trimFields = ['platform', 'objective', 'tactic', 'channel', 'buyType', 'language'];

  // Date fields
  const dateFields = ['startDate', 'endDate', 'flightStartDate', 'flightEndDate'];

  // Numeric fields
  const numericFields = [
    'budget', 'mediaCost', 'cpmCpp', 'impressionsGrps',
    'adServing', 'dvCost', 'mediaFeeTotal', 'workingMediaBudget'
  ];

  for (const [field, value] of Object.entries(row)) {
    let result: CorrectionResult | null = null;

    // Trim whitespace
    if (trimWhitespace && trimFields.includes(field)) {
      const trimResult = trimValue(value);
      if (trimResult.changed) {
        result = trimResult;
      }
    }

    // Normalize platform names
    if (normalizePlatforms && field === 'platform') {
      const platformResult = normalizePlatformName(value);
      if (platformResult.changed) {
        result = platformResult;
      }
    }

    // Normalize dates
    if (normalizeDates && dateFields.includes(field)) {
      const dateResult = normalizeDateFormat(value);
      if (dateResult.changed || dateResult.warning) {
        result = dateResult;
      }
    }

    // Normalize numbers
    if (normalizeNumbers && numericFields.includes(field)) {
      const numResult = extractNumericValue(value);
      if (numResult.changed || numResult.warning) {
        result = numResult as CorrectionResult;
      }
    }

    // Track correction
    if (result) {
      corrections.push({ field, result });

      if (result.changed) {
        if (result.confidence === 'high') highConfidenceChanges++;
        else if (result.confidence === 'medium') mediumConfidenceChanges++;
        else lowConfidenceChanges++;
      }
    }
  }

  return {
    rowIndex,
    corrections,
    hasChanges: corrections.some(c => c.result.changed),
    highConfidenceChanges,
    mediumConfidenceChanges,
    lowConfidenceChanges,
  };
}

/**
 * Applies corrections to the actual row data
 */
export function applyCorrections(
  row: Record<string, any>,
  corrections: FieldCorrection[]
): Record<string, any> {
  const corrected = { ...row };

  for (const { field, result } of corrections) {
    if (result.changed && result.confidence === 'high') {
      corrected[field] = result.corrected;
    }
  }

  return corrected;
}
