/*
    CLASSES
    Khái niệm: Là cách viết khác của constructor function
    Lợi ích: 
        - Tổ chức code gọn gàng hơn
        - Thuộc tính, biến, phương thức được chia theo cấp rõ ràng (có block riêng)

    get và set
    thuộc tính static: hàm chỉ dùng cho class (với các đối tượng được khởi tạo bởi Class thì phải gọi thông qua Class)
    extends: Kế thừa thuộc tính của lớp cha
    super: overriding hàm (viết lại phương thức của lớp cha)
        - Trong constructor:
                + Không muốn override thì không cần thêm phần constructor
                + Nếu tạo constructor ở class con thì bắt buộc sử dụng từ khóa super ở vị trí đầu tiên để gọi hàm constructor ở lớp cha
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

// Sử dụng từ khóa Super
class Animal {
    constructor(name) {
        this.name = name;
    }
    run() {
        console.log(`${this.name} đang chạy`);
    }
}

class Rabbit extends Animal {
    // Override hàm run
    run() {
        super.run();
        this.hide();
    }
    hide() {
        console.log(`${this.name} đang ẩn nấp`);
    }
}

let rabbit = new Rabbit("Con thỏ");
rabbit.run();
/*
    kết quả: 
        'Con thỏ đang chạy'
        'Con thỏ đang ẩn nấp'
*/
// Trong ví dụ này thì phương thức hide đã bị ghi đè lại vì nó được khai báo ngay trong lớp con.
// Để gọi đến hàm run ở lớp cha thì ta phải sử dụng từ khóa super, nếu không nó sẽ hiểu là bạn đang gọi đếm hàm run ở lớp con.
// Vì được kế thừa nên thuộc tính name không cần khai báo lại (trừ khi overriding)

//// Sử dụng từ khóa super trong constructor
// Không dùng constructor
class Animal {
    constructor(name) {
        console.log('Hàm khởi tạo lớp cha');
    }
}

class Rabbit extends Animal {

}

let rabbit = new Rabbit(); // 'Hàm khởi tạo lớp cha'

// Muốn override và sử dụng constructor
class Animal {
    constructor(name) {
        console.log('Hàm khởi tạo lớp cha');
    }
}

class Rabbit extends Animal {
    constructor(name, age) {
        super(name);
        console.log('Hàm khởi tạo lớp con');
    }
}

let rabbit = new Rabbit();
/*
    kết quả:
        'Hàm khởi tạo lớp cha'
        'Hàm khởi tạo lớp con'
*/