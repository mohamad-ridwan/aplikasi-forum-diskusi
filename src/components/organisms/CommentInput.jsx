import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../atoms/Avatar';
import Button from '../atoms/Button';

function CommentInput({ authUser, onAddComment }) {
  const [content, setContent] = useState('');

  if (!authUser) {
    return (
      <div className="bg-indigo-50/60 rounded-xl border border-indigo-100 p-5 text-center">
        <p className="text-sm text-slate-700">
          Tertarik memberikan tanggapan? Silakan{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">
            Masuk
          </Link>{' '}
          atau{' '}
          <Link to="/register" className="font-bold text-indigo-600 hover:underline">
            Daftar
          </Link>{' '}
          terlebih dahulu untuk menulis komentar.
        </p>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddComment(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar image={authUser.avatar} name={authUser.name} size="sm" />
        <div className="flex-1 space-y-3">
          <textarea
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan komentar atau tanggapan Anda..."
            required
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-y"
          />
          <div className="flex justify-end">
            <Button type="submit" variant="primary" size="sm" disabled={!content.trim()}>
              Kirim Komentar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CommentInput;
