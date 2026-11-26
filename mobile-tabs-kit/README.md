# Mobile-Optimized Tabs & Auto-Align Kit

Gói thành phần tab responsive dành cho giao diện mobile, tích hợp tự động căn giữa tab đang chọn, hỗ trợ vuốt ngang mượt mà và chuyển đổi linh hoạt giữa 3 chế độ trên màn hình nhỏ.

## Các tệp trong gói
- `index.html`: Trang demo hoàn chỉnh để kiểm thử trên desktop và mobile.
- `tabs.css`: Stylesheet tối ưu touch target (`>= 44px`), ẩn thanh cuộn thô, hiệu ứng fade hai mép và các chế độ hiển thị trên mobile.
- `tabs.js`: Logic chuyển tab, chuẩn keyboard/ARIA (`ArrowLeft`, `ArrowRight`, `Home`, `End`), tự động căn giữa tab active và đồng bộ khi resize/xoay màn hình qua `ResizeObserver`.

## Cách dùng nhanh
1. Nhúng `tabs.css` và `tabs.js` vào trang của bạn.
2. Đặt cấu trúc `.m-tabs > .m-tabs__list > button[role="tab"]`.
3. Chọn chế độ trên mobile qua thuộc tính `data-mobile-mode` trên `.m-tabs`:
   - `scroll` (mặc định): cuộn ngang mượt + tự căn giữa tab đang chọn.
   - `grid`: tự xếp lưới gọn trên màn hình nhỏ (`<= 640px`).
   - `bottom`: cố định thanh tab ở cạnh dưới màn hình trên mobile (có hỗ trợ `env(safe-area-inset-bottom)`).
