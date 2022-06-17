/*
    window.pageXOffset: Số pixel mà document đã được cuộn theo hướng ngang
    window.pageYOffset: Số pixel mà document đã được cuộn theo hướng thắng đứng
    window.scrollX: Số pixel mà document đã được cuộn theo hướng ngang
    window.scrollY: Số pixel mà document đã được cuộn theo hướng thắng đứng
    window.scrollBy(x, y): Cuộng document bằng cách cộng dồn vào vị trí hiện tại
    window.scrollTo(x, y): Cuộn document tới 1 vị trí cụ thể

    #Note: Các thuộc tính có giá trị như nhau:
        - pageXOffset & scrollX
        - pageYOffset & scrollY
*/

//// window.pageXOffset = window.scrollX
window.pageXOffset // 50
window.scrollX // 50

// Hoặc ghi ngắn hơn
pageXOffset // 50
scrollX // 50

//// window.pageYOffset = window.scrollY
window.pageYOffset // 150
window.scrollY // 150

// Hoặc ghi ngắn hơn
pageYOffset // 150
scrollY // 150

//// window.scrollBy(x, y)
window.scrollBy(100, 100) // cứ mỗi lần thực thi thanh cuộn sẽ cuộn thêm x:100|y:100

//// window.scrollTo(x, y)
window.scrollTo(100, 100) // vị trí cuộn hiện tại là x:100|y:100