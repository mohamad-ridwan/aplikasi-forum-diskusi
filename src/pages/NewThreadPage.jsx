import React from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import useNewThreadPage from '../hooks/useNewThreadPage';

function NewThreadPage() {
  const {
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
  } = useNewThreadPage();

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
            onChange={handleTitleChange}
            placeholder="Contoh: Mengapa useEffect berjalan dua kali di React 18?"
            required
          />

          <Input
            id="category"
            label="Kategori / Topik"
            value={category}
            onChange={handleCategoryChange}
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
              onChange={handleBodyChange}
              placeholder="Jelaskan detail pertanyaan atau topik yang ingin Anda diskusikan..."
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition resize-y"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitDisabled}
            >
              {submitButtonText}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewThreadPage;
