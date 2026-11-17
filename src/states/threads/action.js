import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncShowNotification } from '../notification/action';

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
      dispatch(asyncShowNotification({ message: error.message, type: 'error' }));
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function requireAuthOrNotify(dispatch, authUser, message) {
  if (!authUser) {
    dispatch(asyncShowNotification({ message, type: 'warning' }));
    return false;
  }
  return true;
}

async function callThreadVoteApi(threadId, voteType) {
  if (voteType === 1) {
    await api.upVoteThread(threadId);
  } else if (voteType === -1) {
    await api.downVoteThread(threadId);
  } else {
    await api.neutralVoteThread(threadId);
  }
}

async function attemptThreadVoteWithRollback(
  dispatch,
  { threadId, voteType, previousUpVotesBy, previousDownVotesBy }
) {
  try {
    await callThreadVoteApi(threadId, voteType);
  } catch (error) {
    dispatch(
      asyncShowNotification({
        message: `Gagal memperbarui vote pada diskusi: ${error.message || 'Terjadi kesalahan server.'}`,
        type: 'error',
      })
    );
    dispatch(
      setThreadVotesActionCreator({
        threadId,
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      })
    );
  }
}

function asyncToggleVoteThread({ threadId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const isAuth = requireAuthOrNotify(
      dispatch,
      authUser,
      'Silakan masuk (login) terlebih dahulu untuk memberikan suara pada diskusi.'
    );
    if (!isAuth) return;

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

    await attemptThreadVoteWithRollback(dispatch, {
      threadId,
      voteType,
      previousUpVotesBy,
      previousDownVotesBy,
    });
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
