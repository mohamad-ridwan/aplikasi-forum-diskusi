import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMessageSquare, FiAward, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';

function getNavLinkClass(isActive) {
  const activeStyle = 'bg-indigo-50 text-indigo-600';
  const inactiveStyle = 'text-slate-600 hover:text-slate-900 hover:bg-slate-100';
  return `inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition ${
    isActive ? activeStyle : inactiveStyle
  }`;
}

function getMobileNavLinkClass(isActive) {
  const activeStyle = 'text-indigo-600';
  const inactiveStyle = 'text-slate-600';
  return `flex items-center gap-1.5 text-xs font-semibold py-1 px-3 rounded ${
    isActive ? activeStyle : inactiveStyle
  }`;
}

function NavigationBar({ authUser, onLogout }) {
  const location = useLocation();

  const isHomeActive = location.pathname === '/';
  const isLeaderboardsActive = location.pathname === '/leaderboards';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:bg-indigo-700 transition">
              D
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
              Dicoding<span className="text-indigo-600">Forum</span>
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-1">
            <Link to="/" className={getNavLinkClass(isHomeActive)}>
              <FiMessageSquare className="text-base" />
              <span>Diskusi</span>
            </Link>
            <Link to="/leaderboards" className={getNavLinkClass(isLeaderboardsActive)}>
              <FiAward className="text-base" />
              <span>Klasemen</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {authUser ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                <Avatar image={authUser.avatar} name={authUser.name} size="sm" />
                <span className="hidden md:inline-block text-sm font-semibold text-slate-800">
                  {authUser.name}
                </span>
              </div>
              <button
                type="button"
                onClick={onLogout}
                title="Keluar"
                aria-label="Logout"
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <FiLogOut className="text-lg" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-1.5">
                  <FiLogIn />
                  <span>Masuk</span>
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm" className="gap-1.5">
                  <FiUserPlus />
                  <span>Daftar</span>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="sm:hidden flex items-center justify-around border-t border-slate-100 py-1.5 bg-slate-50/50">
        <Link to="/" className={getMobileNavLinkClass(isHomeActive)}>
          <FiMessageSquare />
          <span>Diskusi</span>
        </Link>
        <Link to="/leaderboards" className={getMobileNavLinkClass(isLeaderboardsActive)}>
          <FiAward />
          <span>Klasemen</span>
        </Link>
      </div>
    </header>
  );
}

export default NavigationBar;
