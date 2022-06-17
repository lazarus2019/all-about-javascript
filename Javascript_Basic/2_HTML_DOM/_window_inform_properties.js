// https://openplanning.net/12397/javascript-window

/*
    Một vài thuộc tính không phổ biến trong Window object

    window.status: thiết lập nội dung văn bản hiển thị trên thanh trạng thái (nằm dưới cùng trình duyệt) khi hover thẻ a (tạo fake URL)
    window.name: lấy hoặc thiết lập tên cho cửa sổ
    window.frameElement: Trả về phần tử (element) mà cửa sổ này đang được nhúng (embedded) vào, hoặc null nếu cửa sổ này không được nhúng.
    window.frames: Trả về một mảng các frame bên trong cửa sổ hiện tại.
    window.length: Trả về số lượng các frame bên trong cửa sổ hiện tại. Xem thêm window.frames.
    window.parent: Trả về tham chiếu tới cửa sổ cha của cửa sổ (hoặc frame) hiện thời.
    window[0], window[1],...: 	Trả về một tham chiếu tới đối tượng cửa sổ trong frames. Xem thêm window.frames.

    #Note: 
        - window là main frame của trang web
        - Một trang có thể chứa các frame, và một frame có thể chứa các frame khác => hệ thống phân chấp frame
*/

// window.status
window.status = 'some-safe-site.com'

// window.name
window.name // 

// window.frameElement
window.frameElement // 

// window.frames
window.frames // 

// window.length
window.length // 3

// window.parent
window.parent // 

// window[0], window[1]
window[0], window[1] // 

