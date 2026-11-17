import React from 'react';
import ThreadDetail from '../components/organisms/ThreadDetail';
import CommentInput from '../components/organisms/CommentInput';
import CommentItem from '../components/molecules/CommentItem';
import useDetailPage from '../hooks/useDetailPage';

function DetailPage() {
  const {
    detailThread,
    authUser,
    handleUpVoteThread,
    handleDownVoteThread,
    handleAddComment,
    handleUpVoteComment,
    handleDownVoteComment,
  } = useDetailPage();

  if (!detailThread) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center text-slate-400">
        <p>Memuat detail diskusi...</p>
      </div>
    );
  }

  const comments = detailThread.comments || [];
  const commentsCount = comments.length;
  const hasComments = commentsCount > 0;
  const authUserId = authUser?.id || null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20 space-y-6">
      <ThreadDetail
        {...detailThread}
        authUserId={authUserId}
        onUpVote={handleUpVoteThread}
        onDownVote={handleDownVoteThread}
      />

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Komentar ({commentsCount})
        </h3>

        <CommentInput authUser={authUser} onAddComment={handleAddComment} />

        <div className="space-y-3 pt-2">
          {hasComments ? (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                {...comment}
                authUserId={authUserId}
                onUpVote={handleUpVoteComment}
                onDownVote={handleDownVoteComment}
              />
            ))
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/80 p-8 text-center text-slate-400 text-sm">
              Belum ada komentar. Berikan komentar pertama Anda!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default DetailPage;
