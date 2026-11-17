import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import CategoryChips from '../components/molecules/CategoryChips';
import ThreadItem from '../components/molecules/ThreadItem';
import useHomePage from '../hooks/useHomePage';

function HomePage() {
  const {
    threads,
    categories,
    selectedCategory,
    authUser,
    handleSelectCategory,
    handleUpVote,
    handleDownVote,
  } = useHomePage();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* Category Filter Chips */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
        <CategoryChips
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      </section>

      {/* Thread List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {selectedCategory ? `Diskusi Kategori #${selectedCategory}` : 'Diskusi Populer'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {threads.length} diskusi ditemukan
          </span>
        </div>

        {threads.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center text-slate-500 space-y-2">
            <p className="text-base font-semibold text-slate-700">Tidak ada diskusi ditemukan</p>
            <p className="text-sm">Jadilah yang pertama untuk memulai diskusi!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {threads.map((thread) => (
              <ThreadItem
                key={thread.id}
                {...thread}
                authUserId={authUser ? authUser.id : null}
                onUpVote={handleUpVote}
                onDownVote={handleDownVote}
              />
            ))}
          </div>
        )}
      </section>

      {/* Floating Action Button (FAB) for creating thread */}
      <Link
        to="/new"
        title="Buat Diskusi Baru"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-30 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold py-3.5 px-5 rounded-full shadow-lg hover:shadow-indigo-500/25 transition transform hover:-translate-y-0.5"
      >
        <FiPlus className="text-xl" />
        <span className="hidden sm:inline text-sm">Buat Diskusi</span>
      </Link>
    </div>
  );
}

export default HomePage;
