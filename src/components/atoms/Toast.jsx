import React from 'react';
import { FiX } from 'react-icons/fi';
import useToast from '../../hooks/useToast';

function Toast() {
  const { notification, handleClose, currentConfig } = useToast();

  if (!notification || !currentConfig) {
    return null;
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-5 right-5 sm:right-6 z-[99999] max-w-sm sm:max-w-md w-[calc(100vw-2.5rem)] animate-bounce-short pointer-events-auto"
    >
      <div
        className={`flex items-start gap-3 p-4 rounded-xl border shadow-xl ${currentConfig.containerClass} transition-all duration-200`}
      >
        <div className={`p-2 rounded-lg ${currentConfig.iconClass}`}>
          {currentConfig.icon}
        </div>

        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2 mb-1">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${currentConfig.badgeClass}`}
            >
              {currentConfig.badge}
            </span>
          </div>
          <p className="text-sm font-medium leading-relaxed text-slate-700 break-words">
            {notification.message}
          </p>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Tutup notifikasi"
          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
        >
          <FiX className="text-base" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
