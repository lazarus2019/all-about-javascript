// https://viblo.asia/p/tong-hop-ve-cors-Qbq5QpM3lD8 | https://topdev.vn/blog/cors-la-gi/ | https://www.w3.org/wiki/CORS_Enabled#In_Plack_Scripts

/*
    CORS - Cross-origin resource sharing

    Khái niệm: là 1 cơ chế cho phép nhiều tài nguyên khác nhau (fonts, js,...) của trang web có thể được truy vấn từ domain khác với domain của trang đó. CORS sinh ra vì same-origin policy

    same-origin policy: Javascript chỉ có thể gọi tới những resource nằm trên dùng location của script đang chạy => giúp ngăn chặn việc truy cập resource từ các domain khác một cách vô tội vạ.

    origin = http/https + domain + port
    => nếu khác 1 trong 3 thành phần trên thì đã khác origin

    Những thuộc tính thiết lập CORS:
        - Origin: Những URL được truy cập vào resource
        - Methods: Những phương thức được thưc hiện với resource (GET, POST, PUT,...)
        - Header:

    Cơ chế hoạt động: CORS được sử dụng tại bên cung cấp resource (server-backend) để cho phép các trang web khác lấy resource
    Client call API => CORS => Header    

    Header:
        - Access-Control-Allow-Origin
        - Access-Control-Request-Method
        - Access-Control-Allow-Credentials (enable cookie)

    Các truy vấn bắt buộc dùng CORS (tiêu chuẩn quốc tế):
    - XMLHttpRequest, Fetch API đến 1 domain khác
    - WebGL Texture
    - Ảnh, video được vẽ vào canvas sử dụng drawImage
    - Web fonts truy vấn đến domain khác qua @fontface của CSS => trang web chỉ sử dụng font dạng Truy Type khi được cho phép.

    Cách sử dụng: mỗi ngôn ngữ sẽ có một cách thiết lập CORS riêng.
    Đối với nodeJS thì sử dụng library cors.
    VD:
        app.use(
            cors({
                origin: 'https://127.0.0.1:5055',
                methods: ['GET', 'PUT', 'POST', 'PATCH'],
                credentials: true
            })
        )
*/