# BERLIN 1945: FLAKTURM — HƯỚNG DẪN TRIỂN KHAI PWA

Gói này đã được cấu hình đầy đủ chuẩn **Progressive Web App (PWA)**:
- `manifest.json`: Khai báo ứng dụng toàn màn hình ngang (`landscape`), theme `#141216`, icon `any` & `maskable`.
- `sw.js`: Service Worker lưu cache toàn bộ mã nguồn, hình ảnh, 19 file `.mp3` (hỗ trợ đầy đủ HTTP Range 206 khi phát âm thanh) và tự động lưu cache Three.js + font chữ sau lần mở đầu tiên để chơi **100% Offline**.
- `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`: Bộ biểu tượng tháp pháo Flakturm độ phân giải cao.
- `index.html`: Đã tích hợp thẻ meta iOS/Android, đăng ký Service Worker và nút **CÀI ĐẶT ỨNG DỤNG (PWA)** ngay trên màn hình chính khi trình duyệt hỗ trợ cài đặt.

## Cách chạy thử & Đóng gói
1. **Chạy thử trên máy tính:** Nhấp đúp `run_game.bat` (hoặc chạy `python -m http.server 8000`) và truy cập `http://localhost:8000`.
2. **Đưa lên mạng (bắt buộc HTTPS để cài đặt PWA trên điện thoại):**
   - Upload toàn bộ thư mục này (trừ `run_game.bat` và file `.md` nếu muốn gọn) lên **Cloudflare Pages**, **Vercel**, **Netlify** hoặc **GitHub Pages**.
3. **Đóng gói thành file APK Android (tùy chọn):**
   - Sau khi có đường dẫn HTTPS, dán URL vào [PWABuilder.com](https://www.pwabuilder.com/) để xuất gói Android TWA (`.apk` / `.aab`) mà không cần viết thêm mã nguồn.
