import React from 'react';
import Badge from '../atoms/Badge';

function CategoryChips({ categories = [], selectedCategory = '', onSelectCategory }) {
  if (!categories.length) return null;

  const handleSelectAll = () => {
    onSelectCategory('');
  };

  const handleCategoryClick = (category) => () => {
    const nextCategory = selectedCategory === category ? '' : category;
    onSelectCategory(nextCategory);
  };

  const allButtonClass =
    selectedCategory === ''
      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200';

  return (
    <div className="w-full overflow-x-auto py-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mr-1">
          Kategori:
        </span>
        <button
          type="button"
          onClick={handleSelectAll}
          className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${allButtonClass}`}
        >
          Semua
        </button>
        {categories.map((category) => (
          <Badge
            key={category}
            label={category}
            active={selectedCategory === category}
            onClick={handleCategoryClick(category)}
          />
        ))}
      </div>
    </div>
  );
}

export default CategoryChips;
