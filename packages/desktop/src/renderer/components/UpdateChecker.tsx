import React, { useState, useEffect } from 'react';

interface UpdateInfo {
  version: string;
  releaseDate: string;
  releaseNotes?: string;
}

interface UpdateProgress {
  percent: number;
  transferred: number;
  total: number;
}

type UpdateStatus =
  | 'idle'
  | 'checking'
  | 'available'
  | 'not-available'
  | 'downloading'
  | 'downloaded'
  | 'error';

export function UpdateChecker() {
  const [currentVersion, setCurrentVersion] = useState<string>('');
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>('idle');
  const [updateInfo, setUpdateInfo] = useState<UpdateInfo | null>(null);
  const [progress, setProgress] = useState<UpdateProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    // Get current version
    window.electron.update.getAppVersion().then(setCurrentVersion);

    // Listen for update status changes
    const unsubscribeStatus = window.electron.update.onStatusChanged((data) => {
      setUpdateStatus(data.status);
      setUpdateInfo(data.info);
      setError(data.error);
      setIsChecking(false);
    });

    // Listen for progress updates
    const unsubscribeProgress = window.electron.update.onProgress((data) => {
      setProgress(data);
    });

    return () => {
      unsubscribeStatus();
      unsubscribeProgress();
    };
  }, []);

  const handleCheckForUpdates = async () => {
    setIsChecking(true);
    setError(null);
    try {
      const result = await window.electron.update.checkForUpdates();
      if (!result.success) {
        setError(result.error || 'Failed to check for updates');
        setIsChecking(false);
      }
    } catch (err) {
      setError('Failed to check for updates');
      setIsChecking(false);
    }
  };

  const handleInstallUpdate = () => {
    window.electron.update.quitAndInstall();
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">App Updates</h3>
          <p className="text-sm text-gray-500">Current version: v{currentVersion}</p>
        </div>
        <button
          onClick={handleCheckForUpdates}
          disabled={isChecking || updateStatus === 'checking' || updateStatus === 'downloading'}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isChecking || updateStatus === 'checking' ? 'Checking...' : 'Check for Updates'}
        </button>
      </div>

      {/* Status Messages */}
      {updateStatus === 'available' && updateInfo && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-900">
            <strong>Update available:</strong> Version {updateInfo.version}
          </p>
          <p className="text-xs text-blue-700 mt-1">
            Downloading update in the background...
          </p>
        </div>
      )}

      {updateStatus === 'downloading' && progress && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-blue-900">Downloading update...</p>
            <p className="text-xs text-blue-700">
              {formatBytes(progress.transferred)} / {formatBytes(progress.total)}
            </p>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.round(progress.percent)}%` }}
            />
          </div>
          <p className="text-xs text-blue-700 mt-1 text-center">
            {Math.round(progress.percent)}%
          </p>
        </div>
      )}

      {updateStatus === 'downloaded' && updateInfo && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-900 mb-2">
            <strong>Update ready to install:</strong> Version {updateInfo.version}
          </p>
          <p className="text-xs text-green-700 mb-3">
            The update has been downloaded and will be installed when you quit the app. Or click the button below to restart now.
          </p>
          <button
            onClick={handleInstallUpdate}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Restart and Install Update
          </button>
        </div>
      )}

      {updateStatus === 'not-available' && (
        <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <p className="text-sm text-gray-700">
            You're running the latest version!
          </p>
        </div>
      )}

      {updateStatus === 'error' && error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-900">
            <strong>Error:</strong> {error}
          </p>
          <p className="text-xs text-red-700 mt-1">
            Please try again later or check your internet connection.
          </p>
        </div>
      )}

      {/* Help text */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Updates are checked automatically when you start the app. When an update is available,
          it will be downloaded in the background and installed the next time you quit the app.
        </p>
      </div>
    </div>
  );
}
