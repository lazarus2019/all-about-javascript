/*
    DOCUMENT
    - Thành phần đầu chuỗi
    - Đại diện cho toàn bộ website

    Đối tượng document chứa hai node đặc biệt là document.head, document.body và document.documentElement
    - document.head - Phần đầu(head) của document
    - document.body - Phần thân(body) của document
    - document.documentElement - Toàn bộ document
    => JS có thể truy cập vào hai node này, từ đó truy cập toàn bộ đối tượng trên trang web.

*/

console.log(document)

// document.write: phương thức ghi text vào thẻ body tại vị trí dưới cùng (sau element cuối cùng)

document.writeln('THIS IS CONTENT')
document.writeln('THIS IS CONTENT')
document.writeln('THIS IS CONTENT')
document.write('THIS IS CONTENT')
// writeln: để xuống hàng sau khi in ra