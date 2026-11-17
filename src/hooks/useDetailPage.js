import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncToggleVoteDetailThread,
  asyncToggleVoteComment,
} from '../states/detailThread/action';

function useDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailThread, authUser } = useSelector((states) => states);

  useEffect(() => {
    if (id) {
      dispatch(asyncReceiveDetailThread(id));
    }
  }, [id, dispatch]);

  const handleUpVoteThread = (voteType) => {
    dispatch(asyncToggleVoteDetailThread(voteType));
  };

  const handleDownVoteThread = (voteType) => {
    dispatch(asyncToggleVoteDetailThread(voteType));
  };

  const handleAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const handleUpVoteComment = ({ commentId, voteType }) => {
    dispatch(asyncToggleVoteComment({ commentId, voteType }));
  };

  const handleDownVoteComment = ({ commentId, voteType }) => {
    dispatch(asyncToggleVoteComment({ commentId, voteType }));
  };

  return {
    id,
    detailThread,
    authUser,
    handleUpVoteThread,
    handleDownVoteThread,
    handleAddComment,
    handleUpVoteComment,
    handleDownVoteComment,
  };
}

export default useDetailPage;
