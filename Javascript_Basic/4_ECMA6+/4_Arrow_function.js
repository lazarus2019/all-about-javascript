/*
    Arrow function: Là 1 dạng function giúp viết code tinh gọn hơn

    Một vài lưu ý khi sử dụng Arrow function:
    - Sau dấu => thì phải khác {} thì hàm mới return (có thể áp dụng để return như sau: (a, b)=> a+b hoặc ({a:a, b:b}))
    - Nếu function chỉ có 1 tham số thì không cần dùng dấu ()

    Những trường hợp KHÔNG SỬ DỤNG Arrow Function:
        - Dùng làm constructor
        - Dùng trong khởi tạo hàm trong object
        -
*/

const sum = (a, b) => {return a + b}
const sum2 = (a, b) => a + b
console.log(sum(2, 3)) // 5
console.log(sum2(2, 3)) // 5

// Sau dấu => thì phải khác {} thì hàm mới return (có thể áp dụng để return như sau: (a, b)=> a+b hoặc ({a:a, b:b}))
const sum3 = (a, b) => ({a: a, b: b})
console.log(sum3(4, 5)) // {a:4, b:5}

// Nếu function chỉ có 1 tham số thì không cần dùng dấu ()
const logger = message => console.log(message)
logger('Message...') // 'Message...'

// #Không dùng arrow function cho Constructor
const Course = function(name, price){
    this.name = name
    this.price = price
}

const jsCourse = new Course('JavaScript', 5000) // Course {name: 'JavaScript', price: 5000}

const CourseArrow = (name, price)=>{
    this.name = name
    this.price = price
}

const jsCourseArrow = new CourseArrow('Javascript', 200) // jsCourseArrow is not defined

// #Không dùng arrow function trong khởi tạo hàm trong object
const obj = {
    name: 'JavaScript',
    getName: function(){
        return this // context
    }
}

console.log(obj.getName()) // {name: 'JavaScript', getName: ƒ}

const objArrow = {
    name: 'PHP',
    getName: ()=>{
        return this // undefined
    }
}

console.log(objArrow.getName()) // undefined
