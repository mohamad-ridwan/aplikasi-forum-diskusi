import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import { asyncShowNotification } from '../states/notification/action';
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

  const onRegister = async () => {
    if (password.length < 6) {
      setErrorPassword('Password minimal 6 karakter.');
      return;
    }
    setErrorPassword('');
    setIsLoading(true);

    try {
      const result = await dispatch(asyncRegisterUser({ name, email, password }));
      if (result && !result.error) {
        dispatch(
          asyncShowNotification({
            message: 'Registrasi akun berhasil! Silakan masuk menggunakan akun baru Anda.',
            type: 'success',
          })
        );
        navigate('/login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister();
  };

  const submitButtonText = isLoading ? 'Mendaftarkan Akun...' : 'Daftar Sekarang';

  return {
    name,
    handleNameChange,
    email,
    handleEmailChange,
    password,
    handlePasswordChange,
    errorPassword,
    isLoading,
    submitButtonText,
    handleSubmit,
    onRegister,
  };
}

export default useRegisterPage;
