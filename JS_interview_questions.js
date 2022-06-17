//// Q: Trình xử lý sự kiện được sử dụng như thế nào trong JavaScript?
/*
    A: Sự kiện là những hành vi xuất phát từ những hoạt động giải trí của người dùng như nhấp vào link hoặc nhập văn bản. 
    Cần có một trình xử lý sự kiện để chạy mã khi một sự kiện được kích hoạt trong một thành phần.
    Bộ xử lý sự kiện được đặt như một thuộc tính bổ sung của một đối tượng. 
    Ví dụ: nếu chúng ta muốn xử lý một sự kiện của một nút, thì chúng ta có thể viết:

    const button = document.getElementById('button');
    button.onclick = (event) => {
    //...
    }

    Các eventtham số là một đối tượng mà có mẩu thông tin khác nhau về sự kiện này. 
    Chúng ta cũng có thể sử dụng lệnh addEventListenergọi để làm điều tương tự:

    button.addEventListener('click', (event) => {
    //...
    })
*/

//// Q: Sự khác biệt giữa event.preventDefault() và là event.stopPropagation() gì?

/*
    A: event.preventDefault() được sử dụng để dừng hành vi mặc định của bất kỳ phần tử nào đã kích hoạt sự kiện xảy ra.
    Nếu nó được sử dụng với một form phần tử, thì chúng tôi ngăn nó gửi.
    Nếu nó được sử dụng với một aphần tử, thì preventDefault()nó sẽ ngăn nó điều hướng.

    event.stopProgation() được sử dụng đặc biệt để ngăn sự lan truyền của một sự kiện và ngăn sự kiện xảy ra trong giai đoạn sôi sục và bắt giữ.
*/


//// Q: Làm sao chúng ta biết nếu được event.preventDefault() sử dụng trong một phần tử?

/*
    A: Chúng ta có thể kiểm tra thuộc event.defaultPrevented tính trong đối tượng sự kiện. 
    Nếu nó là true, sau đó event.preventDefault()đã được gọi.
*/

//// Q: Event.target là gì?

/*
    A: event.target là phần tử mà sự kiện đã xảy ra hoặc phần tử nơi sự kiện được kích hoạt.

    const button = document.getElementById('button');
        button.onclick = (event) => {
        console.log(event.target.id);
        }

    Điều này cho thấy đó event.targetlà yếu tố mà sự kiện đã được kích hoạt.
    Nếu tất cả chúng ta thêm một trình giải quyết và xử lý sự kiện cho div, như sau :

    const button = document.getElementById('button');
    const div = document.getElementById('div');
        button.onclick = (event) => {
        console.log(event.target.id);
        }
        div.onclick = (event) => {
        console.log(event.target.id);
        }
*/

//// Q: Event.currentTarget là gì?

/*
    A: event.currentTarget là phần tử đã đính kèm trình xử lý sự kiện một cách rõ ràng.

    const button = document.getElementById('button');
    const div = document.getElementById('div');
        button.onclick = (event) => {
        console.log(`button.onclick ${event.currentTarget.id}`);
        }
        div.onclick = (event) => {
        console.log(`div.onclick ${event.currentTarget.id}`);
        }

    Do đó, chúng tôi thấy event.currentTarget là phần tử chúng tôi đã gắn vào trình xử lý sự kiện.
*/

//// Q: Ủy quyền sự kiện là gì?

/*
    A: Ủy quyền sự kiện là nơi chúng tôi thêm trình nghe sự kiện vào thành phần mẹ thay vì thêm chúng vào những thành phần con.
    Người nghe sẽ kích hoạt bất kể thành phần nào được kích hoạt trên thành phần con vì những sự kiện Open từ thành phần đã kích hoạt sự kiện.
    Nó hữu dụng vì tất cả chúng ta chỉ có một trình giải quyết và xử lý duy nhất được gắn vào thành phần mẹ.
    Cũng không cần phải hủy link trình giải quyết và xử lý khỏi thành phần bị xóa và link nó với những thành phần mới.

    const div = document.getElementById('div');
        div.onclick = (event) => {
        if (event.target.matches("button#button-a")) {
            alert('Button A clicked');
        } else if (event.target.matches("button#button-b")) {
            alert('Button B clicked');
        }
        }

    Sau đó, trong hàm xử lý sự kiện, chúng tôi kiểm tra event.targetđiều đã gọi sự kiện nhấp chuột bằng cách sử dụng matches phương thức.  
    Nếu nút có ID button-ađược nhấp vào, thì chúng tôi sẽ hiển thị hộp cảnh báo với Button A clicked.
    Và nếu nút có ID button-bđược nhấp vào thì chúng tôi sẽ hiển thị một hộp cảnh báo với Button B clicked.
    Như tất cả chúng ta thấy, tất cả chúng ta chỉ có một trình xử lý sự kiện, 
    nhưng tất cả chúng ta hoàn toàn có thể giải quyết và xử lý những sự kiện nhấp chuột của tổng thể những nút bên trong.
*/

//// Q: Sự khác biệt giữa Load và DOMContentLoaded là gì?

/*
    A: Sự DOMContentLoadedkiện được kích hoạt khi tài liệu HTML ban đầu đã được tải hoàn toàn
    và được phân tích cú pháp mà không cần đợi các biểu định kiểu, hình ảnh và khung phụ tải xong.

    Sự loadkiện chỉ được kích hoạt sau khi DOM và tất cả các tài nguyên và nội dung phụ thuộc đã được tải.
*/

//// Q: Vòng lặp sự kiện là gì?

/*
    A: Vòng lặp sự kiện là một vòng lặp đơn luồng theo dõi ngăn xếp cuộc gọi và kiểm tra xem có bất kể mã nào để chạy trong hàng đợi tác vụ hay không .
Nếu ngăn xếp cuộc gọi trống và có những hàm gọi lại trong hàng đợi tác vụ, thì chúng sẽ được xếp lại từ hàng đợi tác vụ và chạy bằng cách đẩy chúng vào ngăn xếp cuộc gọi .
*/