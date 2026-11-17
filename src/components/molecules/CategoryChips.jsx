import React from 'react';
import Badge from '../atoms/Badge';

function CategoryChips({ categories = [], selectedCategory = '', onSelectCategory }) {
  if (!categories.length) return null;

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
          Kategori:
        </span>
        <button
          type="button"
          onClick={() => onSelectCategory('')}
          className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
            selectedCategory === ''
              ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
          }`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <Badge
            key={category}
            label={category}
            active={selectedCategory === category}
            onClick={() => {
              if (selectedCategory === category) {
                onSelectCategory('');
              } else {
                onSelectCategory(category);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryChips;
