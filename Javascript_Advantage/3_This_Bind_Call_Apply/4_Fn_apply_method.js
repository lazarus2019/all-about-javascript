/*
    Fn.apply() - Gọi hàm, cho phép ràng buộc như bind và có thể truyền đối số cho hàm gốc dưới dạng MẢNG(array)

    Tính năng tương tự call() method
        - Truyền đối số
        - Mượn hàm
        - Kế thừa
*/
//// Truyền đối số
const teacher = {
    firstName: 'Minh',
    lastName: 'Thu'
}

function greet(greeting, message) {
    return `${greeting} ${this.firstName} ${this.lastName}. ${message}`
}

let result = greet.apply(teacher, ['Em chào cô', 'Cô dạy môn gì thế ạ?'])

console.log(result) // 'Em chào cô Minh Thu. Cô dạy môn gì thế ạ?'

// So sánh với call() method
result = greet.call(teacher, 'Em chào cô', 'Cô dạy môn gì thế ạ?')

console.log(result) // 'Em chào cô Minh Thu. Cô dạy môn gì thế ạ?'

//// Mượn hàm
const teacher = {
    firstName: 'Minh',
    lastName: 'Thu',
    isOnline: false,
    goOnline() {
        this.isOnline = true
        console.log(`${this.firstName} ${this.lastName} is Online`)
    },
    goOffline() {
        this.isOnline = false
        console.log(`${this.firstName} ${this.lastName} is Offline`)
    }
}

const me = {
    firstName: 'Thanh',
    lastName: 'Toàn',
    isOnline: false
}

console.log('Teacher is Online: ', teacher.isOnline) // false
teacher.goOnline()
console.log('Teacher is Online: ', teacher.isOnline) // true

console.log('//-------------//')

console.log('Student is Online: ', me.isOnline) // false
teacher.goOnline.apply(me) // Mượn hàm goOnline từ teacher
console.log('Student is Online: ', me.isOnline) // true


//// Kế thừa (extends)
function Animal(name, weight){
    this.name = name
    this.weight = weight
}

function Parrot(){
    // Kế thừa các thuộc tính từ Animal
    Animal.apply(this, arguments)
    // Vì apply nhận 1 mảng các đối số nên có thể dùng arguments để nạp vào
    // Khác với call khi phải tạo tham số thì mới sử dụng được

    this.speak = function(){
        console.log(`${this.name} have ${this.weight} and can speak`)
    }
}

const leo = new Parrot('Leo', 300)

leo.speak() // 'Leo have 300 and can speak'