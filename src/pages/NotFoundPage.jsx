import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/atoms/Button';

function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-16 text-center">
      <div className="space-y-4 max-w-md">
        <span className="text-6xl font-black text-indigo-600">404</span>
        <h1 className="text-2xl font-bold text-slate-800">Halaman Tidak Ditemukan</h1>
        <p className="text-slate-500 text-sm">
          Maaf, halaman yang Anda tuju tidak ditemukan atau telah dipindahkan.
        </p>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary">Kembali ke Beranda</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
