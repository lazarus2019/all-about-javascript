// https://www.youtube.com/watch?v=jHOop6IefiI

/*
    HTTPRequest

    Là thông tin gửi từ client lên server, để yêu cầu server tìm hoặc xử lý một số thông tin, dữ liệu mà client muốn.
    XML hoặc JSON

    XMLHttpRequest là cú pháp cũ được sử dụng trước khi Promise, fetch, async, await ra đời
*/

// Khởi tạo 1 XMLHttpRequest
var request = new XMLHttpRequest();
request.withCredentials = true;
request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) { 
        console.log('>>check request', request)
    } else if (this.readyState == 4 && this.status != 200) {
        console.log('Error')
    }
};
request.open("GET", "https://jsonplaceholder.typicode.com/posts", true);
request.send();
