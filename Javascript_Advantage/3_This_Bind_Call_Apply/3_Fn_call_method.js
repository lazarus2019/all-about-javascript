/*
    Fn.call() - Gọi hàm, cho phép ràng buộc như bind và có thể truyền đối số

    - Giúp gọi hàm và bind this đối tượng khác, mặc định this là window object
    - Không trả ra hàm mới, nó gọi luôn hàm sau khi bind this (Fn.bind() thì chỉ bind this nhưng không gọi hàm)
    - Dùng để mượn hàm - function borrowing
    - Có thể dùng để kế thừa properties & methods từ 1 Constructor khác

    Fn.call(objectName, parameter1, parameter2,...)
    Tương tự bind, trong đó:
        - objectName: Tên đối tượng muốn ràng buộc vào từ khóa THIS
        - parameter1, parameter2,...: Là những đối số muốn truyền vào hàm trước .call()
*/

//// Ví dụ: Gọi hàm với call method
function random() {
    console.log(Math.random())
}
random()

random.call() // Là 1 phương thức để gọi hàm, tương tự như cách gọi hàm thông thường

//// Ví dụ: Gọi hàm bind this, trong strict mode vẫn có THIS nếu được bind
const teacher = {
    firstName: 'Minh',
    lastName: 'Thu'
}

const me = {
    firstName: 'Quốc',
    lastName: 'Bảo',
    showFullName() {
        console.log(`${this.firstName} ${this.lastName}`)
    }
}

me.showFullName.call(teacher) // 'Minh Thu'

// Ví dụ trong strict mode
'use strict'
this.firstName = 'Minh'
this.lastName = 'Tú'

function showMyFullName() {
    console.log(`${this.firstName} ${this.lastName}`)
}

showMyFullName() // Lỗi vì undefined (không có S-M thì in ra undefined undefined)

showMyFullName.call(this) // Ràng buộc window object cho phương thức
//=> 'Minh Tú'

//// Ví dụ: Thể hiện tính kế thừa (extends) trong OOP
function Animal(name, weight) {
    this.name = name
    this.weight = weight
}

function Chicken(name, weight, legs) {
    // Kế thừa các thuộc tính từ Constructor khác
    Animal.call(this, name, weight)
    this.legs = legs
}

const poo = new Chicken('Poo', 5, 2)
console.log(poo) // {legs: 2, name: 'Poo', weight: 5}

//// Ví dụ: Mở rộng chức năng của hàm mà không cần sửa trực tiếp hàm cũ
var user = {
    name: 'XXX',
    showName: function () {
        console.log('My name is: ' + this.name);
    }
}
user.showName() // My name is XXX

var oldShowName = user.showName.bind(user);
user.showName = function () {  // ở đây ta thay đổi hàm showName bằng hàm mới
    console.log('before show name');
    oldShowName.call(this);  // giữ nguyên hàm cũ
    console.log('after show name');

}

user.showName();

//// Ví dụ: Mượn hàm (function borrowing), thêm ví dụ với arguments
function logger() {
    // Vì arguments không có sẵn methods tương tự Array => mượn methods của Array để dùng
    Array.prototype.forEach.call(arguments, item => {
        console.log(item)
    })

    // Hoặc sử dụng
    const arr = Array.prototype.slice.call(arguments)

    arr.forEach(item => console.log(item))
}

logger(1, 2, 3, 4, 5, 6, 'A')
//## Những cách trên không nhất thiết phải sử dụng, chỉ cần học để hiểu sâu về ngôn ngữ JS
//=> Thay vì cách trên thì có thể dùng tới for loop, Array.from(arguments) hay thậm chí là [...arguments]