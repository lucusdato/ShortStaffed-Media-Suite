/**
 * Analytics Tracker
 *
 * Client-side utilities for tracking user actions and file uploads.
 * All tracking is done asynchronously and won't block the UI.
 */

import { getUserIdentity, getSessionId } from './localStorage';
import { extractBrandFromFilename } from './brandDirectory';
import {
  ToolName,
  ActionType,
  TrackEventRequest,
  TrackFileUploadRequest,
} from './types';

// ============================================================================
// Track Event
// ============================================================================

export async function trackEvent(
  toolName: ToolName,
  action: ActionType,
  metadata?: Record<string, any>
): Promise<boolean> {
  try {
    const identity = getUserIdentity();
    if (!identity) {
      console.warn('Cannot track event: User not identified');
      return false;
    }

    const sessionId = getSessionId();

    const payload: TrackEventRequest = {
      user_id: identity.userId,
      session_id: sessionId,
      tool_name: toolName,
      action,
      metadata,
    };

    const response = await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Tracking failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to track event:', error);
    return false;
  }
}

// ============================================================================
// Track File Upload
// ============================================================================

export async function trackFileUpload(
  toolName: ToolName,
  file: File,
  metadata?: {
    campaign_name?: string;
    brand_name?: string;
    cn_code?: string;
    row_count?: number;
  }
): Promise<boolean> {
  try {
    const identity = getUserIdentity();
    if (!identity) {
      console.warn('Cannot track file upload: User not identified');
      return false;
    }

    // Auto-detect brand name from filename if not provided
    const detectedBrand = metadata?.brand_name || extractBrandFromFilename(file.name);

    if (detectedBrand) {
      console.log(`🏷️  Brand detected from filename: ${detectedBrand}`);
    }

    const payload: TrackFileUploadRequest = {
      user_id: identity.userId,
      tool_name: toolName,
      filename: file.name,
      file_size: file.size,
      file_type: file.name.split('.').pop() || 'unknown',
      ...metadata,
      brand_name: detectedBrand || metadata?.brand_name, // Use detected brand if available
    };

    const response = await fetch('/api/analytics/track-upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`File upload tracking failed: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to track file upload:', error);
    return false;
  }
}

// ============================================================================
// Track Page View
// ============================================================================

export async function trackPageView(toolName: ToolName): Promise<boolean> {
  return trackEvent(toolName, 'page_view');
}

// ============================================================================
// Track Error
// ============================================================================

export async function trackError(
  toolName: ToolName,
  errorMessage: string,
  errorContext?: {
    filename?: string;
    errorType?: string;
    step?: string;
    stackTrace?: string;
  }
): Promise<boolean> {
  try {
    const identity = getUserIdentity();
    if (!identity) {
      console.warn('Cannot track error: User not identified');
      return false;
    }

    const metadata = {
      error_message: errorMessage,
      error_type: errorContext?.errorType || 'unknown_error',
      filename: errorContext?.filename,
      step: errorContext?.step,
      stack_trace: errorContext?.stackTrace,
      timestamp: new Date().toISOString(),
    };

    console.error(`❌ Error tracked: ${errorMessage}`, metadata);

    return trackEvent(toolName, 'error', metadata);
  } catch (error) {
    console.error('Failed to track error:', error);
    return false;
  }
}

// ============================================================================
// Convenience Tracking Functions
// ============================================================================

export const Analytics = {
  // Traffic Sheet Automation
  trafficSheetFileUpload: (file: File) =>
    trackFileUpload('Traffic Sheet Automation', file),
  trafficSheetPreview: () =>
    trackEvent('Traffic Sheet Automation', 'preview_data'),
  trafficSheetGenerate: () =>
    trackEvent('Traffic Sheet Automation', 'generate'),
  trafficSheetDownload: () =>
    trackEvent('Traffic Sheet Automation', 'download'),
  trafficSheetError: (errorMessage: string, filename?: string, errorType?: string) =>
    trackError('Traffic Sheet Automation', errorMessage, { filename, errorType }),

  // Taxonomy Generator
  taxonomyMetadataSubmit: (metadata: {
    campaign_name?: string;
    brand_name?: string;
    cn_code?: string;
  }) =>
    trackEvent('Taxonomy Generator', 'metadata_submit', metadata),
  taxonomyFileUpload: (
    file: File,
    metadata?: {
      campaign_name?: string;
      brand_name?: string;
      cn_code?: string;
    }
  ) => trackFileUpload('Taxonomy Generator', file, metadata),
  taxonomyGenerate: (rowCount?: number) =>
    trackEvent('Taxonomy Generator', 'generate', { row_count: rowCount }),
  taxonomyExport: (format: string) =>
    trackEvent('Taxonomy Generator', 'export', { format }),
  taxonomyCopyTSV: () =>
    trackEvent('Taxonomy Generator', 'copy_tsv'),
  taxonomyError: (errorMessage: string, filename?: string, errorType?: string) =>
    trackError('Taxonomy Generator', errorMessage, { filename, errorType }),

  // Home Page
  homePageView: () => trackPageView('Home Page'),

  // Generic
  trackEvent,
  trackFileUpload,
  trackPageView,
  trackError,
};
