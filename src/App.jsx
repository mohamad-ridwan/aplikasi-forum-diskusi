import React from 'react';
import LoadingBar from './components/atoms/LoadingBar';
import NavigationBar from './components/organisms/NavigationBar';
import AppRoutes from './components/organisms/AppRoutes';
import useApp from './hooks/useApp';

function App() {
  const { authUser, isPreload, onLogout } = useApp();

  if (isPreload) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
      <LoadingBar
        style={{
          backgroundColor: '#4f46e5',
          height: '3px',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
        }}
      />
      <NavigationBar authUser={authUser} onLogout={onLogout} />

      <main className="flex-1">
        <AppRoutes authUser={authUser} />
      </main>
    </div>
  );
}

export default App;
