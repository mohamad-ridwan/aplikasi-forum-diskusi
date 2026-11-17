import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ThreadDetail from '../components/organisms/ThreadDetail';
import CommentInput from '../components/organisms/CommentInput';
import CommentItem from '../components/molecules/CommentItem';
import {
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment,
} from '../states/detailThread/action';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailThread, authUser } = useSelector((states) => states);

  useEffect(() => {
    if (id) {
      dispatch(asyncReceiveDetailThread(id));
    }
  }, [id, dispatch]);

  if (!detailThread) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-center text-slate-400">
        <p>Memuat detail diskusi...</p>
      </div>
    );
  }

  const onUpVoteThread = (voteType) => {
    dispatch(asyncToggleVoteDetailThread(voteType));
  };

  const onDownVoteThread = (voteType) => {
    dispatch(asyncToggleVoteDetailThread(voteType));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteComment = ({ commentId, voteType }) => {
    dispatch(asyncToggleVoteComment({ commentId, voteType }));
  };

  const onDownVoteComment = ({ commentId, voteType }) => {
    dispatch(asyncToggleVoteComment({ commentId, voteType }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-20 space-y-6">
      <ThreadDetail
        {...detailThread}
        authUserId={authUser ? authUser.id : null}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
      />

      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Komentar ({detailThread.comments ? detailThread.comments.length : 0})
        </h3>

        <CommentInput authUser={authUser} onAddComment={onAddComment} />

        <div className="space-y-3 pt-2">
          {detailThread.comments && detailThread.comments.length > 0 ? (
            detailThread.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                {...comment}
                authUserId={authUser ? authUser.id : null}
                onUpVote={onUpVoteComment}
                onDownVote={onDownVoteComment}
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
