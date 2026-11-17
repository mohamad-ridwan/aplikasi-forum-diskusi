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

  const onAddThread = async () => {
    if (!title.trim() || !body.trim()) return;

    setIsLoading(true);
    try {
      const result = await dispatch(
        asyncAddThread({
          title,
          body,
          category: category.trim(),
        })
      );

      if (result && !result.error) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddThread();
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
    onAddThread,
  };
}

export default useNewThreadPage;
