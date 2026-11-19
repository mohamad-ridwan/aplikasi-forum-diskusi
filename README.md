# Aplikasi Forum Diskusi (Dicoding Forum App) - Final Submission

Submission Proyek Akhir untuk kelas Dicoding **"Menjadi React Web Developer Expert"**.

Aplikasi ini dibangun untuk memenuhi seluruh **Kriteria Utama** dan seluruh **Poin Saran Improvisasi** demi meraih target penilaian **Bintang 5 (★★★★★)**, yang mencakup Automation Testing (Unit, Integration, Component, E2E), CI/CD Automation Pipeline, Branch Protection, dan integrasi React Ecosystem (Storybook).

---

## 🌐 Deployment URL (Vercel)
- **Live URL**: `https://aplikasi-forum-diskusi-gray.vercel.app`
- **Repository GitHub**: `https://github.com/mohamad-ridwan/aplikasi-forum-diskusi`

---

## 🚀 Fitur Utama & Kepatuhan Kriteria

### 🌟 1. Automation Testing (Melampaui Kriteria Bintang 5)
- **Unit Testing Reducers (>3 Reducer Files)**:
  - `src/states/threads/reducer.test.js` (6 skenario pengujian: initial state, receive, add, optimistic vote, neutral vote, rollback)
  - `src/states/detailThread/reducer.test.js` (5 skenario pengujian: initial state, receive detail, clear detail, add comment, toggle comment vote)
  - `src/states/authUser/reducer.test.js` (3 skenario pengujian: initial state, set auth user, unset auth user)
  - `src/states/isPreload/reducer.test.js` (2 skenario pengujian: initial state, set isPreload false)
- **Integration Testing Thunk Functions (>3 Thunk Files)**:
  - `src/states/shared/action.test.js` (`asyncPopulateUsersAndThreads` - skenario sukses dan gagal)
  - `src/states/authUser/action.test.js` (`asyncSetAuthUser` - login sukses & simpan token vs login gagal notifikasi)
  - `src/states/threads/action.test.js` (`asyncAddThread` - sukses buat thread vs gagal)
  - `src/states/detailThread/action.test.js` (`asyncReceiveThreadDetail` - sukses fetch detail vs gagal)
- **Component Testing React (>3 Komponen React)**:
  - `src/components/atoms/Input.test.jsx` (render label/placeholder, user typing event, error message state)
  - `src/components/atoms/Button.test.jsx` (render children, onClick event handling, disabled state)
  - `src/components/molecules/VoteButton.test.jsx` (vote counts, callback upvote, active styling highlight)
  - `src/components/organisms/CommentInput.test.jsx` (render form, typing textarea, submit comment callback)
- **End-to-End (E2E) Testing Cypress**:
  - `cypress/e2e/login.cy.js` (5 skenario lengkap: visual login page, validasi email kosong, validasi password kosong, notifikasi kredensial salah, dan redirect ke beranda serta verifikasi auth navbar saat login berhasil)

### 🌟 2. CI/CD & Branch Protection
- **Continuous Integration (CI)**: GitHub Actions workflow (`.github/workflows/ci.yml`) mengeksekusi linting, build bundle, dan automated tests (`npm run ci:test`) secara otomatis pada setiap pull request dan push ke `master`.
- **Continuous Deployment (CD)**: Deployment otomatis ke Vercel dengan konfigurasi SPA rewrite (`vercel.json`).
- **Branch Protection**: Branch `master` dikonfigurasi dengan *Require status checks to pass* (`automation-test-job`) dan *Require pull request before merging*.
- **Screenshots Bukti**: Disediakan folder `screenshots/` yang memuat bukti CI check error, CI check pass, dan branch protection.

### 🌟 3. React Ecosystem (Storybook 10.x)
Storybook dimanfaatkan sebagai *React Tool* terverifikasi dari katalog resmi `awesome-react-ecosystem` dengan 4 component stories:
- `src/stories/Button.stories.jsx` (Primary, Secondary, Outline, Danger, DisabledState, Sizes)
- `src/stories/Input.stories.jsx` (DefaultText, WithLabelAndPlaceholder, WithErrorValidation, PasswordInput)
- `src/stories/VoteButton.stories.jsx` (NeutralState, UpvotedActive, DownvotedActive, HighVoteCount)
- `src/stories/Badge.stories.jsx` (CategoryTag, ActiveCategoryFilter, InactiveCategoryFilter)

### 🌟 4. Pemeliharaan Fitur Forum & Kualitas Kode
1. **Pendaftaran Akun (Register)** & **Masuk Akun (Login)** dengan token JWT pada `localStorage`.
2. **Daftar Thread Diskusi** & **Detail Thread dengan Komentar**.
3. **Pembuatan Diskusi & Komentar Baru** (diproteksi bagi pengguna terautentikasi).
4. **Optimistic UI Updates untuk Votes (Thread & Komentar)**: Up-Vote, Down-Vote, dan Neutral-Vote seketika dengan mekanisme rollback otomatis jika request gagal.
5. **Halaman Leaderboard (`/leaderboards`)**: Klasemen 10 pengguna teratas dengan perolehan skor.
6. **Filter Kategori Front-end**: Filter thread instan di sisi klien via state Redux.
7. **Bebas Lint Error**: Menjalankan `npm run lint` menghasilkan **0 errors** dan **0 warnings** (`eslint-config-dicodingacademy`).
8. **React Strict Mode**: Seluruh komponen dirender di dalam `<React.StrictMode>`.

---

## 🛠️ Arsitektur & Teknologi

- **Library UI**: React 18
- **State Management**: Redux Toolkit & React Redux
- **Routing**: `react-router-dom`
- **Asynchronous Feedback**: `react-redux-loading-bar` & Custom Toast Notification
- **Styling**: Tailwind CSS & `react-icons`
- **Automated Testing**: Vitest, React Testing Library, `@testing-library/jest-dom`, `@testing-library/user-event`, JSDOM
- **End-to-End Testing**: Cypress
- **Component Documentation**: Storybook (Vite Framework)
- **CI/CD**: GitHub Actions & Vercel

---

## 📁 Struktur Direktori

```
aplikasi-forum-diskusi/
├── .github/
│   └── workflows/
│       └── ci.yml                         # GitHub Actions CI Workflow
├── .storybook/                            # Konfigurasi Storybook
│   ├── main.js
│   └── preview.js
├── cypress/                               # Cypress End-to-End Testing
│   ├── e2e/
│   │   └── login.cy.js                    # Test Suite E2E Login Flow
│   ├── fixtures/
│   │   └── users.json
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── screenshots/                           # Bukti Screenshot CI/CD
│   ├── 1_ci_check_error.png
│   ├── 2_ci_check_pass.png
│   └── 3_branch_protection.png
├── src/
│   ├── assets/                            # Aset statis
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Avatar.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Button.test.jsx            # Component Test 1
│   │   │   ├── Input.jsx
│   │   │   ├── Input.test.jsx             # Component Test 2
│   │   │   ├── LoadingBar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── GuestRoute.jsx
│   │   │   └── Toast.jsx
│   │   ├── molecules/
│   │   │   ├── CategoryChips.jsx
│   │   │   ├── CommentItem.jsx
│   │   │   ├── ThreadItem.jsx
│   │   │   ├── VoteButton.jsx
│   │   │   └── VoteButton.test.jsx        # Component Test 3
│   │   └── organisms/
│   │       ├── AppRoutes.jsx
│   │       ├── CommentInput.jsx
│   │       ├── CommentInput.test.jsx      # Component Test 4
│   │       ├── LeaderboardList.jsx
│   │       ├── NavigationBar.jsx
│   │       └── ThreadDetail.jsx
│   ├── hooks/                             # Custom Hooks
│   ├── pages/                             # Komponen Halaman
│   ├── states/                            # Redux State Management
│   │   ├── authUser/
│   │   │   ├── action.js
│   │   │   ├── action.test.js             # Thunk Test 1
│   │   │   ├── reducer.js
│   │   │   └── reducer.test.js            # Reducer Test 1
│   │   ├── detailThread/
│   │   │   ├── action.js
│   │   │   ├── action.test.js             # Thunk Test 2
│   │   │   ├── reducer.js
│   │   │   └── reducer.test.js            # Reducer Test 2
│   │   ├── filterCategory/
│   │   ├── isPreload/
│   │   │   ├── action.js
│   │   │   ├── reducer.js
│   │   │   └── reducer.test.js            # Reducer Test 3
│   │   ├── leaderboards/
│   │   ├── notification/
│   │   ├── shared/
│   │   │   ├── action.js
│   │   │   └── action.test.js             # Thunk Test 3
│   │   ├── threads/
│   │   │   ├── action.js
│   │   │   ├── action.test.js             # Thunk Test 4
│   │   │   ├── reducer.js
│   │   │   └── reducer.test.js            # Reducer Test 4
│   │   ├── users/
│   │   └── index.js
│   ├── stories/                           # Storybook Component Stories
│   │   ├── Badge.stories.jsx              # Story Komponen 1
│   │   ├── Button.stories.jsx             # Story Komponen 2
│   │   ├── Input.stories.jsx              # Story Komponen 3
│   │   └── VoteButton.stories.jsx         # Story Komponen 4
│   ├── styles/
│   │   └── index.css
│   ├── utils/
│   │   ├── api.js
│   │   └── index.js
│   ├── setupTests.js
│   ├── App.jsx
│   └── index.jsx
├── .eslintrc.json
├── .eslintignore
├── .gitignore
├── cypress.config.js                      # Konfigurasi Cypress
├── package.json
├── vercel.json                            # Konfigurasi Single Page App Rewrite Vercel
├── vite.config.js                         # Konfigurasi Vite + Vitest JSDOM
└── README.md
```

---

## ⚙️ Skrip & Panduan Pengujian

### 1. Menjalankan Unit & Component Tests (Vitest)
Mode interaktif / watch:
```bash
npm test
```
Mode eksekusi sekali (single-run):
```bash
npm run test:run
```

### 2. Menjalankan End-to-End Testing (Cypress)
Mode headless (terminal run):
```bash
npm run e2e
```
Mode interaktif GUI runner:
```bash
npm run e2e:open
```

### 3. Menjalankan Automated CI Test (Vitest + Cypress)
Menjalankan seluruh unit tests, component tests, dev preview server, dan Cypress E2E dalam satu perintah:
```bash
npm run ci:test
```

### 4. Menjalankan Storybook Workshop
```bash
npm run storybook
```
Buka browser pada alamat `http://localhost:6006` untuk melihat katalog komponen terisolasi.

Untuk membangun static Storybook:
```bash
npm run build-storybook
```

### 5. Memeriksa Kualitas Kode (ESLint)
```bash
npm run lint
```
Menghasilkan **0 errors** dan **0 warnings**.

### 6. Menjalankan Server Pengembangan Lokal
```bash
npm run dev
```

---

## 📜 Lisensi
Proyek ini dibuat untuk keperluan submission akhir kelas Menjadi React Web Developer Expert - Dicoding Indonesia.
