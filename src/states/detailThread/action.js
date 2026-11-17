import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncShowNotification } from '../notification/action';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_VOTE_DETAIL_THREAD: 'TOGGLE_VOTE_DETAIL_THREAD',
  SET_DETAIL_THREAD_VOTES: 'SET_DETAIL_THREAD_VOTES',
  TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
  SET_COMMENT_VOTES: 'SET_COMMENT_VOTES',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleVoteDetailThreadActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_DETAIL_THREAD,
    payload: {
      userId,
      voteType,
    },
  };
}

function setDetailThreadVotesActionCreator({ upVotesBy, downVotesBy }) {
  return {
    type: ActionType.SET_DETAIL_THREAD_VOTES,
    payload: {
      upVotesBy,
      downVotesBy,
    },
  };
}

function toggleVoteCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
      voteType,
    },
  };
}

function setCommentVotesActionCreator({ commentId, upVotesBy, downVotesBy }) {
  return {
    type: ActionType.SET_COMMENT_VOTES,
    payload: {
      commentId,
      upVotesBy,
      downVotesBy,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearDetailThreadActionCreator());
    try {
      const detailThread = await api.getDetailThread(threadId);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      dispatch(asyncShowNotification({ message: error.message, type: 'error' }));
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      dispatch(
        asyncShowNotification({
          message: 'Komentar Anda berhasil dikirimkan!',
          type: 'success',
        })
      );
      return { error: false };
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

async function callCommentVoteApi({ threadId, commentId, voteType }) {
  if (voteType === 1) {
    await api.upVoteComment({ threadId, commentId });
  } else if (voteType === -1) {
    await api.downVoteComment({ threadId, commentId });
  } else {
    await api.neutralVoteComment({ threadId, commentId });
  }
}

async function attemptDetailThreadVoteWithRollback(
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
      setDetailThreadVotesActionCreator({
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      })
    );
  }
}

async function attemptCommentVoteWithRollback(
  dispatch,
  { threadId, commentId, voteType, previousUpVotesBy, previousDownVotesBy }
) {
  try {
    await callCommentVoteApi({ threadId, commentId, voteType });
  } catch (error) {
    dispatch(
      asyncShowNotification({
        message: `Gagal memperbarui vote pada komentar: ${error.message || 'Terjadi kesalahan server.'}`,
        type: 'error',
      })
    );
    dispatch(
      setCommentVotesActionCreator({
        commentId,
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      })
    );
  }
}

function asyncToggleVoteDetailThread(voteType) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    const isAuth = requireAuthOrNotify(
      dispatch,
      authUser,
      'Silakan masuk (login) terlebih dahulu untuk memberikan suara pada diskusi.'
    );
    if (!isAuth) return;
    if (!detailThread) return;

    const previousUpVotesBy = [...detailThread.upVotesBy];
    const previousDownVotesBy = [...detailThread.downVotesBy];

    dispatch(
      toggleVoteDetailThreadActionCreator({
        userId: authUser.id,
        voteType,
      })
    );

    await attemptDetailThreadVoteWithRollback(dispatch, {
      threadId: detailThread.id,
      voteType,
      previousUpVotesBy,
      previousDownVotesBy,
    });
  };
}

function asyncToggleVoteComment({ commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    const isAuth = requireAuthOrNotify(
      dispatch,
      authUser,
      'Silakan masuk (login) terlebih dahulu untuk memberikan suara pada komentar.'
    );
    if (!isAuth) return;
    if (!detailThread) return;

    const currentComment = detailThread.comments.find((c) => c.id === commentId);
    if (!currentComment) return;

    const previousUpVotesBy = [...currentComment.upVotesBy];
    const previousDownVotesBy = [...currentComment.downVotesBy];

    dispatch(
      toggleVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
        voteType,
      })
    );

    await attemptCommentVoteWithRollback(dispatch, {
      threadId: detailThread.id,
      commentId,
      voteType,
      previousUpVotesBy,
      previousDownVotesBy,
    });
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  toggleVoteDetailThreadActionCreator,
  setDetailThreadVotesActionCreator,
  toggleVoteCommentActionCreator,
  setCommentVotesActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment,
};
