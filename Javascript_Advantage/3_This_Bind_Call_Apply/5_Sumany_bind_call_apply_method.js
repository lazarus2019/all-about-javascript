/*
    Tóm tắt bind(), call(), apply() methods

    Giống nhau:
        - Cú pháp truy cập
        - Được kế thừa từ Function.prototype

    Khác nhau:
        - Bind: 
            + Trả ra hàm mới với `this` tham chiếu tới `thisArg`
            + Không thực hiện gọi hàm
            + Nếu được bind kèm `arg1, arg2, ...` thì các đối số này sẽ được ưu tiên hơn

        - Call: 
            + Thực hiện bind `this` với `thisArg` và thực hiện gọi hàm
            + Nhận các đối số cho hàm gốc từ `arg1, arg2, ...`

        - Apply: 
            + Thực hiện bind `this` với `thisArg` và thực hiện gọi hàm
            + Nhận các đối số cho hàm gốc bằng đối số thứ 2 dưới dạng mảng `[arg1, arg2, ...]`
*/

//// Giống nhau
function fn() { }

// Bind
fn.bind()

// Call
fn.call()

// Apply
fn.apply()

fn.bind === Function.prototype.bind // true
fn.call === Function.prototype.call // true
fn.apply === Function.prototype.apply // true

//// Khác nhau
//## Bind
const newBindFn = fn.bind(thisArg, arg1, arg2, ...)
// Đối số đi được truyền theo bind được ưu tiên so hơn khi gọi hàm

newBindFn(arg1, arg2)
// Chỉ nhận đối số gọi hàm khi không truyền đối số trong bind

//## Call
fn.call(thisArg, arg1, arg2, ...)

//## Apply
fn.apply(thisArg, [arg1, arg2, ...])