import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import useInput from './useInput';

function useNewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((states) => states.authUser);

  const [title, handleTitleChange] = useInput('');
  const [category, handleCategoryChange] = useInput('');
  const [body, handleBodyChange] = useInput('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsLoading(true);
    const result = await dispatch(
      asyncAddThread({
        title,
        body,
        category: category.trim(),
      })
    );
    setIsLoading(false);

    if (result && !result.error) {
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const isSubmitDisabled = isLoading || !title.trim() || !body.trim();
  const submitButtonText = isLoading ? 'Menerbitkan...' : 'Terbitkan Diskusi';

  return {
    authUser,
    title,
    handleTitleChange,
    category,
    handleCategoryChange,
    body,
    handleBodyChange,
    isLoading,
    isSubmitDisabled,
    submitButtonText,
    handleSubmit,
    handleCancel,
  };
}

export default useNewThreadPage;
