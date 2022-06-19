/*
    CLASSES
    Khái niệm: Là cách viết khác của constructor function
    Lợi ích: 
        - Tổ chức code gọn gàng hơn
        - Thuộc tính, biến, phương thức được chia theo cấp rõ ràng (có block riêng)

    get và set
    thuộc tính static: hàm chỉ dùng cho class (với các đối tượng được khởi tạo bởi Class thì phải gọi thông qua Class)
    extends và super
*/
// Tạo khuôn mẫu với Constructor function
function CourseFn(name, price) {
    this.name = name
    this.price = price

    this.getName = function () {
        return this.name
    }

    this.getPrice = function () {
        return this.price
    }

    const isSuccess = false
    if (condition) {
        isSuccess = true
    }
}

// Tạo khuôn mẫu với Class
class Course {
    constructor(name, price) {
        this.name = name
        this.price = price
    }

    getName() {
        return this.name
    }

    getPrice() {
        return this.price
    }

    start() {
        let isSuccess = false
        if (condition) {
            isSuccess = true
        }
    }
}

const cSharpCourse = new Course('C#', 1000)
const jsCourse = new Course('Javascript', 1200)

// Get, set và static
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    info() {
        console.log('name', this.name)
        console.log('age', this.age)
    }

    // Hàm set tự động chạy khi khởi tạo
    set name(value) {
        // console.log('In set name')
        this.name = value
    }

    get name() {
        console.log('In get name')
        return this.name
    }

    static hello() {
        console.log('HELLO')
    }
}

let person1 = new Person('NOa', 12)
let person2 = new Person('Philip', 20)
person1.info()
person2.info()

person1.name = 'Ryan'
person1.info()

Person.hello() // HELLO
// person1.hello() // ERROR

//// extends và super: kế thừa class và các thuộc tính đã tạo
class Student extends Person {
    constructor(id, name, age) {
        // Sử dụng từ khóa super để kế thừa các thuộc tính từ class cha
        super(name, age)
        this.id = id
    }

    info() {
        super.info()
        console.log('id', id)
    }
}

let student = new Student(5, 'NOa', 12)
student.info()