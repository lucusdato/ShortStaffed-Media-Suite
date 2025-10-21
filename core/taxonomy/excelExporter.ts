/**
 * Excel Exporter
 * Generates multi-sheet Excel workbook with taxonomy data
 */

import ExcelJS from 'exceljs';
import { TaxonomyRow } from './types';

/**
 * Export taxonomy data to Excel workbook with 3 sheets
 */
export async function exportTaxonomies(
  rows: TaxonomyRow[],
  sourceFileName?: string
): Promise<ArrayBuffer> {
  const workbook = new ExcelJS.Workbook();

  // Set workbook properties
  workbook.creator = 'Accutics Taxonomy Generator';
  workbook.created = new Date();
  workbook.modified = new Date();

  // Create three sheets
  createCampaignSheet(workbook, rows);
  createLineItemSheet(workbook, rows);
  createCreativeSheet(workbook, rows);

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return buffer as ArrayBuffer;
}

/**
 * Sheet 1: Campaign Level Taxonomies
 */
function createCampaignSheet(workbook: ExcelJS.Workbook, rows: TaxonomyRow[]): void {
  const sheet = workbook.addWorksheet('Campaign Level Taxonomies');

  // Define columns
  sheet.columns = [
    { header: 'Platform', key: 'platform', width: 15 },
    { header: 'Generated Campaign Name', key: 'campaignTaxonomy', width: 60 },
    { header: 'Market Name (PCat)', key: 'marketName', width: 20 },
    { header: 'Brand Name', key: 'brandName', width: 20 },
    { header: 'Campaign Name', key: 'campaignName', width: 30 },
    { header: 'Campaign CN Code', key: 'campaignCnCode', width: 20 },
    { header: 'Campaign Type', key: 'campaignType', width: 15 },
    { header: 'Format Type', key: 'formatType', width: 15 },
    { header: 'Objective', key: 'objective', width: 15 },
    { header: 'Free Text', key: 'campaignFreeText', width: 30 },
    { header: 'Timestamp', key: 'timestamp', width: 20 }
  ];

  // Style header row
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF4A90E2' }
  };
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  // Add data rows
  const timestamp = new Date().toISOString();
  rows.forEach(row => {
    sheet.addRow({
      platform: row.platform,
      campaignTaxonomy: row.taxonomies.campaign,
      marketName: row.marketName,
      brandName: row.brandName,
      campaignName: row.campaignName,
      campaignCnCode: row.campaignCnCode,
      campaignType: row.campaignType,
      formatType: row.formatType,
      objective: row.objective,
      campaignFreeText: row.campaignFreeText || '',
      timestamp
    });
  });

  // Auto-filter
  sheet.autoFilter = {
    from: 'A1',
    to: `K${rows.length + 1}`
  };

  // Freeze top row
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
}

/**
 * Sheet 2: Line Item (Ad Group) Level Taxonomies
 */
function createLineItemSheet(workbook: ExcelJS.Workbook, rows: TaxonomyRow[]): void {
  const sheet = workbook.addWorksheet('Line Item Level Taxonomies');

  // Define columns
  sheet.columns = [
    { header: 'Platform', key: 'platform', width: 15 },
    { header: 'Parent Campaign', key: 'parentCampaign', width: 60 },
    { header: 'Generated Line Item Name', key: 'lineItemTaxonomy', width: 80 },
    { header: 'Buy Model', key: 'buyModel', width: 15 },
    { header: 'Targeting Strategy', key: 'targetingStrategy', width: 20 },
    { header: 'Placement Type', key: 'placementType', width: 20 },
    { header: 'Audience Party', key: 'audienceParty', width: 15 },
    { header: 'Audience Type', key: 'audienceType', width: 15 },
    { header: 'Audience Name', key: 'audienceName', width: 30 },
    { header: 'Gender', key: 'gender', width: 12 },
    { header: 'Age Range', key: 'ageRange', width: 15 },
    { header: 'Device Type', key: 'deviceType', width: 15 },
    { header: 'Trusted Publisher', key: 'trustedPublisher', width: 25 },
    { header: 'Free Text', key: 'lineItemFreeText', width: 30 },
    { header: 'Timestamp', key: 'timestamp', width: 20 }
  ];

  // Style header row
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF50C878' }
  };
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  // Add data rows
  const timestamp = new Date().toISOString();
  rows.forEach(row => {
    sheet.addRow({
      platform: row.platform,
      parentCampaign: row.taxonomies.campaign,
      lineItemTaxonomy: row.taxonomies.lineItem,
      buyModel: row.buyModel,
      targetingStrategy: row.targetingStrategy,
      placementType: row.placementType,
      audienceParty: row.audienceParty,
      audienceType: row.audienceType,
      audienceName: row.audienceName,
      gender: row.gender,
      ageRange: `${row.ageLower}-${row.ageUpper}`,
      deviceType: row.deviceType,
      trustedPublisher: row.trustedPublisher || '',
      lineItemFreeText: row.lineItemFreeText || '',
      timestamp
    });
  });

  // Auto-filter
  sheet.autoFilter = {
    from: 'A1',
    to: `O${rows.length + 1}`
  };

  // Freeze top row
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
}

/**
 * Sheet 3: Creative/Ad Level Taxonomies
 */
function createCreativeSheet(workbook: ExcelJS.Workbook, rows: TaxonomyRow[]): void {
  const sheet = workbook.addWorksheet('Creative Level Taxonomies');

  // Define columns
  sheet.columns = [
    { header: 'Platform', key: 'platform', width: 15 },
    { header: 'Parent Campaign', key: 'parentCampaign', width: 60 },
    { header: 'Parent Line Item', key: 'parentLineItem', width: 80 },
    { header: 'Generated Creative Name', key: 'creativeTaxonomy', width: 80 },
    { header: 'Placement Type', key: 'placementType', width: 20 },
    { header: 'Format Type', key: 'formatType', width: 15 },
    { header: 'Format Size', key: 'formatSize', width: 15 },
    { header: 'Creative Name', key: 'creativeName', width: 30 },
    { header: 'Landing Page Type', key: 'landingPageType', width: 20 },
    { header: 'Retailer', key: 'retailer', width: 20 },
    { header: 'Trusted Publisher', key: 'trustedPublisher', width: 25 },
    { header: 'Influencer', key: 'influencer', width: 25 },
    { header: 'Free Text', key: 'creativeFreeText', width: 30 },
    { header: 'Timestamp', key: 'timestamp', width: 20 }
  ];

  // Style header row
  sheet.getRow(1).font = { bold: true };
  sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFF6B6B' }
  };
  sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

  // Add data rows
  const timestamp = new Date().toISOString();
  rows.forEach(row => {
    sheet.addRow({
      platform: row.platform,
      parentCampaign: row.taxonomies.campaign,
      parentLineItem: row.taxonomies.lineItem,
      creativeTaxonomy: row.taxonomies.creative,
      placementType: row.placementType,
      formatType: row.formatType,
      formatSize: row.formatSize,
      creativeName: row.creativeName,
      landingPageType: row.landingPageType,
      retailer: row.retailer || '',
      trustedPublisher: row.trustedPublisher || '',
      influencer: row.influencer || '',
      creativeFreeText: row.creativeFreeText || '',
      timestamp
    });
  });

  // Auto-filter
  sheet.autoFilter = {
    from: 'A1',
    to: `N${rows.length + 1}`
  };

  // Freeze top row
  sheet.views = [{ state: 'frozen', ySplit: 1 }];
}
