/*
    Cookie: document.cookie

    Attributes:
        - name: Định danh cookie (không phân biệt HOA-thường)
        - value: Giá trị lưu trong cookie
        - path: đường dẫn chỉ định kèm domain
        - domain: Doamin hợp lệ có thể truy cập và sử dụng cookie
        - expires: thời gian hết hạn cookie (UTC String, hoặc sử dụng max-age: tính bằng giây)
        - secure flag: thiết lập bảo vệ thông tin, chỉ gửi cookie nếu kết nối SSL được sử dụng
*/

//// Tạo mới cookie
document.cookie = 'domain=viblo.asia; expires=Mon, 17 Aug 2020 7:00:00 UTC;';

// Hoặc có thể thay expires bằng max-age (tính bằng giây), expries sẽ được tính lại dựa trên max-age:
document.cookie = 'domain=viblo.asia; max-age=10';

//// Lấy thông tin cookie
let cookies = document.cookie;
// => Return chuỗi chứa thông tin cookie: "username=namdh; email=google@namdh.com; domain=viblo.asia;"

// Hàm lấy giá trị cookie theo attribute
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

getCookie('domain') // www.google.com

// Cách khác: hàm lấy giá trị cookie theo attribute
function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

//// Thay đổi giá trị cookie (ghi đè)
document.cookie = 'domain=code.viblo.asia; expires=Mon, 17 Aug 2020 7:00:00 UTC;';

//// Xóa cookie (thiết lập expires là thời gian trong quá khứ hoặc max-age <= 0 )
