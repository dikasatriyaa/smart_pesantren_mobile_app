# 📱 Smart Pesantren Mobile App

Smart Pesantren Mobile App adalah aplikasi mobile yang dirancang untuk membantu proses digitalisasi sistem pendidikan dan manajemen di lingkungan pesantren. Aplikasi ini memudahkan santri, ustadz/ustadzah, serta pengelola pesantren dalam mengakses informasi akademik, kegiatan pesantren, serta komunikasi secara cepat dan efisien melalui perangkat mobile.

Project ini merupakan bagian dari sistem **Smart Pesantren Platform**, yang terintegrasi dengan backend API untuk pengelolaan data santri, jadwal kegiatan, materi pembelajaran, dan administrasi pesantren.

---

# 🚀 Features

* 📢 **Pengumuman Pesantren**
  Informasi terbaru dari pesantren dapat diakses secara real-time.

* 📅 **Jadwal Kegiatan**
  Santri dapat melihat jadwal kegiatan harian dan kegiatan belajar mengajar.

* 📚 **Materi Pembelajaran**
  Materi pembelajaran digital yang dapat diakses oleh santri.

* 👤 **Profil Santri**
  Informasi data santri yang terintegrasi dengan sistem backend.

* 📊 **Monitoring Aktivitas**
  Memudahkan pengelola pesantren memantau aktivitas santri.

* 🔔 **Notifikasi Informasi**
  Pengumuman penting dapat diterima langsung melalui aplikasi.

---

# 📸 Preview Aplikasi

### Login Screen
![WhatsApp Image 2024-07-12 at 17 46 39_107548f8](https://github.com/user-attachments/assets/790a1745-3af6-4466-b9d8-e93ed51935aa)

### Menu Utama

![WhatsApp Image 2024-07-12 at 17 46 40_306cd528](https://github.com/user-attachments/assets/34360fb9-af0f-4ec6-b8cd-3b76e22374da)

### Menu Data Santri - WEB
<img width="828" height="388" alt="image" src="https://github.com/user-attachments/assets/9714571f-8b4d-4f84-ab48-3b5dc90a639d" />

### Dashboard WEB
<img width="579" height="417" alt="image" src="https://github.com/user-attachments/assets/8733630d-e41a-458e-a950-4f804daae4f7" />

---

# 🏗 System Architecture

```
Mobile App (React Native / Expo)
        │
        │ REST API
        ▼
Backend API (Laravel / Node.js)
        │
        ▼
Database (MySQL / PostgreSQL)
```

Aplikasi mobile berkomunikasi dengan backend melalui REST API untuk mengelola data:

* Santri
* Jadwal kegiatan
* Materi pembelajaran
* Pengumuman pesantren

---

# 🛠 Tech Stack

| Technology   | Description                                               |
| ------------ | --------------------------------------------------------- |
| React Native | Framework untuk pengembangan aplikasi mobile              |
| Expo         | Platform pengembangan React Native                        |
| TypeScript   | Bahasa pemrograman berbasis JavaScript dengan type safety |
| Tailwind CSS | Styling modern untuk UI                                   |
| REST API     | Integrasi komunikasi dengan backend                       |

---

# 📂 Project Structure

```
smart_pesantren_mobile_app
│
├── app                # Routing dan halaman aplikasi
├── assets             # Gambar dan resource aplikasi
├── components         # Komponen UI
├── constants          # Konstanta aplikasi
├── hooks              # Custom React hooks
├── scripts            # Script utilitas
│
├── app.json           # Konfigurasi Expo
├── package.json       # Dependency project
├── tsconfig.json      # Konfigurasi TypeScript
└── tailwind.config.js # Konfigurasi Tailwind
```

---

# ⚙️ Installation

### 1. Clone Repository

```
git clone https://github.com/dikasatriyaa/smart_pesantren_mobile_app.git
```

Masuk ke folder project:

```
cd smart_pesantren_mobile_app
```

---

### 2. Install Dependencies

```
npm install
```

atau

```
yarn install
```

---

### 3. Setup Environment

Buat file `.env`

```
API_URL=http://localhost:8000/api
APP_NAME=SmartPesantren
```

---

### 4. Run Project

```
npx expo start
```

Kemudian jalankan melalui:

* Expo Go (Android / iOS)
* Android Emulator
* iOS Simulator

---

# 🔗 Backend Integration

Aplikasi ini terhubung dengan backend API untuk mengelola:

* Data santri
* Jadwal kegiatan
* Materi pembelajaran
* Pengumuman pesantren
* Sistem monitoring aktivitas

Backend dapat menggunakan teknologi seperti:

* Laravel API
* Node.js API

---

# 🧭 Roadmap Development

Pengembangan berikutnya untuk Smart Pesantren Mobile App:

* [ ] Sistem login santri dan ustadz
* [ ] Dashboard santri
* [ ] Absensi digital
* [ ] Sistem nilai santri
* [ ] Sistem monitoring wali santri

---

# 👨‍💻 Author

**Muhamad Andika Try Satria**

* Informatics Engineering Graduate
* Mobile & Web Developer
* Focus on Educational Technology Development

---

# 📜 License

This project is developed for educational and technological development in Islamic boarding schools (Pesantren).
