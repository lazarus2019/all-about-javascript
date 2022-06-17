/*
Giới thiệu về toán tử trong Javascript
    1. Toán tử số học - Arithmetic
    2. Toán tử gán - Assignment
    3. Toán tử so sánh - Comparison
    4. Toán tử logic - Logical

*/

// 1. Toán tử số học - Arithmetic
/*
    +   --> Cộng
    -   --> Trừ
    *   --> Nhân
    **  --> Lũy thừa
    /   --> Chia
    %   --> Chia lấy số dư
    ++  --> Tăng 1 giá trị số
    --  --> Giảm 1 giá trị số

    VD:
    Số chẵn (chia hết cho 2): i % 2 == 0 hoặc (i & 1) == false
    Số lẻ: i % 2 == 1 hoặc (i & 1) == true | tham khảo: https://discuss.codechef.com/t/question-what-is-the-difference-between-if-i-1-and-if-i-1/11241/3

    #Note: Cách (i & 1) nhanh hơn so với cách thông thường
*/

// Trường hợp đặc biệt:
/*
    x++ tăng 1 và trả về giá trị trước khi tăng
    ++x tăng 1 và trả về giá trị sau khi tăng
    x-- giảm 1 và trả về giá trị trước khi giảm
    --x giảm 1 và trả về giá trị sau khi giảm
*/

// 2. Toán tử gán - Assignment
/*
    Toán tử     Ví dụ       Tương đương
    =           x = y       x = y
    +=          x += y      x = x + y
    -=          x -= y      x = x - y
    *=          x *= y      x = x * y
    /=          x /= y      x = x / y
    **=         x **= y     x = x ** y
*/

// 3. Toán tử so sánh - Comparison => boolean
/*
    ==      --> Bằng theo giá trị
    !=      --> Không bằng theo giá trị
    >       --> Lớn hơn
    <       --> Bé hơn
    >=      --> Lớn hơn hoặc bằng
    <=      --> Nhỏ hơn hoặc bằng
    ===     --> Bằng cả giá trị và kiểu dữ liệu
    !==     --> Không bằng cả giá trị và kiểu dữ liệu
*/

// Câu điều kiện
/*
    Các giá trị convert sang boolean sẽ là falsy:
    - 0
    - false
    - '' - ""
    - undefined
    - NaN
    - null

    Các giá trị convert sang boolean sẽ là truthy:
    - Khác falsy
    - '0'
    - ' '
    - 'false'
    - []
    - {}
    - function(){}
*/

// 4. Toán tử logic - Logical => giá trị
/*
    &&      --> Và (And)
    ||      --> Hoặc (Or)
    !       --> Không (Not)
*/

// Logical và câu lệnh if
let a = 1
let b = 2

let result = a < b && a < 0 //=> false
// Vì result là kết quả của phép so sánh vế sau, khi phép so sánh của vế đầu tiên thỏa mãn (= truthy)

let result2 = 'A' && 'B' && 'C' //=> 'C'
// 'A' = true, 'B' = true => kết quả là 'C'

let result3 = 'A' || 'B' || NaN || 'D' //=> 'A'
// Toán tử hoặc (||) sẽ lấy giá trị đầu tiên thỏa mãn (= truthy)

// Toán tử nối chuỗi
/*
    sử dụng dấu +
*/