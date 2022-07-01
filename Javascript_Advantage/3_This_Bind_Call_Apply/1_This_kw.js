/*
    Keyword THIS

    Từ khóa this trong JS đề cập đến đối tượng mà nó thuộc về

    Đặc tính:
        1. Trong 1 method (phương thức), this tham chiếu tới đối tượng truy cập phương thức (đối tượng trước dấu `.`)
        2. Đứng ngoài phương thức, this tham chiếu tới đối tượng global
    
    Lưu ý:
        - this trong hàm tạo là đại diện cho đối tượng sẽ được tạo
        - this trong một hàm là undefined khi ở strict mode
        - Các phương thức bind(), call(), apply() có thể tham chiếu this tới đối tượng khác

    => Phân biệt this qua cách hàm/method được gọi. 
        - Khi gọi qua object.method() => this = object
        - Khi gọi qua tenHam() => this = window (strict mode thì this = undefined)
    Mỗi hàm có context riêng, hàm trong method cũng có context riêng của nó (trừ arrow function)

    #Note: 
        - This trong method: Đại diện cho đối tượng nó thuộc về
        - This trong hàm, bên ngoài hàm: Đối tượng window (undefined nếu trong strict mode)
        - Arrow function: Không có context/this, context/this sẽ được lấy từ phạm vi bên ngoài hàm (hàm gần nhất chứa nó)
*/

const iPhone7 = {
    // Thuộc tính - Property
    name: 'IPhone 7',
    color: 'Blue',
    weight: 250,

    // Phương thức - Method (Là hàm khi được dùng làm thuộc tính của Object)
    takePhoto() {
        console.log('Take a photo');
    },
    getThis() {
        console.log(this) // This chỉ đến đối tượng mà nó thuộc về
    },
    objChild: {
        name: 'Child Object',
        methodChild() {
            console.log(this)
        }
    }
}

iPhone7.takePhoto()

iPhone7.getThis() // {name: "Iphone 7", color: "Blue",...}

iPhone7.objChild.methodChild() // {name: "Child Object", methodChild: f}
// this mặc định sẽ là đối tượng đứng trước dấu `.`

//// Hàm tạo
function Car(name, color, weight) {
    this.name = name
    this.color = color
    this.weight = weight
    this.run = function () {
        console.log('Running...', this)
    }
}

const mercedesS450 = new Car('Mercedes S450', 'black', 500)

mercedesS450.run() // Running... Car{name: "Mercedes S450", color: "black",...}
// Ở đây this đã trỏ về đối tượng đứng trước nó là mercedesS450

const button = document.querySelector('button')

button.onclick = function () {
    console.log(this) // <button>Click me!</button>

    console.dir(this) // xem button dưới dạng object
}

/*
    HTML: <button onclick="console.log(this)">Click me!</button>

    Khi viết thẳng vào attribute của button thì không thấy sự tồn tại của phương thức nào
    => Khi thực thi phần code trong attribute onclick sẽ được chạy dưới dạng function như trên 
    => Đối tượng this vẫn trả về đối tượng mà nó thuộc về (ở đây là button)
*/

//// Từ khóa this bên ngoài phương thức = window (trong strict mode = undefined)
console.log(this) // window

function myFunc() {
    console.log(this)
}

myFunc() // window

'use strict'
function myFunc2() {
    console.log(this)
}

myFunc2() // undefined

//// This trong hàm tạo đại diện cho đối tượng sẽ được tạo
function Car(name, color) {
    this.name = name
    this.color = color

    this.run = function () {
        console.log(this)
    }
}
// Hoặc khởi tạo phương thức bên ngoài
// Context của method run2 là đối tượng sẽ được tạo bởi Car
Car.prototype.run2 = function () {
    console.log(this)

    // Context
    function test() {
        console.log(this)
        // Mỗi function đều có 1 context riêng => this riêng
        // Mặc định this trong hàm => window
    }

    // Với arrow function thì không có context và this, sẽ lấy this từ phạm vi bên ngoài nó (hàm gần nhất chứa nó)
    const test = () => {
        console.log(this)
    }
    test()
}

const porsche = new Car('Porsche', 'yellow')
const mercedesS450 = new Car('Mercedes S450', 'black')

porsche.run()

mercedesS450.run()

porsche.run2()

mercedesS450.run2()
