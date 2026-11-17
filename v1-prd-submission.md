# PRODUCT REQUIREMENT DOCUMENT (PRD)
## Proyek: Membangun Aplikasi React dengan Redux (Aplikasi Forum Diskusi)

| Metadata Dokumen | Deskripsi |
| :--- | :--- |
| **Nama Proyek** | Aplikasi Forum Diskusi (*Dicoding Forum App*) |
| **Versi Dokumen** | 1.0.0 (v1) |
| **Target Skor Penilaian** | **Bintang 5 (★★★★★)** — Memenuhi Seluruh Kriteria Wajib & Seluruh Saran Improvisasi |
| **Platform Target** | Web Desktop & Mobile (Responsive Web Application) |
| **API Backend** | Dicoding Forum API v1 (`https://forum-api.dicoding.dev/v1`) |
| **Estimasi Pengerjaan** | 20 Jam (Direkomendasikan 2 jam/hari selama 10 hari) |
| **Tujuan Dokumen** | Menjadi panduan arsitektur, fungsionalitas, desain state Redux, integrasi API, dan standar kode komprehensif bagi pengembang untuk membangun submission dengan kualitas terbaik. |

---

## DAFTAR ISI
1. [Ringkasan Eksekutif & Tujuan](#1-ringkasan-eksekutif--tujuan)
2. [Matriks Kepatuhan Kriteria & Target Skor](#2-matriks-kepatuhan-kriteria--target-skor)
3. [Aktor & Alur Pengguna (User Stories)](#3-aktor--alur-pengguna-user-stories)
4. [Arsitektur Sistem & Spesifikasi State Redux](#4-arsitektur-sistem--spesifikasi-state-redux)
5. [Spesifikasi Integrasi Dicoding Forum API v1](#5-spesifikasi-integrasi-dicoding-forum-api-v1)
6. [Spesifikasi Halaman & Komponen UI/UX](#6-spesifikasi-halaman--komponen-uiux)
7. [Standar Kualitas Kode (ESLint & React Strict Mode)](#7-standar-kualitas-kode-eslint--react-strict-mode)
8. [Rencana Pengerjaan & Estimasi Waktu (20 Jam)](#8-rencana-pengerjaan--estimasi-waktu-20-jam)
9. [Checklist Verifikasi Mandiri (Bintang 5)](#9-checklist-verifikasi-mandiri-bintang-5)

---

## 1. RINGKASAN EKSEKUTIF & TUJUAN

### 1.1 Latar Belakang
Aplikasi Forum Diskusi adalah platform berbasis web interaktif di mana komunitas dapat saling berbagi ide, berdiskusi melalui topik (threads), memberikan tanggapan (comments), memberikan apresiasi suara (up-vote/down-vote), serta memantau keaktifan anggota melalui papan peringkat (*leaderboard*). 

### 1.2 Sasaran Utama Proyek
- Mengimplementasikan konsep pengelolaan **State Global Terprediksi** menggunakan **Redux** (Redux Toolkit / RTK atau Redux Core + React-Redux).
- Memisahkan secara tegas kode **User Interface (UI)** dan kode **State Management**.
- Menjamin **tidak ada pemanggilan REST API langsung** di dalam lifecycle komponen atau `useEffect`.
- Menerapkan **Optimistic UI Updates** pada fitur voting untuk menghasilkan *User Experience (UX)* yang mulus dan instan.
- Memastikan kepatuhan terhadap standar kode linter (**ESLint**) berbasis **Dicoding JavaScript Style Guide** tanpa *warning* maupun *error*.
- Memastikan aplikasi berjalan stabil di bawah **React Strict Mode**.

---

## 2. MATRIKS KEPATUHAN KRITERIA & TARGET SKOR

Untuk mencapai skor **Bintang 5 (★★★★★)**, aplikasi mengimplementasikan seluruh Kriteria Utama serta seluruh Poin Saran Improvisasi tanpa kompromi:

| Kategori | ID Kriteria | Deskripsi Kebutuhan | Target Implementasi di Proyek | Status Kepatuhan |
| :--- | :--- | :--- | :--- | :--- |
| **Kriteria Utama 1** | KU-1.1 | Pendaftaran Akun (Register) | Form register: nama, email, password (min. 6 karakter). Validasi input & feedback alert. | **WAJIB (100%)** |
| | KU-1.2 | Masuk Akun (Login) | Form login: email, password. Simpan token JWT ke `localStorage`, ambil profil user saat app boot. | **WAJIB (100%)** |
| | KU-1.3 | Daftar Thread (*Thread List*) | Menampilkan seluruh thread: judul, waktu pembuatan (relative date), jumlah komentar, pembuat (nama & avatar), cuplikan body. | **WAJIB (100%)** |
| | KU-1.4 | Detail Thread & Komentar | Halaman detail: judul, body lengkap (HTML/Markdown render), waktu, pembuat (nama & avatar), daftar komentar (isi, waktu, nama & avatar pembuat). | **WAJIB (100%)** |
| | KU-1.5 | Pembuatan Thread Baru | Form pembuatan thread: input judul, kategori/tag, dan body teks. Wajib login. | **WAJIB (100%)** |
| | KU-1.6 | Pembuatan Komentar | Form pembuatan komentar pada thread detail. Wajib login. Auto-update daftar komentar. | **WAJIB (100%)** |
| | KU-1.7 | Loading Indicator | Indikator loading bar di posisi atas layar (*top-bar*) setiap kali ada asynchronous thunk API request via `react-redux-loading-bar`. | **WAJIB (100%)** |
| **Kriteria Utama 2** | KU-2.1 | Konfigurasi ESLint | Berkas konfigurasi ESLint tersedia di root project (`.eslintrc.json` / `eslint.config.js`). | **WAJIB (100%)** |
| | KU-2.2 | Code Convention Style Guide | Mengadopsi Dicoding JavaScript Style Guide / Airbnb Base Config. | **WAJIB (100%)** |
| | KU-2.3 | Bebas Eslint Error | `npm run lint` menghasilkan **0 error** dan **0 warning**. | **WAJIB (100%)** |
| | KU-2.4 | React Strict Mode | Entry point aplikasi dibungkus oleh `<React.StrictMode>`. | **WAJIB (100%)** |
| **Kriteria Utama 3** | KU-3.1 | Centralized Redux Store | Semua state server/API disimpan di Redux Store. Komponen hanya mengelola local form state. | **WAJIB (100%)** |
| | KU-3.2 | No API Calls in Lifecycle | `useEffect` dan event handler UI murni melakukan `dispatch(asyncThunk)`. Tidak ada `fetch()` atau `axios()` di file komponen. | **WAJIB (100%)** |
| | KU-3.3 | Separasi UI dan State | Direktori `src/states` terpisah bersih dari `src/components`, `src/pages`, `src/utils`. | **WAJIB (100%)** |
| | KU-3.4 | Modular & Reusable Components | Komponen dipecah menjadi unit-unit kecil yang dapat dipakai ulang (*reusable* & *clean props*). | **WAJIB (100%)** |
| **Saran 1 (Improvisasi)** | SR-1.1 | Tombol Votes Thread & Komentar | Tombol Up-Vote, Down-Vote, dan Neutral-Vote pada setiap thread dan setiap komentar. | **BINTANG 5 TARGET** |
| | SR-1.2 | Indikator Visual Status Vote | Perubahan warna tombol aktif (contoh: hijau/biru untuk upvote aktif, merah untuk downvote aktif, abu-abu netral). | **BINTANG 5 TARGET** |
| | SR-1.3 | Optimistic UI Updates | State Redux diperbarui secara instan sebelum respons server selesai. Rollback state jika network/server gagal. | **BINTANG 5 TARGET** |
| | SR-1.4 | Penghitung Jumlah Vote | Menampilkan angka akumulasi up-votes dan down-votes secara real-time. | **BINTANG 5 TARGET** |
| **Saran 2 (Improvisasi)** | SR-2.1 | Halaman Leaderboard | Rute `/leaderboards` menampilkan daftar klasemen kontributor teraktif. | **BINTANG 5 TARGET** |
| | SR-2.2 | Data Item Leaderboard | Menampilkan Avatar pengguna, Nama lengkap pengguna, dan Skor poin kontribusi. | **BINTANG 5 TARGET** |
| **Saran 3 (Improvisasi)** | SR-3.1 | Filter Thread Berdasarkan Kategori | Baris tag/chip kategori di halaman depan. Klik kategori untuk mem-filter thread. Pure front-end Redux selector manipulation. | **BINTANG 5 TARGET** |
| **Saran Tambahan** | SR-4.1 | Desain UI/UX & Aksesibilitas | Desain modern, kontras teks ramah mata, responsif (Desktop & Mobile), interaksi intuitif, notifikasi toast / alert informatif. | **BINTANG 5 TARGET** |

---

## 3. AKTOR & ALUR PENGGUNA (USER STORIES)

### 3.1 Aktor Sistem
1. **Pengunjung (Guest / Unauthenticated User)**:
   - Dapat menjelajahi dan membaca daftar thread.
   - Dapat mem-filter thread berdasarkan kategori.
   - Dapat melihat detail thread dan komentar di dalamnya.
   - Dapat melihat halaman Leaderboard.
   - Tidak dapat membuat thread baru, membuat komentar, atau memberikan vote (diarahkan ke halaman login).
2. **Pengguna Terautentikasi (Authenticated Member)**:
   - Memiliki seluruh hak akses pengunjung.
   - Dapat membuat thread baru beserta menentukan kategorinya.
   - Dapat mengirim komentar pada thread yang dipilih.
   - Dapat memberikan Up-Vote, Down-Vote, atau Menetralkan Vote pada thread maupun komentar.
   - Dapat melakukan Logout untuk mengakhiri sesi.

### 3.2 Skenario Pengguna (User Stories & Acceptance Criteria)

#### US-01: Pendaftaran Akun Pengguna Baru
- **Sebagai** pengguna baru,
- **Saya ingin** mendaftarkan akun dengan nama, email, dan password,
- **Agar** saya dapat berpartisipasi dalam diskusi forum.
- **Kriteria Penerimaan (Acceptance Criteria)**:
  - Validasi email berformat valid dan password minimal 6 karakter.
  - Saat pendaftaran sukses, pengguna diarahkan ke halaman login dan diberikan konfirmasi sukses.
  - Jika email sudah terdaftar, muncul pesan galat yang ramah.

#### US-02: Masuk Akun & Persistensi Sesi
- **Sebagai** pengguna terdaftar,
- **Saya ingin** masuk ke aplikasi menggunakan kredensial saya,
- **Agar** saya dapat mengelola sesi diskusi saya secara aman.
- **Kriteria Penerimaan**:
  - Token otentikasi disimpan di `localStorage` melalui helper `putAccessToken`.
  - Halaman menginisialisasi sesi saat pertama dibuka (`asyncPreloadProcess`).
  - Navigasi atas otomatis berubah menampilkan profil singkat dan tombol Logout.

#### US-03: Menjelajahi Daftar Thread & Filter Kategori
- **Sebagai** pengunjung atau anggota,
- **Saya ingin** melihat seluruh thread dan memfilternya berdasarkan kategori topik,
- **Agar** saya dapat menemukan diskusi yang relevan dengan cepat.
- **Kriteria Penerimaan**:
  - Daftar kategori diekstrak unik dari seluruh data thread yang aktif.
  - Memilih chip kategori akan memfilter tampilan secara instan tanpa reload browser.
  - Menampilkan nama pembuat, avatar, judul, snippet cuplikan isi, tanggal relatif (contoh: "3 jam yang lalu"), jumlah vote, dan jumlah komentar.

#### US-04: Melihat Detail Diskusi & Menambahkan Komentar
- **Sebagai** pengguna,
- **Saya ingin** membaca isi lengkap diskusi dan memberikan respon,
- **Agar** terjadi pertukaran informasi dua arah.
- **Kriteria Penerimaan**:
  - Halaman detail menampilkan konten thread lengkap beserta seluruh komentar.
  - Pengguna terotentikasi dapat mengetik komentar baru pada kolom komentar.
  - Setelah komentar dikirim, komentar langsung muncul di daftar komentar tanpa reload halaman.

#### US-05: Memberikan Vote dengan Optimistic Update
- **Sebagai** anggota terdaftar,
- **Saya ingin** memberikan apresiasi upvote atau downvote secara instan,
- **Agar** respon antarmuka terasa sangat cepat dan responsif.
- **Kriteria Penerimaan**:
  - Angka vote dan warna tombol langsung berubah begitu tombol ditekan.
  - Jika koneksi gagal atau API menolak, angka vote dan status tombol otomatis di-rollback ke kondisi semula disertai notifikasi error.

#### US-06: Memantau Leaderboard
- **Sebagai** pengguna forum,
- **Saya ingin** melihat siapa saja pengguna dengan kontribusi skor tertinggi,
- **Agar** memotivasi partisipasi komunitas yang sehat.
- **Kriteria Penerimaan**:
  - Menampilkan daftar peringkat berurutan berdasarkan nilai skor.
  - Setiap baris memuat foto avatar, nama lengkap, dan jumlah skor.

---

## 4. ARSITEKTUR SISTEM & SPESIFIKASI STATE REDUX

### 4.1 Prinsip Unidirectional Data Flow
Aplikasi mengadopsi prinsip arsitektur aliran data satu arah Redux:
```
┌────────────────────────────────────────────────────────────────────────┐
│                                 VIEW                                   │
│  (React Component: Pages, Molecules, Atoms - Clean, No API In Effects)  │
└──────────────────┬───────────────────────────────────▲─────────────────┘
                   │ Dispatch Action                   │ useSelector
                   ▼                                   │
┌──────────────────────────────────────┐               │
│             THUNK ACTION             │               │
│  - Optimistic Dispatch (Immediate)   │               │
│  - Call API Utilities (src/utils)    │               │
│  - Success / Rollback Dispatch       │               │
└──────────────────┬───────────────────┘               │
                   ▼ Reducer Action                    │
┌──────────────────────────────────────────────────────┴─────────────────┐
│                             REDUX STORE                                │
│  - authUser, isPreload, users, threads, detailThread, leaderboards,     │
│  - filterCategory, loadingBar                                          │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Struktur Direktori Proyek (Strict UI & State Separation)
Proyek harus memisahkan secara tegas kode State Redux dengan Presentational/Container UI:

```
aplikasi-forum-diskusi/
├── public/
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── assets/              # Gambar, icon, dan styling statis
│   ├── components/          # Reusable Presentational UI Components
│   │   ├── atoms/           # Button, Input, Avatar, Badge, Chip
│   │   ├── molecules/       # VoteButton, ThreadItem, CommentItem, CategoryChips
│   │   └── organisms/       # NavigationBar, ThreadDetail, CommentInput, LeaderboardList
│   ├── pages/               # Routed View Components (Container Pages)
│   │   ├── HomePage.jsx
│   │   ├── DetailPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── NewThreadPage.jsx
│   │   ├── LeaderboardsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── states/              # PUSAT STATE MANAGEMENT REDUX
│   │   ├── authUser/
│   │   │   ├── action.js
│   │   │   └── reducer.js
│   │   ├── isPreload/
│   │   │   ├── action.js
│   │   │   └── reducer.js
│   │   ├── users/
│   │   │   ├── action.js
│   │   │   └── reducer.js
│   │   ├── threads/
│   │   │   ├── action.js
│   │   │   └── reducer.js
│   │   ├── detailThread/
│   │   │   ├── action.js
│   │   │   └── reducer.js
│   │   ├── leaderboards/
│   │   │   ├── action.js
│   │   │   └── reducer.js
│   │   ├── filterCategory/
│   │   │   ├── action.js
│   │   │   └── reducer.js
│   │   ├── shared/          # Thunk orkestrasi lintas reducer
│   │   │   └── action.js    # asyncPopulateUsersAndThreads
│   │   └── index.js         # Redux Store Configuration & Root Reducer
│   ├── utils/               # Helper API, LocalStorage, Date Formatter
│   │   ├── api.js           # REST API Network Layer
│   │   └── index.js         # formatDate, sanitize, string truncate
│   ├── styles/
│   │   └── index.css        # Tailwind CSS / Stylesheet
│   ├── App.jsx              # App Routing & Preload Bootstrapper
│   └── index.jsx            # React.StrictMode & Provider Injection
├── .eslintrc.json           # ESLint Dicoding Style Guide Config
├── .eslintignore
├── package.json
└── README.md
```

### 4.3 Skema State Redux (Store Shape)
Redux Store dirancang modular dengan struktur state sebagai berikut:

```typescript
interface RootState {
  authUser: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null;

  isPreload: boolean; // Menandakan apakah initial auth check sedang berjalan

  users: Array<{
    id: string;
    name: string;
    email: string;
    avatar: string;
  }>;

  threads: Array<{
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    ownerId: string;
    totalComments: number;
    upVotesBy: string[];   // Array of userId
    downVotesBy: string[]; // Array of userId
  }>;

  detailThread: {
    id: string;
    title: string;
    body: string;
    category: string;
    createdAt: string;
    owner: {
      id: string;
      name: string;
      avatar: string;
    };
    upVotesBy: string[];
    downVotesBy: string[];
    comments: Array<{
      id: string;
      content: string;
      createdAt: string;
      owner: {
        id: string;
        name: string;
        avatar: string;
      };
      upVotesBy: string[];
      downVotesBy: string[];
    }>;
  } | null;

  leaderboards: Array<{
    user: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
    score: number;
  }>;

  filterCategory: string; // "" jika tidak ada filter aktif, atau nama kategori spesifik

  loadingBar: any; // State dari react-redux-loading-bar
}
```

### 4.4 Action Creators & Async Thunks Mapping

| Domain State | Action Creator Types | Async Thunk Function | Tanggung Jawab & Skenario |
| :--- | :--- | :--- | :--- |
| **authUser** | `SET_AUTH_USER`<br>`UNSET_AUTH_USER` | `asyncSetAuthUser({ email, password })`<br>`asyncUnsetAuthUser()` | Melakukan otentikasi login, menyimpan token, dan menangani logout. |
| **isPreload** | `SET_IS_PRELOAD` | `asyncPreloadProcess()` | Mengambil profil user tersimpan (`/users/me`) saat aplikasi pertama kali dimuat. |
| **users** | `RECEIVE_USERS` | `asyncRegisterUser({ name, email, password })` | Registrasi akun baru dan menyimpan daftar user untuk populasi data thread. |
| **shared** | (Dispatches `RECEIVE_USERS` & `RECEIVE_THREADS`) | `asyncPopulateUsersAndThreads()` | Menjalankan `Promise.all([api.getAllUsers(), api.getAllThreads()])` untuk menggabungkan data pembuat thread. |
| **threads** | `RECEIVE_THREADS`<br>`ADD_THREAD`<br>`TOGGLE_VOTE_THREAD` | `asyncAddThread({ title, body, category })`<br>`asyncToggleVoteThread({ threadId, voteType })` | Membuat thread baru, memuat daftar thread, dan mengelola up/down/neutral vote dengan **Optimistic Update**. |
| **detailThread** | `RECEIVE_DETAIL_THREAD`<br>`CLEAR_DETAIL_THREAD`<br>`ADD_COMMENT`<br>`TOGGLE_VOTE_DETAIL_THREAD`<br>`TOGGLE_VOTE_COMMENT` | `asyncReceiveDetailThread(threadId)`<br>`asyncAddComment({ threadId, content })`<br>`asyncToggleVoteDetailThread(voteType)`<br>`asyncToggleVoteComment({ commentId, voteType })` | Mengambil detail thread, mengirim komentar baru, dan vote optimistik pada thread detail serta komentar. |
| **leaderboards** | `RECEIVE_LEADERBOARDS` | `asyncReceiveLeaderboards()` | Memuat peringkat nilai pengguna forum dari API `/leaderboards`. |
| **filterCategory**| `SET_FILTER_CATEGORY`<br>`CLEAR_FILTER_CATEGORY` | - (Synchronous action) | Memanipulasi nilai kategori filter pada state UI forum. |

### 4.5 Mekanisme Optimistic UI Updates untuk Votes
Untuk memenuhi **Saran 1 (Improvisasi Nilai Bintang 5)**:
1. **Saat Tombol Ditekan**:
   - Thunk segera memanggil action pembaruan state lokal (`TOGGLE_VOTE_THREAD` atau `TOGGLE_VOTE_COMMENT`), memasukkan atau menghapus `userId` dari array `upVotesBy` / `downVotesBy`.
   - UI langsung merespons seketika (<16ms) dengan mengganti warna tombol dan mengubah angka total vote.
2. **Panggilan Network**:
   - Thunk memanggil endpoint API yang sesuai (`/up-vote`, `/down-vote`, atau `/neutral-vote`).
3. **Kompensasi / Rollback (Error Handling)**:
   - Jika panggilan API gagal (misal koneksi terputus atau server 500), blok `catch` pada thunk akan mem-dispatch action kompensasi untuk mengembalikan state `upVotesBy` dan `downVotesBy` ke nilai semula serta memunculkan pemberitahuan kesalahan (`alert` atau *toast notification*).

---

## 5. SPESIFIKASI INTEGRASI DICODING FORUM API V1

- **Base URL**: `https://forum-api.dicoding.dev/v1`
- **Tipe Format**: JSON (`Content-Type: application/json`)
- **Autentikasi Header**: `Authorization: Bearer <accessToken>`

### 5.1 Matriks Endpoint & Kontrak Data

| Fitur | Method | Endpoint Path | Autentikasi | Request Payload | Response Data Penting |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Register** | `POST` | `/register` | Tidak | `{ name, email, password }` | `{ status: "success", data: { user: { id, name, email, avatar } } }` |
| **Login** | `POST` | `/login` | Tidak | `{ email, password }` | `{ status: "success", data: { token: "..." } }` |
| **Get All Users** | `GET` | `/users` | Tidak | - | `{ status: "success", data: { users: [ { id, name, email, avatar } ] } }` |
| **Get Own Profile** | `GET` | `/users/me` | **Ya (Bearer)** | - | `{ status: "success", data: { user: { id, name, email, avatar } } }` |
| **Get All Threads** | `GET` | `/threads` | Tidak | - | `{ status: "success", data: { threads: [ { id, title, body, category, createdAt, ownerId, totalComments, upVotesBy, downVotesBy } ] } }` |
| **Create Thread** | `POST` | `/threads` | **Ya (Bearer)** | `{ title, body, category }` | `{ status: "success", data: { thread: { id, title, body, category, createdAt, ownerId, ... } } }` |
| **Get Detail Thread** | `GET` | `/threads/:id` | Tidak | - | `{ status: "success", data: { detailThread: { id, title, body, category, createdAt, owner, comments, upVotesBy, downVotesBy } } }` |
| **Create Comment** | `POST` | `/threads/:id/comments` | **Ya (Bearer)** | `{ content }` | `{ status: "success", data: { comment: { id, content, createdAt, owner, upVotesBy, downVotesBy } } }` |
| **Up-Vote Thread** | `POST` | `/threads/:id/up-vote` | **Ya (Bearer)** | - | `{ status: "success", data: { vote: { id, userId, threadId, voteType: 1 } } }` |
| **Down-Vote Thread**| `POST` | `/threads/:id/down-vote`| **Ya (Bearer)** | - | `{ status: "success", data: { vote: { id, userId, threadId, voteType: -1 } } }` |
| **Neutral Thread** | `POST` | `/threads/:id/neutral-vote` | **Ya (Bearer)** | - | `{ status: "success", data: { vote: { id, userId, threadId, voteType: 0 } } }` |
| **Up-Vote Comment** | `POST` | `/threads/:id/comments/:commentId/up-vote` | **Ya (Bearer)** | - | `{ status: "success", data: { vote: { id, userId, commentId, voteType: 1 } } }` |
| **Down-Vote Comment**| `POST` | `/threads/:id/comments/:commentId/down-vote`| **Ya (Bearer)** | - | `{ status: "success", data: { vote: { id, userId, commentId, voteType: -1 } } }` |
| **Neutral Comment**| `POST` | `/threads/:id/comments/:commentId/neutral-vote`| **Ya (Bearer)**| - | `{ status: "success", data: { vote: { id, userId, commentId, voteType: 0 } } }` |
| **Leaderboards** | `GET` | `/leaderboards` | Tidak | - | `{ status: "success", data: { leaderboards: [ { user: { id, name, avatar }, score } ] } }` |

### 5.2 Strategi Populasi Data Pembuat Thread (*Populated Threads*)
Pada endpoint `GET /threads`, objek thread hanya mengembalikan properti `ownerId`, tanpa detail nama atau avatar pembuat. Sementara itu, **Kriteria Utama 1** mewajibkan informasi pembuat (Nama & Avatar) ditampilkan pada daftar thread.
- **Solusi**: Diimplementasikan thunk `asyncPopulateUsersAndThreads` yang memanggil `api.getAllUsers()` dan `api.getAllThreads()` secara simultan via `Promise.all`.
- Di level selector atau presentational component:
  ```javascript
  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || {
      name: 'Unknown User',
      avatar: 'https://ui-avatars.com/api/?name=User',
    },
    authUser: authUser ? authUser.id : null,
  }));
  ```

---

## 6. SPESIFIKASI HALAMAN & KOMPONEN UI/UX

### 6.1 Peta Situs & Rute Aplikasi (*Routing*)
Menggunakan `react-router-dom`:

| Path Rute | Halaman Komponen | Hak Akses | Deskripsi Tampilan |
| :--- | :--- | :--- | :--- |
| `/` | `HomePage` | Publik | Beranda diskusi, chips kategori, daftar thread, FAB tombol tambah thread. |
| `/threads/:id` | `DetailPage` | Publik | Konten lengkap diskusi thread, daftar komentar, dan input tambah komentar. |
| `/new` | `NewThreadPage` | Pengguna Terautentikasi (Protected Route) | Form penulisan topik diskusi baru (Judul, Kategori, Isi). |
| `/leaderboards` | `LeaderboardsPage` | Publik | Klasemen pengguna dengan akumulasi poin tertinggi. |
| `/login` | `LoginPage` | Khusus Tamu (Guest Only) | Form masuk akun dengan email & password. |
| `/register` | `RegisterPage` | Khusus Tamu (Guest Only) | Form registrasi akun baru (Nama, Email, Password). |
| `*` | `NotFoundPage` | Publik | Halaman penanganan 404 jika URL rute tidak ditemukan. |

### 6.2 Tata Letak & Navigasi Global
1. **Top Loading Bar**: Terletak di batas paling atas viewport browser, otomatis aktif saat ada panggilan asynchronous API melalui integrasi `showLoading()` dan `hideLoading()` dari `react-redux-loading-bar`.
2. **Navigation Header**:
   - Kiri: Logo Aplikasi "Forum Diskusi" / Brand Icon.
   - Tengah: Tautan navigasi utama ("Diskusi / Threads", "Klasemen / Leaderboards").
   - Kanan:
     - Jika Belum Login: Tombol "Masuk" (Login) & "Daftar" (Register).
     - Jika Sudah Login: Info profil pengguna (Avatar kecil & Nama) serta tombol ikon "Keluar" (Logout).

### 6.3 Desain Rinci Halaman Utama (`HomePage`)
- **Category Filter Chips (Saran 3)**:
  - Deretan chip horizontal: `#Semua`, `#react`, `#redux`, `#javascript`, dsb.
  - Chip aktif ditandai dengan latar kontras/aksen tebal.
  - Klik chip aktif untuk membatalkan filter (*clear filter*).
- **Thread Item Card (Kriteria Utama 1 & Saran 1)**:
  - Header: Avatar pembuat, Nama pembuat, Tanggal relatif postingan (contoh: "2 hari yang lalu").
  - Kategori: Badge kecil penanda topik (contoh: `#react`).
  - Konten: Judul thread (klik untuk menuju rute `/threads/:id`), cuplikan body teks ringkas.
  - Action Bar:
    - Tombol Up-Vote (Ikon jempol atas / panah atas, angka total upvote, warna berubah hijau/biru jika divote).
    - Tombol Down-Vote (Ikon jempol bawah / panah bawah, angka total downvote, warna berubah merah jika divote).
    - Total Komentar (Ikon balon percakapan + angka jumlah komentar).
- **Floating Action Button (FAB) / Create Thread Button**:
  - Tombol aksi mengambang di pojok kanan bawah bertanda `+` atau "Buat Diskusi" yang mengarahkan pengguna ke `/new`.

### 6.4 Desain Rinci Halaman Detail Thread (`DetailPage`)
- **Breadcrumb Navigasi**: Tombol "<- Kembali ke Diskusi".
- **Detail Thread Card**:
  - Badge kategori diskusi.
  - Judul thread (Heading 1 tebal dan jelas).
  - Info pembuat: Avatar ukuran sedang, Nama pembuat, Waktu pembuatan thread.
  - Body lengkap thread: Mendukung format paragraf dan sanitasi HTML / teks aman.
  - Komponen Voting Thread (Up-vote, Down-vote, Skor total).
- **Bagian Formulir Komentar**:
  - Jika pengguna terotentikasi: Tampilkan Avatar user, textarea masukan komentar, dan tombol "Kirim Komentar".
  - Jika tamu: Tampilkan kotak ajakan ramah "Silakan [Masuk] untuk menuliskan komentar".
- **Daftar Komentar Diskusi**:
  - Total komentar: "Komentar (N)".
  - Komponen Komentar Item:
    - Avatar & Nama pembuat komentar.
    - Waktu pembuatan komentar.
    - Konten teks komentar.
    - Tombol Vote Komentar (Up-vote & Down-vote mandiri per komentar dengan indikator warna).

### 6.5 Desain Rinci Halaman Leaderboards (`LeaderboardsPage` - Saran 2)
- **Header**: Judul "Klasemen Pengguna Aktif" beserta penjelasan singkat.
- **Tabel / List Leaderboard**:
  - Baris Header: "Pengguna" dan "Skor".
  - Setiap Baris Item:
    - Kolom Pengguna: Peringkat nomor (#1, #2, #3 dst), Avatar pembuat, Nama pengguna, dan alamat email.
    - Kolom Skor: Angka skor tebal dengan aksen lencana/badge khusus untuk peringkat 3 teratas.

---

## 7. STANDAR KUALITAS KODE (ESLINT & REACT STRICT MODE)

Untuk memenuhi **Kriteria Utama 2 & 3** tanpa catatan kekurangan dari Reviewer:

### 7.1 Konfigurasi ESLint (Bugs Highlighting)
Aplikasi harus menggunakan konfigurasi ESLint berbasis **Dicoding JavaScript Style Guide** / Airbnb Style Guide.
Contoh konfigurasi standar `.eslintrc.json`:
```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-hooks"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    "no-alert": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```
*Catatan Mutlak*: Jalankan `npm run lint` sebelum pengiriman submission. Hasil pengecekan harus **0 error** dan **0 warning fatal**.

### 7.2 Implementasi React Strict Mode
Pada berkas `src/index.jsx`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './states';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
```

### 7.3 Disiplin Bebas Pemanggilan REST API di Efek/Komponen
- **DILARANG**: Memanggil `fetch()`, `axios()`, atau fungsi helper `api.*` langsung di dalam komponen React (`useEffect`, `onClick`, `onSubmit`).
- **DIHARUSKAN**: Seluruh interaksi jaringan dibungkus dalam **Redux Thunk** di dalam direktori `src/states/*`.
- Komponen UI hanya bertugas:
  ```javascript
  // BENAR:
  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };
  ```

---

## 8. RENCANA PENGERJAAN & ESTIMASI WAKTU (20 JAM)

Rencana pengerjaan disusun terstruktur dalam 5 fase untuk menjaga efisiensi dan kesehatan mental pengembang:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      ESTIMASI TIMELINE (20 JAM)                        │
├──────────────┬──────────────┬──────────────┬─────────────┬─────────────┤
│   FASE 1     │    FASE 2    │    FASE 3    │   FASE 4    │   FASE 5    │
│  Setup &     │  API Layer & │ Core Pages & │ Saran Bintang│ Testing, QA │
│  Tooling     │  Redux Store │ UI Modular   │ 5 (Vote/LB) │ & Checklist │
│   (3 Jam)    │   (5 Jam)    │   (5 Jam)    │   (4 Jam)   │   (3 Jam)   │
└──────────────┴──────────────┴──────────────┴─────────────┴─────────────┘
```

### Rincian Per Fase:
- **Fase 1: Setup Lingkungan & Arsitektur Awal (3 Jam)**
  - Inisialisasi proyek React (Vite atau Create-React-App).
  - Instalasi dependencies: `@reduxjs/toolkit` / `redux`, `react-redux`, `react-router-dom`, `react-redux-loading-bar`, `react-icons`.
  - Konfigurasi ESLint (`.eslintrc.json`) dan integrasi Tailwind CSS.
  - Pengujian initial build & React Strict Mode.
- **Fase 2: Network Layer & Redux State Foundation (5 Jam)**
  - Pembuatan modul `src/utils/api.js` (seluruh fungsi fetch untuk semua endpoint Dicoding Forum API v1).
  - Pembuatan state slices: `authUser`, `isPreload`, `users`, `threads`, `detailThread`, `leaderboards`, `filterCategory`.
  - Pembuatan shared thunk `asyncPopulateUsersAndThreads()`.
  - Verifikasi perubahan state Redux via console atau Redux DevTools.
- **Fase 3: Implementasi Halaman Utama & Autentikasi (5 Jam)**
  - Pembuatan komponen reusable (`NavigationBar`, `LoadingBar`, `Input`, `Button`).
  - Halaman `LoginPage` & `RegisterPage` terintegrasi dengan Redux.
  - Halaman `HomePage` (Thread List dengan data populated: nama & avatar pembuat).
  - Halaman `DetailPage` (Detail thread & komentar) beserta penambahan komentar baru.
  - Halaman `NewThreadPage` (Pembuatan topik baru).
- **Fase 4: Penerapan Fitur Unggulan Bintang 5 (4 Jam)**
  - Saran 1: Implementasi Optimistic Up-Vote, Down-Vote, Neutral-Vote pada Thread & Komentar (indikasi tombol warna aktif).
  - Saran 2: Halaman `LeaderboardsPage` (Daftar klasemen user + avatar + score).
  - Saran 3: Front-end Category Filter pada `HomePage` berbasis Redux selector.
- **Fase 5: Pengujian Kualitas, Linting & Final Review (3 Jam)**
  - Pengecekan menyeluruh `npm run lint` (0 error, 0 warning).
  - Pengujian responsivitas layar (Mobile viewport 375px hingga Desktop 1440px).
  - Pengujian edge-cases: error saat offline/jaringan putus, token expired, rollback vote.
  - Finalisasi dokumentasi `README.md` proyek.

---

## 9. CHECKLIST VERIFIKASI MANDIRI (BINTANG 5)

Gunakan checklist ini sebelum mengirimkan submission ke reviewer Dicoding:

### Kriteria Utama 1: Fungsionalitas Aplikasi
- [ ] Pengguna dapat mendaftar akun baru (`/register`).
- [ ] Pengguna dapat login dan token tersimpan di browser (`/login`).
- [ ] Daftar thread menampilkan judul, waktu relatif, jumlah komentar, nama pembuat, dan avatar pembuat.
- [ ] Halaman detail menampilkan judul, body lengkap, waktu, nama & avatar pembuat, serta seluruh komentar (isi, waktu, nama & avatar).
- [ ] Pengguna terotentikasi dapat membuat thread baru (`/new`).
- [ ] Pengguna terotentikasi dapat menulis komentar di thread detail.
- [ ] Loading bar tampil di atas layar setiap kali ada request API berjalan.
- [ ] Pengguna anonim tetap dapat membaca thread, namun diarahkan login saat hendak membuat thread atau komentar.

### Kriteria Utama 2: Bugs Highlighting
- [ ] Berkas konfigurasi ESLint tersedia di proyek.
- [ ] Menjalankan `npm run lint` menghasilkan **0 errors** dan **0 warnings**.
- [ ] Entry point aplikasi dibungkus oleh `<React.StrictMode>`.
- [ ] Tidak ada warning di console browser saat navigasi aplikasi.

### Kriteria Utama 3: Arsitektur Aplikasi
- [ ] Seluruh data server (users, threads, detailThread, leaderboards) disimpan di Redux Store.
- [ ] Tidak ada panggilan API langsung (`fetch` / `axios` / `api.*`) di dalam `useEffect` atau komponen.
- [ ] Direktori `src/states` terpisah jelas dari `src/components` dan `src/pages`.
- [ ] Komponen modular dan memisahkan atom/molecule/organism dengan rapi.

### Fitur Saran Improvisasi (Bintang 5)
- [ ] **Saran 1 (Votes)**:
  - [ ] Tersedia tombol Up-Vote dan Down-Vote di thread dan komentar.
  - [ ] Tombol vote berubah warna ketika sedang aktif dipilih pengguna.
  - [ ] Menerapkan *Optimistically Apply Actions* (angka dan warna langsung terupdate seketika, rollback jika gagal).
  - [ ] Menampilkan angka total up-vote dan down-vote secara akurat.
- [ ] **Saran 2 (Leaderboard)**:
  - [ ] Rute `/leaderboards` menampilkan daftar klasemen.
  - [ ] Memuat Nama pengguna, Avatar pengguna, dan Nilai Skor pengguna.
- [ ] **Saran 3 (Kategori Filter)**:
  - [ ] Tersedia daftar tombol/chip kategori di halaman beranda.
  - [ ] Filter berjalan murni di sisi front-end via manipulasi state Redux tanpa request ulang ke API.
- [ ] **Tampilan & UX**:
  - [ ] Antarmuka bersih, rapi, kontras teks terbaca jelas, dan responsif di perangkat bergerak.
