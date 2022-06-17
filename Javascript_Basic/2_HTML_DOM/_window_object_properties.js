// https://www.youtube.com/watch?v=ZJng8ls8uH0 | https://www.w3schools.com/jsref/met_win_open.asp

/*
    Window Object thuộc BOM (Browser Object Model)
    
    Là đại diện cho một cửa sổ trong trình duyệt => tạo ra tự động bởi trình duyệt
    Khác hoàn toàn với đối tượng JS (String, array, date,...)

    window.open(URL, name, specs, replace): mở một cửa sổ trình duyệt mới, một tab mới, hay thay thế cửa sổ hiện tại
    window.opener: trả về cửa sổ gốc đã tạo cửa sổ mới
    window.close(): đóng 1 cửa sổ
    window.closed: thuộc tính kiểm tra cửa sổ trình duyệt đã đóng chưa
    window.moveTo(...): di chuyển cửa sổ tới một tọa độ cụ thể
    window.moveBy(...): chuyển cửa sổ so với vị trí tọa độ hiện tại
    window.focus(): đưa cửa sổ lên đầu tiên
    window.blur(): bỏ tính năng focus lên cửa sổ đó
    window.stop(): dừng tải trang

    window.location: thông tin của URL hiện tại    
    window.navigator: thông tin browser
    window.btoa(text): mã hóa chuỗi sang base-64
    window.atob(encoded): giải mã chuỗi mã hóa base-64
    window.history: chứa những URL mà người dùng truy cập (cùng 1 cửa sổ-window)
    window.self: trả về cửa sổ hiện tại (chỉ có thể đọc, không được gán)
    window.top: trả về cửa sổ trên cùng (topmost) trong cửa sổ trình duyệt (chỉ có thể đọc, không được gán)
*/

//// window.open(URL, name, specs, replace)
/*
    URL: Đường dẫn trang để mở, nếu không truyền vào thì mở một trang/tab trống
    name: 
        - _blank: mở một cửa sổ/tab mới (đây là giá trị mặc định)
        - _parent: tải vào frame cha
        - _self: thay thế trang hiện tại
        - _top: thay thế vào bất kỳ frame nào có thể được tải
        name: tên của cửa sổ (có thể két hợp với target của thẻ a)
    specs:
        - fullscreen = yes|no|1|0: có hay không hiển thị trình duyệt mode fullscreen
        - height: độ cao cửa sổ (min = 100)
        - width: chiều rộng cửa sổ (min = 100)
        - top: vị trí trên của cửa sổ (> 0)
        - left: vị trí bên trái cửa sổ (> 0)
        - location = yes|no|1|0: có hay không hiển thị trường địa chỉ (chỉ dùng cho Opera)
        - menubar = yes|no|1|0: có hay không hiển thị thanh menu
        - resizable = yes|no|1|0: có hay không thay đổi kích thước cửa sổ
        - scrollbars = yes|no|1|0: có hay không hiển thị thanh cuộn
        - status = yes|no|1|0: có hay không thêm thanh trạng thái
        - titlebar = yes|no|1|0: có hay không hiển thị tiêu đề
        - toolbar = yes|no|1|0: có hay không hiển thị công cụ trình duyệt
    replace = true|false: sử dụng history list hiện tại hay tạo mới (false = tạo mới)
*/

// Mở một trang/tab URL mới
window.open("https://www.w3schools.com");

// Mở một trang trống trong 1 window/tab mới
var myWindow = window.open("", "", "width=200,height=100");

// Mở một cửa sổ mới và ghi một vài text vào đó
var myWindow = window.open("", "MsgWindow", "width=200,height=100");
myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");

// Thay thế cửa sổ hiện tại bằng 1 cửa sổ mới
var myWindow = window.open("", "_self");
myWindow.document.write("<p>I replaced the current window.</p>");

// Mở một cửa sổ mới và bổ sung một vài thuộc tính riêng
window.open("https://www.w3schools.com", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");

// Kết hợp với target của thẻ a
// <a href="https://youtube.com" target="newWindow">Replace to Youtube</a>
var myWindow = window.open("", "newWindow", "width=200,height=100");
// khi click vào thẻ a, cửa sổ mới mở sẽ tự động thay URL thành URL của thẻ a

//// window.opener
var myWindow = window.open("", "_self");
myWindow.document.write("<p>I replaced the current window.</p>");

myWindow.opener // Cửa sổ gốc mở myWindow

//// window.close()
myWindow.close() // Tắt cửa sổ đang mở

myWindow.opener.close() // Tắt cửa sổ gốc của cửa sổ đang mở

//// window.closed
if (myWindow) {
    if (myWindow.closed) {
        console.log('It is closed')
    } else {
        console.log('It is open')
    }
}

//// window.moveTo(x, y)
var myWindow = window.open("", "", "width=200,height=100");

myWindow.moveTo(500, 500) // Di chuyển cửa sổ tới vị trí 500:500

//// window.moveBy(x, y)
var myWindow = window.open("", "", "width=200,height=100");

myWindow.moveBy(500, 500) // Di chuyển cửa sổ thêm 500:500 => 700:600

//// window.focus()
var myWindow = window.open("", "", "width=200,height=100");

myWindow.focus() // Giờ cửa sổ đã được xuất hiện lên đầu

//// window.blur()
var myWindow = window.open("", "", "width=200,height=100");

myWindow.focus()
myWindow.blur() // Giờ cửa sổ đã bị xóa thuộc tính focus

//// window.stop()
var myWindow = window.open("", "", "width=200,height=100");

myWindow.stop() // Dừng tải trang ngay lập lúc này

//// window.location = https://www.viblo.asia:8888/posts/?filter=JS#1
/*
    Properties (set or return):
        - hash: anchor part(#) của URL | '#1'
        - host: tên định danh và số cổng  | 'www.viblo.asia:8888'
        - hostname: tên định danh của máy chủ  | 'www.viblo.asia'
        - href: toàn bộ đường dẫn URL  | 'https://www.viblo.asia:8888posts/?filter=JS#1'
        - origin (chỉ read only): giao thức, tên định danh và số cổng  | 'https://www.viblo.asia:8888/posts'
        - pathname: tên path của URL  | '/posts/'
        - port: số cổng của URL  | '8888'
        - protocol: giao thức của URL  | 'https:'
        - search: querystring của URL  | '?filter=JS'
    
    Methods:
        - assign(URL): điều hướng tới 1 URL mới
        - reload(): tải lại trang hiện tại
        - replace(newURL): điều hướng tới 1 URL và xóa current page từ setion history
        - toString(): trả về URL
*/

window.location // 'https://www.viblo.asia:8888/posts/?filter=JS#1'

window.location.hash // '#1'
window.location.host // 'www.viblo.asia:8888'
window.location.hostname // 'www.viblo.asia'
window.location.href // 'https://www.viblo.asia:8888posts/?filter=JS#1'
window.location.origin // 'https://www.viblo.asia:8888/posts'
window.location.pathname // '/posts/'
window.location.port // '8888'
window.location.protocol // 'https:'
window.location.search // '?filter=JS'

// window.location.assign()
location.assign("https://www.w3schools.com");

// window.location.reload(): điều hướng trang web
location.reload()

// window.location.replace(): điều hướng trang web
location.replace("https://www.w3schools.com");

// window.location.href: điều hướng trang web
window.location.href = 'https://www.viblo.asia';

location.toString() // 'https://www.viblo.asia:8888posts/?filter=JS#1

//// window.navigator
/*
    Properties:
        - appCodeName: mã code trình duyệt
        - appName: tên trình duyệt
        - appVersion: phiên bản trình duyệt
        - cookieEnabled: kiểm tra cookie có được bật hay chưa
        - geolocation: đối tượng geolocation cho vị trí của người dùng
        - language: ngôn ngữ trình duyệt
        - onLine: kiểm tra trình duyệt có online hay không
        - platform: nền tảng trình duyệt
        - product: tên động cơ trình duyệt
        - userAgent: tác nhân người dùng (AU) - là chuỗi nhận dạng của trình duyệt khi gửi yêu cầu tới Web server.
*/

navigator.appCodeName // 'Mozilla'
navigator.appName // 'Netscape'
navigator.appVersion // '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'
navigator.cookieEnabled // true
navigator.geolocation // Geolocation {}
navigator.language // 'en'
navigator.onLine // true
navigator.platform // 'Win32'
navigator.product // 'Gecko'
navigator.userAgent // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36'

//// window.btoa(text) và window.atob(encoded)
let text = 'Hello World!'
let encoded = window.btoa(text) // 'SGVsbG8gV29ybGQh'
let decoded = window.atob(encoded) // 'Hello World!'

//// window.history
/*
    Methods:
        - back(): tải trang trước đó trong history list (tương đương với history.go(-1))
        - forward(): tải trang tiếp theo trong history list (tương đương với history.go(1))
        - go(): tải một trang cụ thể trong history list
        - length: trả ra số lượng URL trong history list
*/
// Trở về trang trước
history.back()
// Hoặc
history.go(-1)

// Chuyển tới trang tiếp theo
history.forward()
// Hoặc
history.go(1)

// Tải trang trong history list1
history.go(2) // chuyển tiếp 2 trang tới
history.go(-2) // quay lại 2 trang trước đó
history.go(0) // reload lại trang

// Số trang có trong history list
history.length // 2

//// window.self và window.top
if (window.top != window.self) {
    text = "This window is NOT the topmost window!";
} else {
    text = "This window is the topmost window!";
}
