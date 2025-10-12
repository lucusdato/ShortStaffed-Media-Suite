export interface ParsedBlockingChartRow {
  channel?: string;
  tactic?: string;
  platform?: string;
  objective?: string;
  placementType?: string;
  adFormat?: string;
  adSize?: string;
  buyType?: string;
  startDate?: string;
  endDate?: string;
  impressions?: number;
  cpm?: number;
  budget?: number;
  flightDates?: string;
  targetAudience?: string;
  creativeName?: string;
  landingPage?: string;
  trackingPixel?: string;
  notes?: string;
  [key: string]: string | number | undefined;
}

export interface ParsedBlockingChart {
  headers: string[];
  rows: ParsedBlockingChartRow[];
  metadata?: {
    campaignName?: string;
    client?: string;
    dateRange?: string;
  };
}

export interface TrafficSheetRow {
  [key: string]: string | number | undefined;
}

export interface ExcelStyleInfo {
  font?: {
    bold?: boolean;
    size?: number;
    color?: { argb?: string };
  };
  fill?: {
    type?: string;
    fgColor?: { argb?: string };
  };
  alignment?: {
    horizontal?: string;
    vertical?: string;
    wrapText?: boolean;
  };
  border?: Record<string, unknown>;
}

