import React from 'react';
import { Link } from 'react-router-dom';
import { FiMessageSquare } from 'react-icons/fi';
import Avatar from '../atoms/Avatar';
import Badge from '../atoms/Badge';
import VoteButton from './VoteButton';
import { postedAt, truncate } from '../../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  totalComments = 0,
  upVotesBy = [],
  downVotesBy = [],
  user = { name: 'Anonim', avatar: '' },
  authUserId,
  onUpVote,
  onDownVote,
}) {
  return (
    <article className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow">
      <header className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar image={user.avatar} name={user.name} size="md" />
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-slate-800 truncate">{user.name}</h4>
            <p className="text-xs text-slate-400">{postedAt(createdAt)}</p>
          </div>
        </div>
        {category && <Badge label={category} />}
      </header>

      <div className="mb-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 hover:text-indigo-600 transition mb-1.5 leading-snug">
          <Link to={`/threads/${id}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {truncate(body, 180)}
        </p>
      </div>

      <footer className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={(voteType) => onUpVote && onUpVote({ threadId: id, voteType })}
          onDownVote={(voteType) => onDownVote && onDownVote({ threadId: id, voteType })}
        />

        <Link
          to={`/threads/${id}`}
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition font-medium"
        >
          <FiMessageSquare className="text-sm" />
          <span>{totalComments} Komentar</span>
        </Link>
      </footer>
    </article>
  );
}

export default ThreadItem;
