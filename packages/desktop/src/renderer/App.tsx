import { useState, useEffect } from 'react';
import TrafficSheetPage from './pages/TrafficSheetPage';
import UserIdentificationModal from './components/UserIdentificationModal';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
            <h1 className="text-2xl font-bold text-gray-900">QuickClick MediaTools</h1>
            {user && (
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  {user.name} ({user.role})
                </div>
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
