// https://viblo.asia/p/giua-local-storage-session-storage-va-cookie-co-gi-khac-biet-1VgZver2KAw | https://www.youtube.com/watch?v=GihQAC1I39Q

/*
    Web Storage - Lưu trữ web
    3 hình thức lưu dữ liệu dưới Browser:
    Local storage, Session và Cookie

    Local storage:
        - Kích thước tối đa: 10MB
        - Trình duyệt: HTML5
        - Phạm vi truy cập: Cùng chung nguồn gốc (same origin - domain/port/protocol)
        - Hết hạn: Không bao giờ
        - Vị trí lưu: Chỉ trên trình duyệt
        - Gửi thông qua request header: Không
    => Làm năng trình duyệt (rất nhỏ nhưng không đáng kể)
       Tính bảo mật thấp (vì không có lớp bảo vệ nào)
       Tính đồng bộ => thực thi lần lượt

    Session:
        - Kích thước tối đa: 5MB
        - Trình duyệt: HTML5
        - Phạm vi truy cập: 1 tab duy nhất
        - Hết hạn: Khi tab đóng (tải lại trang không làm mất)
        - Vị trí lưu: Chỉ trên trình duyệt
        - Gửi thông qua request header: Không

    Cookie:
        - Kích thước tối đa: 4KB (IE là 4KB - 10KB)
        - Trình duyệt: HTML4/HTML5
        - Phạm vi truy cập: Bất kỳ tab nào
        - Hết hạn: Được tùy chỉnh (thông tin authenticate trong 3-4 tháng)
        - Vị trí lưu: Trình duyệt & server
        - Gửi với request: Có
        - Thông tin được gửi lên server
    => Có thể đọc dữ liệu từ máy chủ khác
*/