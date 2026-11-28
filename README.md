# BERLIN 1945: FLAKTURM — 12.8 cm Flak 40 (L/61)

## Cập nhật mới: Hiệu ứng Nhiệt Nòng Pháo 3D (Thermal Barrel Glow)
- **Chuyển màu vật liệu & phát sáng theo 3 giai đoạn nhiệt thực tế:**
  1. **10% – 42% nhiệt (Vàng cam):** Nòng pháo nóng dần và phát ánh sáng vàng cam ấm (`#ffaa14`).
  2. **42% – 74% nhiệt (Cam đậm):** Chuyển sang sắc cam đậm rực (`#ff5500`) khi xả đạn liên tục.
  3. **74% – 100% nhiệt (Đỏ rực cam / Quá nhiệt):** Nòng pháo nung đỏ rực cam (`#ff1e00`), nhấp nháy cảnh báo khi quá nhiệt và nguội dần trở lại màu thép nòng súng ban đầu.
- **Gradient nhiệt dọc chiều dài nòng pháo:** Đầu nòng (`muzzleCollar`) và thân nòng trước (`barrelFront`) nóng rực nhất, giảm dần về phía khóa nòng (`barrelRear`), kèm nguồn sáng động `barrelHeatLight` hắt ánh cam đỏ lên giá pháo và làn khói nhiệt bốc lên khi nòng trên 45% nhiệt.

## Cách chạy game
- Trên Windows, nhấp đúp `run_game.bat`. Cửa sổ máy chủ sẽ mở; giữ cửa sổ này chạy trong lúc chơi. Trình duyệt sẽ mở game tại `http://localhost:8000`.
- Hoặc chạy `python -m http.server 8000` trong thư mục game rồi mở `http://localhost:8000`.
- Game tải Three.js từ CDN nên cần kết nối Internet. Mở `index.html` trực tiếp bằng `file://` có thể bị trình duyệt chặn module vì CORS.
- Nếu muốn dùng âm thanh `.mp3` tùy chỉnh, đặt file vào thư mục `audio/` theo hướng dẫn trong `audio/README_AUDIO.txt`.

## Cơ chế chiến đấu
- Màn hình chính dùng cảnh 3D của game ở chế độ demo: đèn pha quét bầu trời, máy bay tuần tra và chớp nổ xa; demo tự ẩn khi cinematic bắt đầu.
- Intro được dựng như một cú máy theo camera liên tục, có chuyển động chuyển cảnh mượt, khung hình điện ảnh, không hiện thẻ thông tin cảnh hay thanh phụ đề.
- P-51D là mục tiêu nhỏ, nhanh và cơ động; B-17, Lancaster và Il-4 bay chậm hơn, chịu đạn tốt và thả bom vào Berlin hoặc Flakturm.
- Máy bay bị bắn trọng thương có thể mất kiểm soát, lao xuống thành phố hoặc tháp; va chạm gây thiệt hại.
- Mỗi đợt tăng số lượng, tốc độ và độ bền máy bay; cứ 5 đợt có đợt oanh tạc tổng lực. Pháo chính quá nhiệt nếu bắn liên tục, còn đạn 128 mm và tên lửa R1 bị giới hạn và được tiếp tế giữa các đợt.
- Bảng kết trận ghi số máy bay hạ, độ chính xác và phần trăm thiệt hại của Berlin cùng Flakturm.

## Điều khiển và mô phỏng phòng không
- Trên máy tính, ngắm bằng Pointer Lock duy nhất: bấm chuột vào game để khóa con trỏ rồi di chuột xoay tháp. Giữ một tâm ngắm ở giữa màn hình; trên điện thoại vẫn dùng thao tác vuốt.
- Lăn con lăn chuột khi đang chơi để chỉnh cự ly ngòi nổ 128 mm từ 250–1.800 m; phím `[` / `]` cũng chỉnh được. Mảnh đạn nổ theo cự ly đã đặt.
- Tháp pháo có quán tính: vòng ngắm rỗng biểu thị hướng yêu cầu, dấu ngắm đặc biểu thị hướng nòng đang xoay tới.
- Tên lửa Rheintochter R1 cần điều khiển bằng cách giữ tâm ngắm trên mục tiêu sau khi phóng.
- Tiếng nổ ở xa tới trễ theo khoảng cách và tốc độ âm thanh xấp xỉ 343 m/s.
- Đạn có thể làm hỏng động cơ, cánh, bánh lái hoặc bình nhiên liệu; máy bay mất kiểm soát có thể lao xuống và gây nổ thứ cấp.
- Pathfinder có ở một số đợt. Hạ nó trước khi thả pháo sáng làm bomber mất dấu mục tiêu và bom có thể rơi lệch. Máy bay thả lá nhôm gây nhiễu máy đo cự ly và đèn pha.
- Pháo nổ mảnh 128 mm có thể làm hỏng Me-262 đồng minh nếu bắn vào khu vực chúng đang giao chiến.
- Giữ mục tiêu trong tâm ngắm khoảng 2 giây để Kommandogerät 40 tạo phần tử bắn; vòng sai số thu lại và dấu ngắm xanh hiện điểm bắn đón. Vẩy chuột nhanh làm mất chất lượng bám. Bom nổ sát tháp có thể làm hỏng máy đo xa, kẹt tời đạn và giảm tốc xoay tháp tạm thời.
- Nhấn `X` đổi đạn 128 mm giữa HE định thời và AP chạm nổ. Đạn AP bắn thẳng, HE nổ theo cự ly ngòi đã chọn.
- Pháo chính chỉ có khoảng 1/4 viên vạch đường; đạn chịu trọng lực và gió ngang. Phát bắn 128 mm làm tối tầm nhìn ngắn hạn, còn nổ trong tầng mây sẽ làm mây lóe sáng.
- Bom nổ gần đội hình bomber có thể làm phi công hoảng loạn và thả bom lệch. Máy bay trọng thương đôi lúc có phi công bung dù; dù không phải mục tiêu và không ảnh hưởng điểm số.
- Nòng pháo chính mòn dần theo số phát bắn trong cả trận, làm sơ tốc giảm tối đa 7,5%. Bomber hạng nặng có lượt bay thẳng ổn định 12–15 giây; chúng bắt đầu thả loạt bom chính xác hơn ở cuối lượt. Khi sượt qua tháp ở độ cao thấp, xạ thủ có thể bắn một số loạt ngắn vào vị trí pháo, gây hư hại nhẹ và làm rạn kính ngắm quang học tạm thời.

## Hiệu năng
- Tỷ lệ render tự giảm khi tốc độ khung hình thấp và phục hồi từ từ khi máy ổn định; chất lượng ban đầu vẫn giữ mức cao trên màn hình có mật độ điểm ảnh lớn.
- Hình học và vật liệu đạn được dùng lại thay vì tạo mới theo từng phát bắn. Hạt và khói có giới hạn số lượng; vụ nổ ở xa dùng mô hình ít chi tiết hơn vì chỉ chiếm ít điểm ảnh.
- Tối đa 30 máy bay địch hoạt động cùng lúc; phần còn lại của đợt sẽ chờ lượt. Điều này giữ áp lực trận đấu mà tránh số mục tiêu và hiệu ứng tăng vô hạn.
- Các dãy nhà Berlin và cửa sổ lặp trên Flakturm được gộp bằng instancing: vẫn giữ hình dáng/kích thước riêng nhưng giảm mạnh số lệnh vẽ tĩnh mỗi khung hình.
- Khi đợt sóng và số máy bay bị hạ tăng lên, đêm chuyển dần sang rạng đông: bầu trời và ánh sáng chiến trường ấm/sáng hơn, sương mù mỏng đi, đèn pha yếu dần; ống ngắm đổi nhãn thành ống nhòm khi trời sáng.

## Cập nhật chiến đấu & tối ưu Mobile (Bản mở rộng)
- **Ngòi nổ định thời 3 mức (Zeitzünder — Phím `Z`):** Chuyển nhanh giữa **Thấp (550m)**, **Trung (950m)** và **Cao (1.450m)** tạo mây mảnh văng đen đặc nhiều lớp giữa không trung.
- **Máy đo xa Kommandogerät 40:** Giữ tâm ngắm bám mục tiêu **1,5 giây** để đo cự ly thực tế, phát khẩu lệnh tiếng Đức và hiển thị **vòng tròn đón đầu màu xanh** trên HUD.
- **Sóng xung kích đầu nòng & Chớp cam bệ pháo:** Mỗi phát bắn 12.8 cm tạo vòng sóng xung kích giãn nở và ánh chớp cam hắt lên bệ bê tông cùng kíp pháo thủ 3D trong `0,1s`.
- **Pháo sáng treo dù của Pathfinder:** Rơi chậm từ bầu trời Berlin và có thể **bắn rụng** để triệt tiêu độ chính xác 2x của bom địch (+50 Quân công).
- **Bắn hạ nòng đối đất -18° (Từ Đợt 4):** Mở khóa góc hạ nòng âm xuống `-18°` để tiêu diệt đoàn xe tăng **T-34/85**, **IS-2** và pháo tự hành **SU-152** tiến công chân tháp Zoo.
- **Khí cầu phòng không & Pháo tầm thấp nóc nhà:** 6 khí cầu neo cáp thép cản đường bay địch và 8 ụ pháo 20mm/37mm trên nóc nhà Berlin yểm trợ phòng không tầm thấp.
- **Tối ưu Mobile:** Giới hạn `DPR ≤ 1.25`, tắt bóng đổ động để giữ FPS mượt, nút chuyển nhanh đồ họa (`THẤP` / `TRUNG BÌNH` / `CAO` / `TỐI ĐA`) và **Smart Thumb-Slide Fire** (vừa giữ nút bắn vừa rê ngón cái để xoay tháp bám mục tiêu).
