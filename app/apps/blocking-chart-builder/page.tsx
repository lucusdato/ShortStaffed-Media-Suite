"use client";

import React, { useState, useCallback } from 'react';
import Button from '@/core/ui/Button';
import { 
  Tactic, 
  Audience, 
  TacticFormData, 
  AudienceFormData,
  createEmptyTactic,
  createEmptyAudience,
  generateId,
  PLATFORM_OPTIONS,
  CHANNEL_OPTIONS,
  OBJECTIVE_OPTIONS,
  DEMO_OPTIONS,
  LANGUAGE_OPTIONS
} from '@/core/excel/blockingChartTypes';
import { 
  calculateDVCost, 
  calculateAdServingCost 
} from '@/core/excel/blockingChartRates';

export default function BlockingChartBuilderPage() {
  const [tactics, setTactics] = useState<Tactic[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  // Add a new tactic
  const addTactic = useCallback(() => {
    const newTactic = createEmptyTactic();
    setTactics(prev => [...prev, newTactic]);
  }, []);

  // Delete a tactic
  const deleteTactic = useCallback((tacticId: string) => {
    setTactics(prev => prev.filter(t => t.id !== tacticId));
  }, []);

  // Add an audience to a tactic
  const addAudience = useCallback((tacticId: string) => {
    const newAudience = createEmptyAudience();
    setTactics(prev => prev.map(t => 
      t.id === tacticId 
        ? { ...t, audiences: [...t.audiences, newAudience] }
        : t
    ));
  }, []);

  // Delete an audience from a tactic
  const deleteAudience = useCallback((tacticId: string, audienceId: string) => {
    setTactics(prev => prev.map(t => 
      t.id === tacticId 
        ? { ...t, audiences: t.audiences.filter(a => a.id !== audienceId) }
        : t
    ));
  }, []);

  // Update tactic shared fields
  const updateTactic = useCallback((tacticId: string, field: keyof Tactic, value: any) => {
    setTactics(prev => prev.map(t => 
      t.id === tacticId 
        ? { ...t, [field]: value }
        : t
    ));
  }, []);

  // Update audience-specific fields
  const updateAudience = useCallback((
    tacticId: string, 
    audienceId: string, 
    field: keyof Audience, 
    value: any
  ) => {
    setTactics(prev => prev.map(t => 
      t.id === tacticId 
        ? {
            ...t,
            audiences: t.audiences.map(a => {
              if (a.id === audienceId) {
                const updatedAudience = { ...a, [field]: value };
                
                // Auto-calculate costs when platform or impressions change
                const fieldName = field as string;
                if (fieldName === 'platform' || fieldName === 'impressionsGrps') {
                  const platform = fieldName === 'platform' ? value : t.platform;
                  const impressions = fieldName === 'impressionsGrps' ? value : a.impressionsGrps;
                  
                  if (platform && impressions && impressions > 0) {
                    updatedAudience.adServing = calculateAdServingCost(platform, impressions);
                    updatedAudience.dvCost = calculateDVCost(platform, impressions);
                    updatedAudience.mediaFeeTotal = (updatedAudience.adServing || 0) + (updatedAudience.dvCost || 0);
                    updatedAudience.workingMediaBudget = (t.mediaCost || 0) + (updatedAudience.mediaFeeTotal || 0);
                  } else {
                    updatedAudience.adServing = null;
                    updatedAudience.dvCost = null;
                    updatedAudience.mediaFeeTotal = null;
                    updatedAudience.workingMediaBudget = null;
                  }
                }
                
                return updatedAudience;
              }
              return a;
            })
          }
        : t
    ));
  }, []);

  // Validate tactics before export
  const validateTactics = (): string[] => {
    const errors: string[] = [];
    
    tactics.forEach((tactic, tacticIndex) => {
      if (!tactic.channel) {
        errors.push(`Tactic ${tacticIndex + 1}: Channel is required`);
      }
      if (!tactic.tactic) {
        errors.push(`Tactic ${tacticIndex + 1}: Tactic name is required`);
      }
      if (!tactic.platform) {
        errors.push(`Tactic ${tacticIndex + 1}: Platform is required`);
      }
      if (!tactic.mediaCost || tactic.mediaCost <= 0) {
        errors.push(`Tactic ${tacticIndex + 1}: Media Cost must be greater than 0`);
      }
      
      // Validate audiences
      tactic.audiences.forEach((audience, audienceIndex) => {
        if (!audience.impressionsGrps || audience.impressionsGrps <= 0) {
          errors.push(`Tactic ${tacticIndex + 1}, Audience ${audienceIndex + 1}: Impressions/GRPs is required and must be greater than 0`);
        }
      });
    });
    
    return errors;
  };

  // Export to Excel
  const exportToExcel = async () => {
    // Validate before export
    const validationErrors = validateTactics();
    if (validationErrors.length > 0) {
      alert(`Please fix the following errors before exporting:\n\n${validationErrors.join('\n')}`);
      return;
    }

    setIsExporting(true);
    try {
      const response = await fetch('/api/blocking-chart/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tactics }),
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'blocking-chart.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export blocking chart. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  // Move tactic up/down
  const moveTactic = useCallback((tacticId: string, direction: 'up' | 'down') => {
    setTactics(prev => {
      const index = prev.findIndex(t => t.id === tacticId);
      if (index === -1) return prev;
      
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      
      const newTactics = [...prev];
      [newTactics[index], newTactics[newIndex]] = [newTactics[newIndex], newTactics[index]];
      return newTactics;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Blocking Chart Builder
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Build your media blocking chart with automatic cost calculations
          </p>
        </div>

        {/* Actions */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <Button onClick={addTactic} variant="primary">
            + Add Tactic
          </Button>
          <Button 
            onClick={exportToExcel} 
            disabled={tactics.length === 0 || isExporting}
            variant="outline"
          >
            {isExporting ? 'Exporting...' : 'Export to Excel'}
          </Button>
        </div>

        {/* Tactics Table View */}
        {tactics.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Blocking Chart Data ({tactics.length} tactics)
              </h3>
            </div>
            
            <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 280px)' }}>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-50 dark:bg-gray-900 z-20">
                      #
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Channel
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tactic
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Accutics Campaign Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Objective
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Placements
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Optimization KPI
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Demo
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Targeting
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Language
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Accutics Ad Set Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      CPM/CPP
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Impressions/GRPs
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Media Cost
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Ad Serving
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      DV Cost
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Media Fee Total
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Working Media Budget
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tactics.flatMap((tactic, tacticIndex) => 
                    tactic.audiences.map((audience, audienceIndex) => {
                      const rowNumber = tactics.slice(0, tacticIndex).reduce((acc, t) => acc + t.audiences.length, 0) + audienceIndex + 1;
                      const isFirstAudience = audienceIndex === 0;
                      
                      return (
                        <tr key={`${tactic.id}-${audience.id}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white sticky left-0 bg-white dark:bg-gray-800 z-10">
                            {rowNumber}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.channel}
                              onChange={(value) => updateTactic(tactic.id, 'channel', value)}
                              type="select"
                              options={CHANNEL_OPTIONS}
                              required
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.tactic}
                              onChange={(value) => updateTactic(tactic.id, 'tactic', value)}
                              type="text"
                              placeholder="e.g., YouTube Shorts"
                              required
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.accuticsCampaignName}
                              onChange={(value) => updateTactic(tactic.id, 'accuticsCampaignName', value)}
                              type="text"
                              placeholder="Campaign name"
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.platform}
                              onChange={(value) => updateTactic(tactic.id, 'platform', value)}
                              type="select"
                              options={PLATFORM_OPTIONS}
                              required
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.objective}
                              onChange={(value) => updateTactic(tactic.id, 'objective', value)}
                              type="select"
                              options={OBJECTIVE_OPTIONS}
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.placements}
                              onChange={(value) => updateTactic(tactic.id, 'placements', value)}
                              type="text"
                              placeholder="e.g., Feed, Stories"
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.optimizationKpi}
                              onChange={(value) => updateTactic(tactic.id, 'optimizationKpi', value)}
                              type="text"
                              placeholder="e.g., CPM, CTR"
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={audience.demo}
                              onChange={(value) => updateAudience(tactic.id, audience.id, 'demo', value)}
                              type="select"
                              options={DEMO_OPTIONS}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={audience.targeting}
                              onChange={(value) => updateAudience(tactic.id, audience.id, 'targeting', value)}
                              type="text"
                              placeholder="e.g., Lookalike 1%"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={audience.language}
                              onChange={(value) => updateAudience(tactic.id, audience.id, 'language', value)}
                              type="select"
                              options={LANGUAGE_OPTIONS}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={audience.accuticsAdSetName}
                              onChange={(value) => updateAudience(tactic.id, audience.id, 'accuticsAdSetName', value)}
                              type="text"
                              placeholder="Ad set name"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={audience.cpmCpp}
                              onChange={(value) => updateAudience(tactic.id, audience.id, 'cpmCpp', value)}
                              type="number"
                              placeholder="0.00"
                              format="currency"
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={audience.impressionsGrps}
                              onChange={(value) => updateAudience(tactic.id, audience.id, 'impressionsGrps', value)}
                              type="number"
                              placeholder="0"
                              format="number"
                              required
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.startDate}
                              onChange={(value) => updateTactic(tactic.id, 'startDate', value)}
                              type="date"
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.endDate}
                              onChange={(value) => updateTactic(tactic.id, 'endDate', value)}
                              type="date"
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <EditableCell
                              value={tactic.mediaCost}
                              onChange={(value) => updateTactic(tactic.id, 'mediaCost', value)}
                              type="number"
                              placeholder="0.00"
                              format="currency"
                              required
                              isFirstAudience={isFirstAudience}
                              rowSpan={isFirstAudience ? tactic.audiences.length : 0}
                            />
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {audience.adServing ? `$${audience.adServing.toFixed(2)}` : '$0.00'}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {audience.dvCost ? `$${audience.dvCost.toFixed(2)}` : '$0.00'}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {audience.mediaFeeTotal ? `$${audience.mediaFeeTotal.toFixed(2)}` : '$0.00'}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {audience.workingMediaBudget ? `$${audience.workingMediaBudget.toFixed(2)}` : '$0.00'}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center gap-2">
                              {isFirstAudience && (
                                <>
                                  <button
                                    onClick={() => addAudience(tactic.id)}
                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                    title="Add Audience"
                                  >
                                    + Add Audience
                                  </button>
                                  <button
                                    onClick={() => moveTactic(tactic.id, 'up')}
                                    disabled={tacticIndex === 0}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move Up"
                                  >
                                    ↑
                                  </button>
                                  <button
                                    onClick={() => moveTactic(tactic.id, 'down')}
                                    disabled={tacticIndex === tactics.length - 1}
                                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Move Down"
                                  >
                                    ↓
                                  </button>
                                  <button
                                    onClick={() => deleteTactic(tactic.id)}
                                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                    title="Delete Tactic"
                                  >
                                    🗑️
                                  </button>
                                </>
                              )}
                              {tactic.audiences.length > 1 && (
                                <button
                                  onClick={() => deleteAudience(tactic.id, audience.id)}
                                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                  title="Delete Audience"
                                >
                                  ×
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tactics.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No tactics added yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start building your blocking chart by adding your first tactic.
            </p>
            <Button onClick={addTactic} variant="primary">
              Add First Tactic
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// EditableCell component for inline editing in table
interface EditableCellProps {
  value: any;
  onChange: (value: any) => void;
  type: 'text' | 'number' | 'select' | 'date';
  placeholder?: string;
  options?: string[];
  required?: boolean;
  format?: 'currency' | 'number';
  isFirstAudience?: boolean;
  rowSpan?: number;
}

function EditableCell({ 
  value, 
  onChange, 
  type, 
  placeholder, 
  options, 
  required, 
  format,
  isFirstAudience,
  rowSpan 
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');

  // Don't render cell if it's not the first audience and should be hidden
  if (!isFirstAudience && rowSpan === 0) {
    return null;
  }

  const handleSave = () => {
    let processedValue = editValue;
    
    if (type === 'number') {
      processedValue = editValue ? parseFloat(editValue) : null;
    } else if (type === 'text' && !editValue) {
      processedValue = '';
    }
    
    onChange(processedValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditValue(value || '');
      setIsEditing(false);
    }
  };

  const displayValue = () => {
    if (value === null || value === undefined || value === '') {
      return placeholder || '';
    }
    
    if (format === 'currency' && typeof value === 'number') {
      return `$${value.toFixed(2)}`;
    }
    
    if (format === 'number' && typeof value === 'number') {
      return value.toLocaleString();
    }
    
    if (type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }
    
    return value;
  };

  const cellClassName = `w-full text-sm ${
    required && (!value || value === '') 
      ? 'text-red-600 dark:text-red-400' 
      : 'text-gray-900 dark:text-white'
  }`;

  if (isEditing) {
    return (
      <div className="w-full">
        {type === 'select' ? (
          <select
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full px-2 py-1 border border-blue-500 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">{placeholder || 'Select...'}</option>
            {options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder={placeholder}
            className="w-full px-2 py-1 border border-blue-500 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        )}
      </div>
    );
  }

  return (
    <div 
      className={`${cellClassName} cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 rounded min-h-[32px] flex items-center`}
      onClick={() => {
        setEditValue(value || '');
        setIsEditing(true);
      }}
      style={rowSpan && rowSpan > 1 ? { 
        display: 'table-cell',
        verticalAlign: 'middle'
      } : undefined}
    >
      {displayValue()}
    </div>
  );
}
