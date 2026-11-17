# Aplikasi Forum Diskusi (Dicoding Forum App)

Submission Proyek Aplikasi React dengan Redux untuk kelas Dicoding "Belajar Pengembangan Web Lanjutan / Membangun Aplikasi React dengan Redux".

Aplikasi ini dibangun untuk memenuhi seluruh **Kriteria Utama** dan seluruh **Saran Improvisasi** demi meraih target skor **Bintang 5 (★★★★★)**.

---

## 🚀 Fitur Utama & Kepatuhan Kriteria

### 🌟 Kriteria Utama
1. **Pendaftaran Akun (Register)**: Validasi formulir nama, email, dan kata sandi (minimal 6 karakter) serta umpan balik notifikasi.
2. **Masuk Akun (Login) & Sesi**: Pengelolaan token JWT pada `localStorage` dan pemulihan sesi otomatis saat aplikasi pertama kali dimuat (`asyncPreloadProcess`).
3. **Daftar Thread Diskusi**: Menampilkan informasi judul, cuplikan body, waktu relatif (contoh: "3 jam yang lalu"), jumlah komentar, nama pembuat, dan avatar pembuat.
4. **Detail Thread & Komentar**: Halaman mendalam memuat seluruh isi thread, rincian pembuat, serta daftar komentar lengkap.
5. **Pembuatan Thread Baru**: Formulir pembuatan topik baru dengan judul, kategori topik, dan isi lengkap (wajib login).
6. **Pembuatan Komentar**: Formulir tanggapan pada detail thread yang langsung memperbarui daftar komentar (wajib login).
7. **Loading Bar Indicator**: Indikator loading interaktif di bagian paling atas viewport menggunakan custom `LoadingBar` wrapper (berbasis `react-redux-loading-bar`) selama thunk request berjalan.
8. **Toast Notification System**: Sistem notifikasi toast global untuk umpan balik aksi pengguna (sukses, error, rollback vote) melalui Redux state `notification` dan custom hook `useToast`.

### 🌟 Fitur Improvisasi (Bintang 5)
1. **Saran 1: Optimistic UI Updates untuk Votes (Thread & Komentar)**:
   - Dukungan Up-Vote, Down-Vote, dan Neutral-Vote pada setiap thread maupun komentar.
   - Angka suara dan warna tombol langsung berubah seketika (<16ms).
   - Rollback otomatis dengan notifikasi jika terjadi kegagalan jaringan atau server.
2. **Saran 2: Halaman Leaderboard (`/leaderboards`)**:
   - Menampilkan klasemen kontributor komunitas paling aktif.
   - Dilengkapi nomor peringkat, avatar pengguna, nama lengkap, email, dan skor poin.
3. **Saran 3: Filter Kategori Front-end**:
   - Deretan tag/chip kategori di halaman beranda.
   - Filter thread berjalan murni di sisi front-end berbasis manipulasi state Redux tanpa request ulang.
4. **Bebas Lint Error**:
   - Menjalankan `npm run lint` menghasilkan **0 errors** dan **0 warnings**.
5. **React Strict Mode**:
   - Entry point aplikasi dibungkus penuh oleh `<React.StrictMode>`.

---

## 🛠️ Arsitektur & Teknologi

- **Library UI**: React 18
- **State Management**: Redux (via `@reduxjs/toolkit` `configureStore`) & `react-redux`
- **Routing**: `react-router-dom` v6
- **Asynchronous Feedback**: `react-redux-loading-bar` (dibungkus custom `LoadingBar.jsx`)
- **Styling**: Tailwind CSS & `react-icons`
- **Linting**: ESLint dengan `eslint-config-dicodingacademy` (Dicoding JavaScript Style Guide)
- **Bundler & Dev Server**: Vite

### Struktur Direktori
```
aplikasi-forum-diskusi/
├── public/
├── src/
│   ├── assets/              # Aset statis
│   ├── components/
│   │   ├── atoms/           # Avatar, Badge, Button, Input, GuestRoute, LoadingBar, Toast
│   │   ├── molecules/       # VoteButton, ThreadItem, CommentItem, CategoryChips
│   │   └── organisms/       # AppRoutes, NavigationBar, ThreadDetail, CommentInput, LeaderboardList
│   ├── hooks/               # Custom Hooks: useApp, useInput, useToast, useHomePage, useDetailPage, useLoginPage, useRegisterPage, useNewThreadPage, useLeaderboardsPage
│   ├── pages/               # HomePage, DetailPage, LoginPage, RegisterPage, NewThreadPage, LeaderboardsPage, NotFoundPage
│   ├── states/              # Redux State Management
│   │   ├── authUser/
│   │   ├── isPreload/
│   │   ├── users/
│   │   ├── threads/
│   │   ├── detailThread/
│   │   ├── leaderboards/
│   │   ├── filterCategory/
│   │   ├── notification/
│   │   ├── shared/
│   │   └── index.js
│   ├── utils/               # api.js & index.js
│   ├── styles/              # index.css (Tailwind)
│   ├── App.jsx
│   └── index.jsx
├── .eslintrc.json
├── .eslintignore
├── package.json
└── README.md
```

---

## ⚙️ Panduan Menjalankan Proyek

### 1. Instalasi Dependensi
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Dev Server)
```bash
npm run dev
```
Buka browser pada alamat `http://localhost:5173`.

### 3. Pengecekan Linting (ESLint)
```bash
npm run lint
```
Perintah ini memastikan kode sesuai dengan standar penulisan Dicoding dengan **0 error** dan **0 warning**.

### 4. Build untuk Produksi
```bash
npm run build
```

---

## 📜 Lisensi
Proyek ini dibuat untuk keperluan submission kelas Dicoding Indonesia.
