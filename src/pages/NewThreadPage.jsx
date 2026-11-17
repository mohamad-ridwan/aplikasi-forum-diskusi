import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { asyncAddThread } from '../states/threads/action';

function NewThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authUser } = useSelector((states) => states);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Protected route
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

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

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
        <header className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Buat Diskusi Baru
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ajukan pertanyaan, bagikan pengalaman, atau diskusikan topik pemrograman menarik
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="title"
            label="Judul Diskusi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Contoh: Mengapa useEffect berjalan dua kali di React 18?"
            required
          />

          <Input
            id="category"
            label="Kategori / Topik"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Contoh: react (opsional)"
          />

          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Isi Diskusi <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="body"
              rows="7"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Jelaskan detail pertanyaan atau topik yang ingin Anda diskusikan..."
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/')}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || !title.trim() || !body.trim()}
            >
              {isLoading ? 'Menerbitkan...' : 'Terbitkan Diskusi'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewThreadPage;
