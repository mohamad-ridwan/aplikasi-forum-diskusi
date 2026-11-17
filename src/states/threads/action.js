import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
  SET_THREAD_VOTES: 'SET_THREAD_VOTES',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
}

function setThreadVotesActionCreator({ threadId, upVotesBy, downVotesBy }) {
  return {
    type: ActionType.SET_THREAD_VOTES,
    payload: {
      threadId,
      upVotesBy,
      downVotesBy,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return { error: false, thread };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote');
      return;
    }

    const currentThread = threads.find((t) => t.id === threadId);
    if (!currentThread) return;

    const previousUpVotesBy = [...currentThread.upVotesBy];
    const previousDownVotesBy = [...currentThread.downVotesBy];

    dispatch(
      toggleVoteThreadActionCreator({
        threadId,
        userId: authUser.id,
        voteType,
      })
    );

    try {
      if (voteType === 1) {
        await api.upVoteThread(threadId);
      } else if (voteType === -1) {
        await api.downVoteThread(threadId);
      } else {
        await api.neutralVoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(
        setThreadVotesActionCreator({
          threadId,
          upVotesBy: previousUpVotesBy,
          downVotesBy: previousDownVotesBy,
        })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleVoteThreadActionCreator,
  setThreadVotesActionCreator,
  asyncAddThread,
  asyncToggleVoteThread,
};
