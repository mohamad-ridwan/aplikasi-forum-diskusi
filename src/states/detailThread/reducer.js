import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [action.payload.comment, ...detailThread.comments],
      };
    case ActionType.TOGGLE_VOTE_DETAIL_THREAD: {
      const { userId, voteType } = action.payload;
      const newUpVotesBy = detailThread.upVotesBy.filter((id) => id !== userId);
      const newDownVotesBy = detailThread.downVotesBy.filter((id) => id !== userId);

      if (voteType === 1) {
        newUpVotesBy.push(userId);
      } else if (voteType === -1) {
        newDownVotesBy.push(userId);
      }

      return {
        ...detailThread,
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      };
    }
    case ActionType.SET_DETAIL_THREAD_VOTES:
      return {
        ...detailThread,
        upVotesBy: action.payload.upVotesBy,
        downVotesBy: action.payload.downVotesBy,
      };
    case ActionType.TOGGLE_VOTE_COMMENT: {
      const { commentId, userId, voteType } = action.payload;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id !== commentId) return comment;

          const newUpVotesBy = comment.upVotesBy.filter((id) => id !== userId);
          const newDownVotesBy = comment.downVotesBy.filter((id) => id !== userId);

          if (voteType === 1) {
            newUpVotesBy.push(userId);
          } else if (voteType === -1) {
            newDownVotesBy.push(userId);
          }

          return {
            ...comment,
            upVotesBy: newUpVotesBy,
            downVotesBy: newDownVotesBy,
          };
        }),
      };
    }
    case ActionType.SET_COMMENT_VOTES: {
      const { commentId, upVotesBy, downVotesBy } = action.payload;
      return {
        ...detailThread,
        comments: detailThread.comments.map((comment) => {
          if (comment.id !== commentId) return comment;
          return {
            ...comment,
            upVotesBy,
            downVotesBy,
          };
        }),
      };
    }
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
