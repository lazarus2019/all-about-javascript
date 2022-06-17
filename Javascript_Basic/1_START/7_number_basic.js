// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

/*
    SỐ TRONG JAVASCRIPT

    1. Tạo giá trị Number
        - Các cách tạo
        - Dùng cách nào? Tại sao?
        - Kiểm tra data type
    2. Làm việc với Number
*/

let age = 20 // Number
let PI = 3.14 // Number
let otherNumber = new Number(9) // Object

console.log(typeof otherNumber) // Object

let result = 20 / 'Ok' // NaN = Not a number
console.log(isNaN(result)) // true

/*
    Một vài (6) phương thức (methods) của số:
*/

// 1. toString: chuyển số sang chuỗi
console.log(age.toString()) // '20'
console.log(PI.toString()) // '3.14'

// 2. toFixed: chuyển sang chuỗi dạng thập phân (mặc định không cần truyền tham số = 0)
console.log(PI.toFixed()) // '3'
console.log(PI.toFixed(0)) // '3'
console.log(PI.toFixed(5)) // '3.14000'

// 3. toPrecision: chuyển sang chuỗi dạng làm tròn lên với độ dài (> 0)
console.log(PI.toPrecision()) // '3.14'
console.log(PI.toPrecision(2)) // '3.1'
console.log(PI.toPrecision(5)) // '3.1400'

// 4. valueOf: chuyển đối tượng số sang số (dạng nguyên bản)
(123).valueOf(); // 123
(100 + 23).valueOf(); // 123

// 5. Number, parseFloat, parseInt
// Number: Chuyển đổi giá trị JS sang số, và trả về số milliseconds từ 1/1/1970
Number(true); // 1
Number(false); // 0
Number(" 10  "); // 10
Number("10.33"); // 10.33
Number("10,33"); // NaN
Number("10 33"); // NaN
Number("John"); // NaN
Number(new Date("1970-01-02")) // 86400000

// parseInt: chuyển chuỗi sang số và chỉ trả về 1 số nguyên duy nhất
parseInt("-10"); // -10
parseInt("-10.33"); // -10
parseInt("10 20 30"); // 10
parseInt("10 years"); // 10
parseInt("years 10"); // NaN

// parseFloat: chuyển chuỗi sang số và chỉ trả về 1 số thập phân
parseFloat("10"); // 10
parseFloat("10.33"); // 10.33
parseFloat("10 20 30"); // 10
parseFloat("10.33 years"); // 10.33
parseFloat("years 10"); // NaN

// 6. Kiểm tra số
Number.isInteger(0) // true
Number.isInteger(1.4) // false

isNaN(0) // false
isNaN('1.4') // false
isNaN('a1.4') // true

/*
    Một vài (4) thuộc tính (attributes) của số:
*/

// MAX_VALUE: giá trị số lớn nhất của JS
Number.MAX_VALUE // 1.7976931348623157e+308

// MIN_VALUE: giá trị số nhỏ nhất của JS
Number.MIN_VALUE // 5e-324

// POSITIVE_INFINITY: số vô tận dương
Number.POSITIVE_INFINITY // Infinity

// NEGATIVE_INFINITY: số vô tận dương
Number.NEGATIVE_INFINITY // -Infinity

