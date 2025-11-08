import { useState, useEffect } from 'react';

interface TrafficSheetPageProps {
  user: any;
}

export default function TrafficSheetPage({ user }: TrafficSheetPageProps) {
  const [filePath, setFilePath] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
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
    const selectedFileName = selectedPath.split(/[/\\]/).pop() || 'unknown';
    setFileName(selectedFileName);

    // Track upload
    if (user) {
      await window.electron.logger.track({
        user: user.name,
        tool: 'traffic-sheet',
        action: 'file_upload',
        metadata: { filename: selectedFileName },
      });
    }

    // Generate traffic sheet immediately
    await handleGenerate(selectedPath, selectedFileName);
  };

  const handleGenerate = async (inputFilePath: string, inputFileName: string) => {
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
            filename: inputFileName,
          },
        });
      }

      const result = await window.electron.trafficSheet.generate({
        filePath: inputFilePath,
        deletedRows: [],
        manualOverrides: {},
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
      setFilePath(null);
      setFileName(null);
      alert('Traffic sheet has been successfully generated!\n\nRemember to:\n  • Confirm all required tactics are present\n  • Verify categorization across tabs');
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
          {isProcessing ? 'Generating Traffic Sheet...' : 'Select Blocking Chart'}
        </button>

        {fileName && (
          <div className="mt-4 text-sm text-gray-600">
            {isProcessing ? (
              <span>Processing: <span className="font-medium">{fileName}</span></span>
            ) : (
              <span>Last file: <span className="font-medium">{fileName}</span></span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
