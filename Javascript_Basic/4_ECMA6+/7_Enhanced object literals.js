/*
    Enhanced object literals

    1. Định nghĩa key: value cho object
    2. Định nghĩa method cho object
    3. Định nghĩa key cho object dưới dạng biến
*/

// 1. Định nghĩa key: value cho object
let courseName = 'Javascript'
let price = 1600

const course = {
    courseName,
    price
}

console.log(course) // {courseName: 'Javascript', price: 1600}
// Tự động định nghĩa name và key(giá trị) trong object

// 2. Định nghĩa method cho object
const course = {
    courseName,
    // Cách cũ
    getName: function(){
        return courseName
    },
    // Cách mới
    getName(){
        return courseName
    }
}

// 3. Định nghĩa key cho object dưới dạng biến
let fieldName = 'new-name'
let fieldPrice = 'price'

const course = {
    name: 'Javascript',
    [fieldName]: 'Javascript-Basic',
    [fieldPrice]: 6000
}