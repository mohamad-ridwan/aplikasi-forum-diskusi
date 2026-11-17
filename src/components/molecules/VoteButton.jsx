import React from 'react';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

function VoteButton({
  upVotesBy = [],
  downVotesBy = [],
  authUserId,
  onUpVote,
  onDownVote,
  className = '',
}) {
  const isUpVoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownVoted = authUserId ? downVotesBy.includes(authUserId) : false;

  const handleUpVote = (e) => {
    e.stopPropagation();
    if (!onUpVote) return;
    if (isUpVoted) {
      onUpVote(0); // neutralize
    } else {
      onUpVote(1); // upvote
    }
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (!onDownVote) return;
    if (isDownVoted) {
      onDownVote(0); // neutralize
    } else {
      onDownVote(-1); // downvote
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleUpVote}
        aria-label="Upvote"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
          isUpVoted
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-300'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
        }`}
      >
        <FiThumbsUp className={`text-sm ${isUpVoted ? 'fill-emerald-500' : ''}`} />
        <span>{upVotesBy.length}</span>
      </button>

      <button
        type="button"
        onClick={handleDownVote}
        aria-label="Downvote"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
          isDownVoted
            ? 'bg-rose-50 text-rose-600 border border-rose-300'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
        }`}
      >
        <FiThumbsDown className={`text-sm ${isDownVoted ? 'fill-rose-500' : ''}`} />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

export default VoteButton;
