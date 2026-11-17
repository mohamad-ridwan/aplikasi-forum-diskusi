import React from 'react';

function Avatar({ image, name = 'User', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  const selectedSize = sizeClasses[size] || sizeClasses.md;

  return (
    <img
      src={image || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`}
      alt={name}
      className={`rounded-full object-cover border border-slate-200 shadow-sm ${selectedSize} ${className}`}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
      }}
    />
  );
}

export default Avatar;
