// https://www.w3schools.com/js/js_objects.asp

/*
    Tạo Object

    - By object literal (Theo nghĩa đen): sử dụng {}
    - Tạo trực tiếp đối tượng nguyên mẫu: sử dụng từ khóa new Object()
    - Sử dụng object constructor (using new keyword): function User(name, age, address){...}
*/
var emailKey = 'email'

let userInfo = {
    name: 'Krix',
    age: 20,
    address: 'Vietnam',
    getName: function () {
        return this.name
    },
    // Thêm key mới
    [emailKey]: 'myemail@gmail.com'
}

// Function --> Phương thức / method
// Others --> Thuộc tính / property

// Xem tất cả thuộc tính và phương thức của đối tượng
console.log(userInfo)

// Lấy dữ liệu bằng key
console.log(userInfo.name) // 'Krix'
console.log(userInfo['name']) // 'Krix'

// Lấy dữ liệu từ method trong object
console.log(typeof userInfo.getName) // function
console.log(userInfo.getName()) // 'Krix'

/*
    Sử dụng từ khóa new Object()
*/

let myInfo = new Object()
myInfo.name = 'Krix'
myInfo.age = 20
myInfo.address = 'Vietnam'

/*
    Object Constructor: Hàm tạo
    => Bản thiết kế riêng cho từng đối tượng
*/
function User(firstName = '', lastName = '', avatar = '') {
    this.firstName = firstName
    this.lastName = lastName
    this.avatar = avatar

    this.getFullName = function () {
        return `${this.firstName} ${this.lastName}`
    }
}

// Tạo object constructor bằng Expression function
const User2 = function (firstName = '', lastName = '', avatar = '') {
    this.firstName = firstName
    this.lastName = lastName
    this.avatar = avatar
}


let author = new User('Krix', 'Daniel', 'avatar')
let user = new User('Vũ', 'Nguyễn', 'avatar')

// Thêm thuộc tính riêng cho từng đối tượng, không hỗ trợ thêm phương thức mới
author.title = 'Chia se dao tai F8'
user.comment = 'This is comment content'

// Xem tất cả thuộc tính và phương thức của đối tượng
console.log(author)

console.log(author.title) // 'Chia se dao tai F8'
console.log(user.getFullName()) // 'Vũ Nguyễn'

/*
    Object Prototype: Đối tượng nguyên mẫu (khuôn)
    1. Prototype là gì?
        => Là thành phần cấu thành nên đối tượng
    2. Sử dụng khi nào
        => Thêm thuộc tính(property) hoặc phương thức(function) vào đối tượng constructor
*/

// Thêm thuộc tính mới vào object constructor
User2.prototype.phone = '0561534454'

User2.prototype.getPhone = function(){
    return this.phone
}

let user2 = new User2('Nam', 'Nguyễn', 'avatar')

console.log(user2.phone) // '0561534454'
console.log(user2.getPhone()) // '0561534454'


