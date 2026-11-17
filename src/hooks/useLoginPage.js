import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import useInput from './useInput';

function useLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, handleEmailChange] = useInput('');
  const [password, handlePasswordChange] = useInput('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    setIsLoading(false);

    if (result && !result.error) {
      navigate('/');
    }
  };

  const submitButtonText = isLoading ? 'Sedang Masuk...' : 'Masuk Sekarang';

  return {
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    isLoading,
    submitButtonText,
    handleSubmit,
  };
}

export default useLoginPage;
