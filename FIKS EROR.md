# Laporan Perbaikan Bug: Menu Navigasi Mobile Tidak Bisa Di-scroll

## 1. Ringkasan Masalah
Menu navigasi (hamburger menu) pada tampilan mobile tidak dapat menampilkan seluruh item navigasi secara utuh. Saat menu dibuka di perangkat mobile, tampilan terpotong sebelum item terakhir (Contact) sepenuhnya terlihat, dan pengguna tidak dapat men-scroll ke bagian yang terpotong tersebut. Masalah ini **hanya muncul di perangkat mobile** — pada tampilan desktop (termasuk simulasi mobile melalui resize browser), menu berfungsi normal.

## 2. Gejala
- Item menu (Home, Meet, About, Workflow, Projects, Journey, Contact) terpotong di bagian bawah saat dibuka di HP.
- Tidak ada indikator scroll, dan area menu tidak merespons gestur geser (swipe).
- Masalah konsisten muncul di berbagai kondisi pengujian, termasuk saat dibuka melalui in-app browser (mis. webview Instagram).

## 3. Analisis Akar Masalah

Ditemukan beberapa faktor yang saling berkontribusi terhadap bug ini:
1. **Perhitungan tinggi elemen berbasis unit `vh`/`dvh` tidak akurat di sejumlah browser mobile.** Unit ini seharusnya merepresentasikan tinggi layar yang terlihat, namun pada beberapa browser (terutama in-app browser) nilai yang dihasilkan tidak sesuai dengan area yang benar-benar tampak di layar.

2. **Elemen menu menggunakan `position: fixed`.** Elemen dengan posisi ini "menempel" pada viewport, bukan pada halaman. Konsekuensinya, jika tinggi elemen melebihi area layar yang terlihat, sisa konten tersebut tidak dapat dijangkau — baik melalui scroll halaman (karena elemen fixed tidak ikut bergeser) maupun scroll internal.
  
3. **Fitur scroll internal (`overflow-y: auto`) tidak selalu responsif terhadap gestur sentuh** pada elemen berposisi `fixed` di sejumlah browser mobile, khususnya in-app browser bawaan aplikasi pihak ketiga.
Kombinasi ketiga faktor ini menyebabkan konten menu yang seharusnya bisa di-scroll justru "terkunci" dan tidak dapat diakses sepenuhnya.

## 4. Solusi yang Diterapkan
Setelah beberapa pendekatan diuji (penyesuaian nilai `vh`, pengukuran tinggi layar via JavaScript `window.innerHeight`, hingga penentuan tinggi tetap secara manual), solusi akhir yang paling stabil adalah:

**Menghilangkan ketergantungan pada perhitungan tinggi viewport sama sekali**, dengan menerapkan teknik CSS Grid *auto-height animation* (`grid-template-rows: 0fr` → `1fr`). Dengan teknik ini, tinggi elemen menu secara otomatis menyesuaikan dengan tinggi kontennya sendiri, tanpa perlu mengetahui atau menghitung ukuran layar perangkat. Pendekatan ini menghilangkan sumber masalah utama, karena elemen tidak lagi bisa "salah ukur" terhadap layar — ia hanya mengikuti kebutuhan kontennya.

Sebagai penyempurnaan lebih lanjut, seluruh item menu juga dibuat tampil bersamaan tanpa scroll sama sekali, mengingat jumlah item yang relatif sedikit (di bawah 10 item), sehingga risiko masalah scroll di masa depan dapat dihindari sepenuhnya.

## 5. Berkas yang Diubah
| Berkas | Perubahan |
| `css/style.css` | Merombak styling menu navigasi mobile menggunakan teknik CSS Grid auto-height |
| `js/modules/navbar.js` | Penyesuaian logika buka/tutup menu |
| `js/modules/command-palette.js` | Integrasi tombol menu mobile dengan komponen pencarian (command palette) |
| `index.html` | Penyesuaian struktur elemen navigasi |
