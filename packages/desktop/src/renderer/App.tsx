import { useState, useEffect } from 'react';
import TrafficSheetPage from './pages/TrafficSheetPage';
import UserIdentificationModal from './components/UserIdentificationModal';
import { UpdateChecker } from './components/UpdateChecker';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateChecker, setShowUpdateChecker] = useState(false);
  const [appVersion, setAppVersion] = useState<string>('');

  useEffect(() => {
    // Check if user is already configured
    window.electron.config.getUser().then((savedUser) => {
      setUser(savedUser);
      setLoading(false);
    });

    // Get app version
    window.electron.update.getAppVersion().then(setAppVersion);
  }, []);

  const handleUserSet = async (userInfo: any) => {
    await window.electron.config.setUser(userInfo);
    setUser(userInfo);
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
              {appVersion && (
                <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded">
                  v{appVersion}
                </span>
              )}
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  {user.name} ({user.role})
                </div>
                <button
                  onClick={() => setShowUpdateChecker(!showUpdateChecker)}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {showUpdateChecker ? 'Hide Updates' : 'Check Updates'}
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
          {/* Update Checker Section */}
          {showUpdateChecker && (
            <div className="mb-8">
              <UpdateChecker />
            </div>
          )}

          <TrafficSheetPage user={user} />
        </main>
      </div>
    </>
  );
}

export default App;
