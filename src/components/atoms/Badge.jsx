import React from 'react';

function Badge({ label, onClick, active = false, className = '' }) {
  const baseClasses =
    'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer';
  const stateClasses = active
    ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200';

  if (!onClick) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 ${className}`}
      >
        #{label}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${stateClasses} ${className}`}
    >
      #{label}
    </button>
  );
}

export default Badge;
