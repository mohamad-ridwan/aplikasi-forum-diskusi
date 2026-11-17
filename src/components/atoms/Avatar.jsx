import React from 'react';

const SIZE_CLASSES = {
  sm: 'w-7 h-7 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

function getFallbackAvatar(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff`;
}

function Avatar({ image, name = 'User', size = 'md', className = '' }) {
  const selectedSize = SIZE_CLASSES[size] || SIZE_CLASSES.md;
  const avatarSrc = image || getFallbackAvatar(name);

  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = getFallbackAvatar(name);
  };

  return (
    <img
      src={avatarSrc}
      alt={name}
      className={`rounded-full object-cover border border-slate-200 shadow-sm ${selectedSize} ${className}`}
      onError={handleImageError}
    />
  );
}

export default Avatar;
