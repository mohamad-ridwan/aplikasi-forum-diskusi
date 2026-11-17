import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator,
} from '../states/filterCategory/action';
import { asyncToggleVoteThread } from '../states/threads/action';

function useHomePage() {
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

  const handleSelectCategory = (category) => {
    if (!category) {
      dispatch(clearFilterCategoryActionCreator());
    } else {
      dispatch(setFilterCategoryActionCreator(category));
    }
  };

  const handleUpVote = ({ threadId, voteType }) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  };

  const handleDownVote = ({ threadId, voteType }) => {
    dispatch(asyncToggleVoteThread({ threadId, voteType }));
  };

  return {
    threads: filteredThreads,
    categories,
    selectedCategory: filterCategory,
    authUser,
    handleSelectCategory,
    handleUpVote,
    handleDownVote,
  };
}

export default useHomePage;
