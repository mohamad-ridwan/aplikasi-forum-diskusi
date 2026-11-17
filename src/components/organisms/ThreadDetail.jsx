import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Avatar from '../atoms/Avatar';
import Badge from '../atoms/Badge';
import VoteButton from '../molecules/VoteButton';
import { postedAt } from '../../utils';

function ThreadDetail({
  title,
  body,
  category,
  createdAt,
  owner = { name: 'Anonim', avatar: '' },
  upVotesBy = [],
  downVotesBy = [],
  authUserId,
  onUpVote,
  onDownVote,
}) {
  const formattedDate = postedAt(createdAt);

  return (
    <div className="space-y-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition"
      >
        <FiArrowLeft className="text-base" />
        <span>Kembali ke Diskusi</span>
      </Link>

      <article className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <header className="mb-6 space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar image={owner.avatar} name={owner.name} size="md" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">{owner.name}</h3>
                <p className="text-xs text-slate-400">{formattedDate}</p>
              </div>
            </div>
            {category && <Badge label={category} />}
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">
            {title}
          </h1>
        </header>

        <div
          className="text-slate-700 leading-relaxed text-sm sm:text-base space-y-4 mb-6 prose max-w-none break-words"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        <footer className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <VoteButton
            upVotesBy={upVotesBy}
            downVotesBy={downVotesBy}
            authUserId={authUserId}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </footer>
      </article>
    </div>
  );
}

export default ThreadDetail;
