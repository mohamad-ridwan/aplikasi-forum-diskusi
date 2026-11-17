import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.TOGGLE_VOTE_THREAD:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }

      const { userId, voteType } = action.payload;
      const newUpVotesBy = thread.upVotesBy.filter((id) => id !== userId);
      const newDownVotesBy = thread.downVotesBy.filter((id) => id !== userId);

      if (voteType === 1) {
        newUpVotesBy.push(userId);
      } else if (voteType === -1) {
        newDownVotesBy.push(userId);
      }

      return {
        ...thread,
        upVotesBy: newUpVotesBy,
        downVotesBy: newDownVotesBy,
      };
    });
  case ActionType.SET_THREAD_VOTES:
    return threads.map((thread) => {
      if (thread.id !== action.payload.threadId) {
        return thread;
      }
      return {
        ...thread,
        upVotesBy: action.payload.upVotesBy,
        downVotesBy: action.payload.downVotesBy,
      };
    });
  default:
    return threads;
  }
}

export default threadsReducer;
