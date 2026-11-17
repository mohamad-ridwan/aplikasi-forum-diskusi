import React from 'react';
import Avatar from '../atoms/Avatar';
import VoteButton from './VoteButton';
import { postedAt } from '../../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner = { name: 'Anonim', avatar: '' },
  upVotesBy = [],
  downVotesBy = [],
  authUserId,
  onUpVote,
  onDownVote,
}) {
  return (
    <article className="bg-slate-50/70 rounded-xl border border-slate-200/70 p-4 transition">
      <header className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar image={owner.avatar} name={owner.name} size="sm" />
          <div className="min-w-0">
            <h5 className="text-sm font-semibold text-slate-800 truncate">{owner.name}</h5>
            <p className="text-xs text-slate-400">{postedAt(createdAt)}</p>
          </div>
        </div>
      </header>

      <div
        className="text-sm text-slate-700 leading-relaxed mb-3 prose max-w-none break-words"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <footer className="flex items-center pt-2 border-t border-slate-200/50">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUserId}
          onUpVote={(voteType) => onUpVote && onUpVote({ commentId: id, voteType })}
          onDownVote={(voteType) => onDownVote && onDownVote({ commentId: id, voteType })}
        />
      </footer>
    </article>
  );
}

export default CommentItem;
