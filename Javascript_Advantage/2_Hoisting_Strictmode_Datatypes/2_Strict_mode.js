/*
    Strict Mode(ES6-2015) - Nghiêm ngặt

    Cách sử dụng:
        - "use strict"; vào đầu file .js
        - "use strict"; vào ngay sau thẻ mở <script>
        - "use strict"; vào đầu phạm vi hàm
    #Note: Có thể dùng hoặc không dùng dấu ;
           Kể từ khi use strict được khai báo, tất cả các dòng phía dưới đều chịu sự tác động
    
    Đặc trưng:
        - Ngăn trường hợp khai báo biến không dùng từ khóa: var, let và const
        - Báo lỗi khi gán lại giá trị cho thuộc tính có writable: false
        - Báo lỗi khi sử dụng delete
        - Báo lỗi khi hàm có tham số trùng tên
        - Khai báo hàm trong code block thì hàm sẽ thuộc phạm vi code block
        - Không đặt tên biến, tên hàm bằng một số từ khóa "nhạy cảm" của ngôn ngữ
        - Không cho phép khai báo giá trị biến dưới dạng hệ nhị phân
        - Không sử dụng được with
        - Không cho phép khai báo biến trong eval
    
    Công dụng:
        - Tránh "quên" từ khóa khai báo biến
        - Tránh trùng tên biến dẫn tới lỗi logic
        - Sử dụng bộ nhớ hiệu quả vì tạo biến global
*/

fullName = 'Krix Dan' // Tạo biến fullName ở phạm vi global

function testFunc() {
    age = 18 // Tạo biến age ở phạm vi global
}

testFunc()

console.log(fullName, age) // 'Krix Dan' 18
//=> Không xuất hiện lỗi

//// [Các trường hợp bị ảnh hưởng bởi Strict mode]
// Khai báo biến không dùng từ khóa var, let, const
// Chế độ thường
variable = "krixdan";
console.log(variable);

// CÓ STRICT MODE
"use strict"
variable = "tranvanmy";
console.log(variable);
//=> ReferenceError: variable is not defined

// Ghi đè thuộc tính chỉ được phép đọc
// Chế độ thường
const student = Object.freeze({
    fullName: 'Krix Dan'
})

student.fullName = 'Lucas Mosh'
console.log(student.fullName) // 'Krix Dan'

// Hoặc sử dụng Object.defineProperties
const cat = {}
Object.defineProperties(cat, 'name', {
    value: 'Milo',
    // Khi sử dụng defineProperties thì writable mặc định = false
    writable: false
})

cat.name = 'Happy'
console.log(cat.name) // 'Milo'

// CÓ STRICT MODE
"use strict"
const student = Object.freeze({
    fullName: 'Krix Dan'
})

student.fullName = 'Lucas Mosh' // Lỗi chỗ này
console.log(student.fullName)
//=> TypeError: Cannot assign to read only property 'fullName' of object

// Sử dụng delete dù có thực hiện được hay không
// Chế độ thường
const student = {
    fullName: 'Krix Dan',
    age: 20
}

delete student.age
console.log(student.age) // undefined
delete student // Có thực thi nhưng không xóa được
console.log(student) // {fullName: 'Krix Dan'}

// CÓ STRICT MODE
"use strict"
const student = {
    fullName: 'Krix Dan',
    age: 20
}

delete student.age // Hiện lỗi ngay tại đây
console.log(student.age)
delete student // Hiện lỗi ngay tại đây
console.log(student)
//=> SyntaxError:Delete of an unqualified identifier in strict mode

// Sử dụng tham số trùng tên
// Chế độ thường
function sum(a, a) { return a + a }
console.log(sum(2, 10)) // 20, lấy giá trị được gán sau

// CÓ STRICT MODE
"use strict"
function sum(a, a) // Hiện lỗi ngay tại đây
{ return a + a }
console.log(sum(2, 10))
//=> SyntaxError: Duplicate parameter name not allowed in this context

// Khai báo hàm trong code block thì hàm sẽ thuộc phạm vi code block đó
// Chế độ thường
{
    {
        function sum(a, b) { return a + b }
    }
}

console.log(sum(2, 10)) // 12

// CÓ STRICT MODE
"use strict"
{
    {
        function sum(a, b) { return a + b }
        // Hàm sum chỉ được phép chạy trong code block này
    }
}

console.log(sum(2, 10)) // Hiện lỗi ngay tại đây
//=> ReferenceError: sum is not defined

// Khai báo tên biến/hàm với từ khóa của ngôn ngữ
// Chế độ thường
const private = 10
console.log(private) // 10

// CÓ STRICT MODE
"use strict"
const private = 10 // Hiện lỗi ngay tại đây
console.log(private)
//=> SyntaxError: Unexpected strict mode reserved word

// Khai báo giá trị biến dạng hệ nhị phân
// Chế độ thường
var num = 010100101010101
console.log(num) // 558362792001

// CÓ STRICT MODE
"use strict"
var num = 010100101010101 // Hiện lỗi ngay tại đây
console.log(num)
//=> SyntaxError: Octal literals are not allowed in strict mode.

// Sử dụng with
// Chế độ thường
var bar = 1
var foo = 2
with (bar) {
    console.log(foo) // 2
}

// CÓ STRICT MODE
"use strict"
var bar = 1
var foo = 2
with (bar) // Hiện lỗi ngay tại đây
{
    console.log(foo)
}
//=> SyntaxError: Strict mode code may not include a with statement

// Khai báo biến trong eval
// Chế độ thường
eval("var x = 4")
console.log(x) // 4

// CÓ STRICT MODE
"use strict"
eval("var x = 4") // Hiện lỗi ngay tại đây
console.log(x)
//=> Uncaught ReferenceError: x is not defined
