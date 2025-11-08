import { useState, useEffect } from 'react';
import TrafficSheetPage from './pages/TrafficSheetPage';
import UserIdentificationModal from './components/UserIdentificationModal';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [exportStatus, setExportStatus] = useState<string>('');

  useEffect(() => {
    // Check if user is already configured
    window.electron.config.getUser().then((savedUser) => {
      setUser(savedUser);
      setLoading(false);
    });
  }, []);

  const handleUserSet = async (userInfo: any) => {
    await window.electron.config.setUser(userInfo);
    setUser(userInfo);
  };

  const handleExportLogs = async () => {
    setExportStatus('Exporting...');
    try {
      const result = await window.electron.logger.export();

      if (result.canceled) {
        setExportStatus('');
        return;
      }

      if (result.success) {
        setExportStatus(`✓ Exported ${result.stats?.fileCount || 0} log file(s)`);
        setTimeout(() => setExportStatus(''), 3000);
      } else {
        setExportStatus(`✗ Error: ${result.error || 'Unknown error'}`);
        setTimeout(() => setExportStatus(''), 5000);
      }
    } catch (error: any) {
      setExportStatus(`✗ Error: ${error.message}`);
      setTimeout(() => setExportStatus(''), 5000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {!user && <UserIdentificationModal onUserSet={handleUserSet} />}

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">QuickClick MediaTools</h1>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  {user.name} ({user.role})
                </div>
                {exportStatus && (
                  <span className="text-sm text-gray-600">{exportStatus}</span>
                )}
                <button
                  onClick={handleExportLogs}
                  className="text-sm text-blue-600 hover:text-blue-700"
                  disabled={!!exportStatus}
                >
                  Export Analytics
                </button>
                <button
                  onClick={() => setUser(null)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Change User
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-8">
          <TrafficSheetPage user={user} />
        </main>
      </div>
    </>
  );
}

export default App;
