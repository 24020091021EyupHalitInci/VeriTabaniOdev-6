# 📱 Günün Notu - React Native & SQLite
<img width="466" height="970" alt="Ekran görüntüsü 2026-05-22 001024" src="https://github.com/user-attachments/assets/245f7454-2c05-4b1c-a469-967cec79f451" />

Bu proje, React Native (Expo) ve yerel SQLite veritabanı kullanılarak geliştirilmiş bir "Günün Notu" Android mobil uygulamasıdır. Veritabanı ödevi (VeriTabaniOdev-6) kapsamında tasarlanan bu uygulamada, tek ekran üzerinden tüm veritabanı işlemleri akıcı bir şekilde yönetilmektedir. Modern ve göz yormayan **Koyu Tema (Dark Mode)** prensiplerine göre kodlanmıştır.

## 🚀 Özellikler

* **Not Ekleme (Create):** Kullanıcılar yeni bir günlük mesaj veya not yazıp yerel veritabanına kaydedebilir.
* **Notları Listeleme (Read):** Eklenen tüm notlar ekranın alt kısmında, en yeniden eskiye doğru dinamik olarak listelenir.
* **Not Güncelleme (Update):** Mevcut bir not seçilerek form üzerinden anında değiştirilebilir.
* **Not Silme (Delete):** İstenmeyen notlar tek tıkla cihaz veritabanından kalıcı olarak silinir.
* **Yerel Depolama:** Tüm veriler `expo-sqlite` kullanılarak cihaz hafızasında güvenle saklanır, internet gerektirmez.

## 🛠️ Kullanılan Teknolojiler

* **Frontend:** React Native, Expo
* **Veritabanı:** SQLite (`expo-sqlite`)
* **Arayüz Tasarımı:** React Native StyleSheet (Koyu Tema)

## 💻 Kurulum ve Çalıştırma

Projeyi kendi bilgisayarınızda test etmek için bilgisayarınızda Node.js kurulu olmalıdır. Ardından aşağıdaki adımları izleyebilirsiniz:

1. **Projeyi Klonlayın:**
   ```bash
   git clone [https://github.com/24020091021EyupHalitInci/VeriTabaniOdev-6.git](https://github.com/24020091021EyupHalitInci/VeriTabaniOdev-6.git)
