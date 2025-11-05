import { useState, useEffect } from 'react';

interface TrafficSheetPageProps {
  user: any;
}

export default function TrafficSheetPage({ user }: TrafficSheetPageProps) {
  const [step, setStep] = useState<'upload' | 'verify' | 'generate'>('upload');
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<any>(null);
  const [deletedRows, setDeletedRows] = useState<Set<number>>(new Set());
  const [manualOverrides, setManualOverrides] = useState<{ [key: number]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Debug: Check if window.electron is available
  useEffect(() => {
    console.log('[TrafficSheet] window.electron available:', !!window.electron);
    if (window.electron) {
      console.log('[TrafficSheet] window.electron methods:', Object.keys(window.electron));
      console.log('[TrafficSheet] writeFile type:', typeof window.electron.writeFile);
    } else {
      console.error('[TrafficSheet] window.electron is not defined!');
      setError('Electron API not available. Please restart the application.');
    }
  }, []);

  const handleSelectFile = async () => {
    setError(null);

    const selectedPath = await window.electron.selectFile([
      { name: 'Excel Files', extensions: ['xlsx', 'xls'] },
    ]);

    if (!selectedPath) return;

    setFilePath(selectedPath);
    setFileName(selectedPath.split(/[/\\]/).pop() || 'unknown');

    // Track upload
    if (user) {
      await window.electron.logger.track({
        user: user.name,
        tool: 'traffic-sheet',
        action: 'file_upload',
        metadata: { filename: selectedPath.split(/[/\\]/).pop() },
      });
    }

    // Preview the file
    setIsProcessing(true);
    try {
      const result = await window.electron.trafficSheet.preview(selectedPath);

      if (!result.success) {
        setError(result.error || 'Failed to preview file');
        setIsProcessing(false);
        return;
      }

      setParsedData(result.data);
      setStep('verify');
    } catch (err: any) {
      setError(err.message || 'Failed to preview file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleToggleRow = (index: number) => {
    setDeletedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleGenerate = async () => {
    if (!filePath) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Track generation attempt
      if (user) {
        await window.electron.logger.track({
          user: user.name,
          tool: 'traffic-sheet',
          action: 'generate',
          metadata: {
            filename: fileName,
            deletedRows: deletedRows.size,
            overrides: Object.keys(manualOverrides).length,
          },
        });
      }

      const result = await window.electron.trafficSheet.generate({
        filePath,
        deletedRows: Array.from(deletedRows),
        manualOverrides,
      });

      if (!result.success) {
        setError(result.error || 'Failed to generate traffic sheet');
        return;
      }

      // Show save dialog
      const savePath = await window.electron.saveFile(`traffic-sheet-${Date.now()}.xlsx`);

      if (!savePath) {
        // User cancelled save
        return;
      }

      // Write the buffer to file
      const writeResult = await window.electron.writeFile(savePath, result.buffer);
      if (!writeResult.success) {
        throw new Error(writeResult.error || 'Failed to write file');
      }

      // Track success
      if (user) {
        await window.electron.logger.track({
          user: user.name,
          tool: 'traffic-sheet',
          action: 'download',
          metadata: { filename: savePath.split(/[/\\]/).pop() },
        });
      }

      // Reset for next file
      setStep('upload');
      setFilePath(null);
      setFileName(null);
      setParsedData(null);
      setDeletedRows(new Set());
      setManualOverrides({});
      alert('Traffic sheet generated successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to generate traffic sheet');

      // Track error
      if (user) {
        await window.electron.logger.track({
          user: user.name,
          tool: 'traffic-sheet',
          action: 'error',
          metadata: { error: err.message },
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Traffic Sheet Automation</h2>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Upload Step */}
      {step === 'upload' && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Upload Blocking Chart</h3>
          <p className="text-gray-600 mb-6">
            Select your blocking chart Excel file to generate a client-ready traffic sheet.
          </p>

          <button
            onClick={handleSelectFile}
            disabled={isProcessing}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Select Blocking Chart'}
          </button>

          {fileName && (
            <div className="mt-4 text-sm text-gray-600">
              Selected: <span className="font-medium">{fileName}</span>
            </div>
          )}
        </div>
      )}

      {/* Verify Step */}
      {step === 'verify' && parsedData && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Verify Data</h3>

          <div className="mb-6">
            <p className="text-gray-700">
              Found <strong>{parsedData.campaignLines?.length || 0}</strong> campaign lines
            </p>
            {parsedData.metadata?.campaignName && (
              <p className="text-gray-600 text-sm mt-1">
                Campaign: {parsedData.metadata.campaignName}
              </p>
            )}
          </div>

          {parsedData.campaignLines && parsedData.campaignLines.length > 0 && (
            <div className="mb-6 max-h-96 overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left">Include</th>
                    <th className="px-3 py-2 text-left">#</th>
                    <th className="px-3 py-2 text-left">Campaign Line</th>
                    <th className="px-3 py-2 text-left">Ad Groups</th>
                    <th className="px-3 py-2 text-left">Creative Lines</th>
                  </tr>
                </thead>
                <tbody>
                  {parsedData.campaignLines.map((line: any, index: number) => (
                    <tr
                      key={index}
                      className={deletedRows.has(index) ? 'bg-red-50 line-through opacity-50' : ''}
                    >
                      <td className="px-3 py-2">
                        <input
                          type="checkbox"
                          checked={!deletedRows.has(index)}
                          onChange={() => handleToggleRow(index)}
                          className="rounded"
                        />
                      </td>
                      <td className="px-3 py-2">{index + 1}</td>
                      <td className="px-3 py-2">{line.tactic || 'N/A'}</td>
                      <td className="px-3 py-2">{line.adGroups?.length || 0}</td>
                      <td className="px-3 py-2">
                        {line.adGroups?.reduce((sum: number, ag: any) => sum + (ag.creativeLines?.length || 0), 0) || 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => {
                setStep('upload');
                setParsedData(null);
                setDeletedRows(new Set());
              }}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleGenerate}
              disabled={isProcessing}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
            >
              {isProcessing ? 'Generating...' : 'Generate Traffic Sheet'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
