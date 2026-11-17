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

  const onLogin = async () => {
    setIsLoading(true);
    try {
      const result = await dispatch(asyncSetAuthUser({ email, password }));
      if (result && !result.error) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
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
    onLogin,
  };
}

export default useLoginPage;
