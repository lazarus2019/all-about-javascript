/*

    window.innerHeight: chiều cao bên trong của cửa sổ trình duyệt
    window.innerWidth: chiều dài bên trong của cửa sổ trình duyệt
    window.outerHeight: chiều cao bên ngoài của cửa sổ trình duyệt (tính cả phần header của browser)
    window.outerWidth: chiều dài bên ngoài của cửa sổ trình duyệt (tính cả phần header của browser)
    windowName.resizeBy(): cộng/trừ dồn kích thước cửa sổ so với kích thước hiện tại (sử dụng nhiều lần để tăng nhiều lần)
    windowName.resizeTo(): sửa lại kích thước cửa sổ thành một kích thước mới cụ thể
    window.screen: những thông tin về màn hình của người truy cập
    window.screenX: vị trí chiều ngang của cửa sổ so với màn hình
    window.screenY: vị trí chiều thắng đứng của cửa sổ so với màn hình
    window.screenLeft [IE]: vị trí chiều ngang của cửa sổ so với màn hình
    window.screenTop [IE]: vị trí chiều thắng đứng của cửa sổ so với màn hình

    #Note: Các thuộc tính có giá trị như nhau:
        - window.screenX & window.screenLeft
        - window.screenY & window.screenTop
*/

//// window.innerHeight
window.innerHeight // 494
innerHeight // 494

//// window.innerWidth
window.innerWidth // 453
innerWidth // 453

//// window.outerHeight
window.outerHeight // 1033
outerHeight // 1033

//// window.outerWidth
window.outerWidth // 728
outerWidth // 728

//// windowName.resizeBy()
let myWindow;
function openWin() {
    myWindow = window.open("", "", "width=100, height=100");
}

function resizeWin() {
    myWindow.resizeBy(250, 250);
}

//// windowName.resizeTo()
let myWindow;
function openWin() {
    myWindow = window.open("", "", "width=200, height=100");
}

function resizeWin() {
    myWindow.resizeTo(300, 300);
}

//// window.screen
/*
    Properties:
        - height: chiều cao thực của màn hình
        - width: chiều rộng thực của màn hình
        - availHeight: chiều cao thực của màn hình (ngoại trừ windows taskbar)
        - availWidth: chiều rộng thực màn hình (ngoại trừ windows taskbar)
        - colorDepth: độ sâu màu (độ sâu bit)
        - pixelDepth: độ sau pixel
*/

screen.height // 768
screen.width // 1366
screen.availHeight // 728
screen.availWidth // 1366
screen.colorDepth // 24
screen.pixelDepth // 24

//// window.screenX
window.screenX // 700
screenX // 700

//// window.screenY
window.screenY // 350
screenY // 350

//// window.screenLeft
window.screenLeft // 700
screenLeft // 700

//// window.screenTop
window.screenTop // 350
screenTop // 350