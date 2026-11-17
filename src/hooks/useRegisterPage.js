import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import useInput from './useInput';

function useRegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, handleNameChange] = useInput('');
  const [email, handleEmailChange] = useInput('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length >= 6) {
      setErrorPassword('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setErrorPassword('Password minimal 6 karakter.');
      return;
    }
    setErrorPassword('');
    setIsLoading(true);

    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    setIsLoading(false);

    if (result && !result.error) {
      alert('Registrasi akun berhasil! Silakan masuk menggunakan akun baru Anda.');
      navigate('/login');
    }
  };

  return {
    name,
    handleNameChange,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    errorPassword,
    isLoading,
    handleSubmit,
  };
}

export default useRegisterPage;
