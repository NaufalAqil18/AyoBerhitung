# ayoBerhitung

AyoBerhitung adalah aplikasi web interaktif modern yang dirancang untuk membantu pengguna berlatih dan menguasai operasi aritmatika dasar: penjumlahan, pengurangan, perkalian, dan pembagian. Dibangun dengan [AdonisJS 4.1](https://adonisjs.com/) dan antarmuka berbasis Bootstrap, proyek ini dikembangkan sebagai tugas akhir untuk matakuliah **Project Perangkat Lunak**.

## 📚 Tujuan Proyek
Aplikasi ini dibuat untuk memenuhi tugas akhir matakuliah **Project Perangkat Lunak**. ayoBerhitung bertujuan menyediakan platform yang menarik dan efektif untuk belajar serta berlatih matematika dasar.

## ✨ Fitur
- **Empat Mode Latihan:** Penjumlahan, Pengurangan, Perkalian, Pembagian
- **10 Level per Mode:** Setiap mode terdiri dari 10 level, masing-masing berisi 10 soal
- **UI Modern:** Desain responsif berbasis Bootstrap dengan navigasi yang intuitif
- **Grid Soal:** Navigasi mudah antar soal di setiap level
- **Pelacakan Progres:** Progres, skor, dan waktu ditampilkan secara real-time
- **Modal Hasil:** Menampilkan bintang, persentase, jumlah jawaban benar, dan waktu pengerjaan
- **Sistem Pencapaian:** Lacak progres pengguna dan raih pencapaian (segera hadir)

## 🚀 Memulai

### Prasyarat
- [Node.js](https://nodejs.org/) (v8.0 atau lebih baru)
- [AdonisJS CLI](https://adonisjs.com/docs/4.1/installation)
- [SQLite3](https://www.sqlite.org/index.html) (atau database lain yang didukung)

### Instalasi
1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd ayoBerhitung
   ```
2. **Instal dependensi:**
   ```bash
   npm install
   ```
3. **Konfigurasi environment:**
   - Salin `.env.example` menjadi `.env` dan sesuaikan pengaturannya jika diperlukan.
4. **Jalankan migrasi dan seeder:**
   ```bash
   adonis migration:run
   adonis seed
   ```
5. **Jalankan server pengembangan:**
   ```bash
   adonis serve --dev
   ```
6. **Akses aplikasi:**
   Buka [http://localhost:3333](http://localhost:3333) di browser Anda.

## 🗂️ Struktur Proyek
- `app/Controllers/Http/` — Controller untuk setiap mode dan logika utama
- `app/Models/` — Model data (soal, jawaban, progres, pencapaian)
- `resources/views/` — Template Edge untuk antarmuka pengguna
- `public/` — Aset statis (gambar, CSS)
- `database/` — Migrasi, seeder, dan factory

## 👨‍💻 Penulis & Kredit
Proyek ini dikembangkan oleh mahasiswa **matakuliah Project Perangkat Lunak** sebagai tugas akhir.

## 📄 Lisensi
Proyek ini hanya untuk tujuan edukasi.
