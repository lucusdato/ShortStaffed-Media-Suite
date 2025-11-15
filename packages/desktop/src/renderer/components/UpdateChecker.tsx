/**
 * UPDATE FEATURE - DISABLED FOR PILOT
 *
 * This component is NOT currently imported or used in the application.
 * This is intentional for the test pilot program.
 *
 * To re-enable:
 * 1. Expose update API in src/preload/index.ts
 * 2. Register update IPC handlers in src/main/ipc/index.ts
 * 3. Import and use this component in the Settings or main App component
 */

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
  const [betaChannel, setBetaChannel] = useState<boolean>(false);
  const [updateChannel, setUpdateChannel] = useState<string>('Stable');

  useEffect(() => {
    // Get current version
    window.electron.update.getAppVersion().then(setCurrentVersion);

    // Get beta channel status
    window.electron.update.getBetaChannel().then((data) => {
      setBetaChannel(data.enabled);
      setUpdateChannel(data.channel);
    });

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

    // Listen for beta channel changes
    const unsubscribeBetaChannel = window.electron.update.onBetaChannelChanged((enabled) => {
      setBetaChannel(enabled);
      setUpdateChannel(enabled ? 'Beta' : 'Stable');
    });

    return () => {
      unsubscribeStatus();
      unsubscribeProgress();
      unsubscribeBetaChannel();
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

  const handleToggleBetaChannel = async () => {
    try {
      const result = await window.electron.update.setBetaChannel(!betaChannel);
      if (result.success) {
        setBetaChannel(result.enabled);
        setUpdateChannel(result.channel);
      }
    } catch (err) {
      console.error('Failed to toggle beta channel:', err);
    }
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
          <p className="text-sm text-gray-500">
            Current version: v{currentVersion}
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
              {updateChannel} Channel
            </span>
          </p>
        </div>
        <button
          onClick={handleCheckForUpdates}
          disabled={isChecking || updateStatus === 'checking' || updateStatus === 'downloading'}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isChecking || updateStatus === 'checking' ? 'Checking...' : 'Check for Updates'}
        </button>
      </div>

      {/* Beta Channel Toggle */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label htmlFor="beta-toggle" className="text-sm font-medium text-gray-900 cursor-pointer">
              Enable Beta Updates
            </label>
            <p className="text-xs text-gray-600 mt-1">
              {betaChannel
                ? 'Receive early access to new features and updates (for testing)'
                : 'Only receive stable releases (recommended for daily use)'}
            </p>
          </div>
          <button
            id="beta-toggle"
            onClick={handleToggleBetaChannel}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              betaChannel ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            role="switch"
            aria-checked={betaChannel}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                betaChannel ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
        {betaChannel && (
          <div className="mt-2 pt-2 border-t border-gray-300">
            <p className="text-xs text-orange-600 flex items-start">
              <svg className="w-4 h-4 mr-1 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Beta versions may contain bugs. Only enable if you're helping test new features.
            </p>
          </div>
        )}
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
