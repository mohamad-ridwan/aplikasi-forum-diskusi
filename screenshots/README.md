# Direktori Bukti Screenshot CI/CD & Branch Protection

Direktori ini digunakan untuk menyimpan 3 berkas tangkapan layar (screenshot) wajib sesuai spesifikasi PRD Section 5.4:

1. `1_ci_check_error.png`:
   - Tangkapan layar Pull Request di GitHub yang menunjukkan status check CI gagal (warna merah / *Checks failed*) saat salah satu pengujian sengaja dibuat gagal.

2. `2_ci_check_pass.png`:
   - Tangkapan layar Pull Request di GitHub yang menunjukkan seluruh status check CI berhasil (warna hijau / *All checks have passed*) setelah seluruh pengujian diperbaiki.

3. `3_branch_protection.png`:
   - Tangkapan layar halaman Pull Request yang menunjukkan tanda proteksi branch aktif pada branch `master` (misal: tombol merge terblokir hingga status check terpenuhi atau memerlukan review PR).
