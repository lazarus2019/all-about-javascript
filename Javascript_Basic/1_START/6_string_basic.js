// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

/*
    CHUỖI TRONG JAVASCRIPT

    1. Tạo chuỗi
        - Các cách tạo chuỗi
        - Nên dùng cách nàp? Lý do?
        - Kiểm tra data type
    2. Một số case sử dụng backslash (\)
    3. Xem độ dài chuỗi
    4. Chú ý độ dài khi viết code // 80 ký tự/dòng
    5. Template String ES6 (2015)
*/

let firstName = 'Krix' // String
let lastName = new String('Daniel  ') // Object

console.log(typeof lastName) // Object

// Dùng backslash khi muốn chèn ký tự ' " và \ vào trong chuỗi
let fullName = 'This is all characters \' \" \\' //=> 'This is all characters ' " \'

console.log(firstName.length) // 4
console.log(lastName.length) // 8

// Template String ES6: ``
console.log(`My name is: ${firstName} ${lastName}`) //=> BETTER
// Thay thế cho
console.log('My name is: ' + firstName + ' ' + lastName)

/*
    Một vài (11) phương thức (methods) và thuộc tính (attributes) của chuỗi:
*/
let myString = 'Learn JS at F8 JS ! JS' 

// 1. Length: Độ dài
console.log(myString.length)

// 2. Find index: Tìm vị trí xuất hiện chuỗi
// indexOf: vị trí chuỗi xuất hiện đầu tiên (có thể thêm vị trí bắt đầu)
console.log(myString.indexOf('JS')) // 6
console.log(myString.indexOf('JS', 8)) // 15

// lastIndexOf: vị trí chuỗi xuất hiện cuối cùng
console.log(myString.lastIndexOf('JS')) // 20

// search: vị trí chuỗi xuất hiện đầu tiên
console.log(myString.search('JS')) // 6

// match: tìm kiếm chuỗi theo biểu thức chính quy

// includes: kiểm tra chuỗi có nằm trong chuỗi gốc hay không (có thể thêm vị trí bắt đầu, < 0 => 0)
console.log(myString.includes('at')) // true
console.log(myString.includes('at', 12)) // false

// startsWith (ES6 2015): kiểm tra chuỗi gốc có bắt đầu với chuỗi hay không
console.log(myString.startsWith('JS')) // false
console.log(myString.startsWith('Le')) // true

// endsWith (ES6 2015): kiểm tra chuỗi gốc có kết thúc với chuỗi hay không
console.log(myString.endsWith('JS')) // true
console.log(myString.endsWith('!')) // false

// 3. Cut string: Cắt chuỗi
// slice: từ vị trí ban đầu tới vị trí kết thúc (không bao gồm ký tự cuối)
console.log(myString.slice(6, 8)) // 'JS'
console.log(myString.slice(0)) // 'Learn JS at F8 JS ! JS' 
console.log(myString.slice(-4, -1)) // '! J'

// substring: tương tự với slice, nhưng vị trí âm (<0) sẽ được tính là 0
console.log(myString.substring(-4, 2)) // 'Le'

// substr: lấy từ vị trí ban đầu với số lượng ký tự
console.log(myString.substr(6, 8)) // 'JS at F8'

// 4. Replace: Thay thế
/*
    Note:
        - g: tất cả vị trí
        - i: không phân biệt hoa thường
*/
console.log(myString.replace(/JS/g, 'Javascript')) // 'Learn Javascript at F8 Javascript ! Javascript'

// 5. Convert to upper case: Chuyển sang chữ HOA
console.log(myString.toLocaleUpperCase()) // 'LEARN JS AT F8 JS ! JS'

// 6. Convert to lower case: Chuyển sang chữ thường
console.log(myString.toLocaleLowerCase()) // 'learn js at f8 js ! js'

// 7. Trim: Loại bỏ khoảng trắng ở 2 đầu chuỗi
let originalString = '      JS is awesome   '
console.log(originalString.trim()) // 'JS is awesome'

// 8. Split: Cắt chuỗi thành array
let languages = 'Javascript, PHP, Ruby, C#'
console.log(languages.split(', ')) // [Javascript, PHP, Ruby, C#]

// 9. Get a character by index: lấy ký tự theo vị trí
let nickname = 'Krix'
console.log(nickname.charAt(1)) // 'r'
console.log(nickname[1]) // 'r'

// 10. Concat: nối nhiều chuỗi
console.log(firstName.concat(' ', lastName)) // 'Krix Daniel  '

// 11. padStart/padEnd (ECMA 2017): độn thêm số ký tự vào chuỗi số
let maxPrice = "9"
console.log(maxPrice.padStart(4, "x")) // 'xxx9'
console.log(maxPrice.padEnd(5, "x")) // '9xxxx'

