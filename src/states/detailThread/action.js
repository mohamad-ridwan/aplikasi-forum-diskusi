import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

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
      alert(error.message);
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
      return { error: false };
    } catch (error) {
      alert(error.message);
      return { error: true, message: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToggleVoteDetailThread(voteType) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote');
      return;
    }
    if (!detailThread) return;

    const previousUpVotesBy = [...detailThread.upVotesBy];
    const previousDownVotesBy = [...detailThread.downVotesBy];

    dispatch(
      toggleVoteDetailThreadActionCreator({
        userId: authUser.id,
        voteType,
      })
    );

    try {
      if (voteType === 1) {
        await api.upVoteThread(detailThread.id);
      } else if (voteType === -1) {
        await api.downVoteThread(detailThread.id);
      } else {
        await api.neutralVoteThread(detailThread.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(
        setDetailThreadVotesActionCreator({
          upVotesBy: previousUpVotesBy,
          downVotesBy: previousDownVotesBy,
        })
      );
    }
  };
}

function asyncToggleVoteComment({ commentId, voteType }) {
  return async (dispatch, getState) => {
    const { authUser, detailThread } = getState();
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote');
      return;
    }
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

    try {
      if (voteType === 1) {
        await api.upVoteComment({ threadId: detailThread.id, commentId });
      } else if (voteType === -1) {
        await api.downVoteComment({ threadId: detailThread.id, commentId });
      } else {
        await api.neutralVoteComment({ threadId: detailThread.id, commentId });
      }
    } catch (error) {
      alert(error.message);
      dispatch(
        setCommentVotesActionCreator({
          commentId,
          upVotesBy: previousUpVotesBy,
          downVotesBy: previousDownVotesBy,
        })
      );
    }
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
