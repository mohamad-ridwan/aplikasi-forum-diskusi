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
  const isUpVoted = Boolean(authUserId && upVotesBy.includes(authUserId));
  const isDownVoted = Boolean(authUserId && downVotesBy.includes(authUserId));

  const handleUpVote = (event) => {
    event.stopPropagation();
    if (!onUpVote) return;
    const nextVote = isUpVoted ? 0 : 1;
    onUpVote(nextVote);
  };

  const handleDownVote = (event) => {
    event.stopPropagation();
    if (!onDownVote) return;
    const nextVote = isDownVoted ? 0 : -1;
    onDownVote(nextVote);
  };

  const upVoteButtonClass = isUpVoted
    ? 'bg-emerald-50 text-emerald-600 border border-emerald-300'
    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200';

  const downVoteButtonClass = isDownVoted
    ? 'bg-rose-50 text-rose-600 border border-rose-300'
    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200';

  const upVoteIconClass = `text-sm ${isUpVoted ? 'fill-emerald-500' : ''}`;
  const downVoteIconClass = `text-sm ${isDownVoted ? 'fill-rose-500' : ''}`;

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleUpVote}
        aria-label="Upvote"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${upVoteButtonClass}`}
      >
        <FiThumbsUp className={upVoteIconClass} />
        <span>{upVotesBy.length}</span>
      </button>

      <button
        type="button"
        onClick={handleDownVote}
        aria-label="Downvote"
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${downVoteButtonClass}`}
      >
        <FiThumbsDown className={downVoteIconClass} />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

export default VoteButton;
