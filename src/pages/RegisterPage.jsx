import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import useRegisterPage from '../hooks/useRegisterPage';

function RegisterPage() {
  const {
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
  } = useRegisterPage();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200/80 p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-2xl mx-auto mb-3 shadow-md">
            D
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Buat Akun Baru</h2>
          <p className="text-sm text-slate-500 mt-1">
            Bergabunglah dengan komunitas pengembang dan bagikan ide Anda
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            label="Nama Lengkap"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="John Doe"
            required
          />

          <Input
            id="email"
            label="Alamat Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="nama@email.com"
            required
          />

          <Input
            id="password"
            label="Kata Sandi (min. 6 karakter)"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="••••••••"
            required
            error={errorPassword}
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full mt-2"
            disabled={isLoading}
          >
            {submitButtonText}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-100 pt-5">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:underline">
            Masuk di sini
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
