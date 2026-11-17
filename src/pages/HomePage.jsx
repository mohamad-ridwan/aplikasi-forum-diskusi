import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import CategoryChips from '../components/molecules/CategoryChips';
import ThreadItem from '../components/molecules/ThreadItem';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator,
} from '../states/filterCategory/action';
import { asyncToggleVoteThread } from '../states/threads/action';

function HomePage() {
  const dispatch = useDispatch();
  const { threads = [], users = [], authUser, filterCategory } = useSelector(
    (states) => states
  );

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = Array.from(
    new Set(threads.map((thread) => thread.category).filter(Boolean))
  );

  const populatedThreads = threads.map((thread) => ({
    ...thread,
    user: users.find((u) => u.id === thread.ownerId) || {
      name: 'Anonim',
      avatar: '',
    },
  }));

  const filteredThreads = filterCategory
    ? populatedThreads.filter((t) => t.category === filterCategory)
    : populatedThreads;

  const onSelectCategory = (category) => {
    if (!category) {
      dispatch(clearFilterCategoryActionCreator());
    } else {
      dispatch(setFilterCategoryActionCreator(category));
    }
  };

  const onUpVote = ({ threadId, voteType }) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  };

  const onDownVote = ({ threadId, voteType }) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-6">
      {/* Category Filter Chips */}
      <section className="bg-white rounded-xl border border-slate-200/80 p-4 shadow-sm">
        <CategoryChips
          categories={categories}
          selectedCategory={filterCategory}
          onSelectCategory={onSelectCategory}
        />
      </section>

      {/* Thread List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {filterCategory ? `Diskusi Kategori #${filterCategory}` : 'Diskusi Populer'}
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            {filteredThreads.length} diskusi ditemukan
          </span>
        </div>

        {filteredThreads.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200/80 p-12 text-center text-slate-500 space-y-2">
            <p className="text-base font-semibold text-slate-700">Tidak ada diskusi ditemukan</p>
            <p className="text-sm">Jadilah yang pertama untuk memulai diskusi!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <ThreadItem
                key={thread.id}
                {...thread}
                authUserId={authUser ? authUser.id : null}
                onUpVote={onUpVote}
                onDownVote={onDownVote}
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
