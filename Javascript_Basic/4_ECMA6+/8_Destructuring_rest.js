/*
    Destructuring (Phân rã) - Rest (Phần còn lại)

    Tính chất: Sử dụng để định nghĩa biến tinh gọn hơn
    #Note: rest được sử dụng khi kết hợp với destructuring và định nghĩa tham số

    Cú pháp:
        - Destructuring: ngăn cách các phần tử bằng dấu ','
        - Rest: sử dụng dấu '...'

    Sử dụng:
        - Với Array
        - Với Object
        - Với function (chỉ có rest)
*/

/* [Array] Destructuring - Rest */
const array = ['C#', 'JS', 'Angular']

//// Destructuring
// Cách định nghĩa biến thông thường
let a  = array[0]
let b  = array[1]
let c  = array[2]
console.log(a, b, c) // 'C#' 'JS' 'Angular'

// Sử dụng Destructuring
let [a, b, c] = array
console.log(a, b, c) // 'C#' 'JS' 'Angular'

let [d, , f] = array
console.log(d, f) // 'C#' 'Angular'

//// Rest
let [a, ...rest] = array
console.log(rest) // ['JS', 'Angular']

let [a, b, ...rest] = array
console.log(rest) // ['Angular']

/* [Object] Destructuring - Rest */
const userInfo = {
    firstName: 'Thomas',
    age: 25,
    country: 'Singapore',
    getName(){
        return this.firstName
    },
    children: {
        lastName: 'Edison',
        firstName: 'Luca'
    }
}

//// Destructuring
// Cách định nghĩa biến thông thường
let firstName = userInfo.firstName
let age = userInfo.age
let country = userInfo.country

// Sử dụng Destructuring
// Dùng key để lấy ra cặp key-value trong object
let {firstName, age, country} = userInfo
console.log(firstName, age, country) // 'Thomas' 25 'Singapore'

//#Note: Trường hợp lấy key không có trong object => undefined

// Tự định nghĩa tên biến khi không muốn sử dụng tên key (key: newName)
let {firstName: parentName, age, country: comeFrom} = userInfo
console.log(parentName, age, comeFrom) // 'Thomas' 25 'Singapore'

// Trường hợp key của object cha trùng với object con
let {firstName: parentName, children: {firstName: childrenName}} = userInfo
console.log(parentName, childrenName) // 'Thomas' 'Luca'

//#Note: Trường hợp key bị trùng nhau thì key sẽ nhận giá trị của key cuối cùng được định nghĩa

console.log(firstName, age, country) // ERROR
// Vì chỉ có tên biến mới được định nghĩa nên key sẽ không tồn tại

// Đặt giá trị mặc định cho key được lấy ra
let {firstName, description = 'Default description'}
console.log(firstName, description) // 'Thomas' 'Default description'

//// Rest
// Tạo 1 object mới bằng cách loại bỏ function getName
let {getName, ...newUserInfo} = userInfo
console.log(userInfo) // {firstName: 'Thomas', age: 25, country: 'Singapore', children: {…}}

/* [Function] Rest */
// Khi sử dụng trong function, rest sẽ trả về 1 mảng hoặc object các giá trị của tham số truyền vào còn lại
// Tương tự với arguments nhưng rest là MẢNG còn argument là ĐỐI TƯỢNG
function logger(...params){
    console.log(params)
}
logger('A', 'V', 10, true, 1000, 'O') // ['A', 'V', 10, true, 1000, 'O']

function logger2(a, ...params){
    console.log(params)
}
logger2('A', 'V', 10, true, 1000, 'O') // ['V', 10, true, 1000, 'O']

//// Destructuring
// Cách thông thường
function logger3(obj){
    console.log(obj.name, obj.price)
}

// Cách gọn hơn
function logger3({name, price}){
    console.log(name, price)
}

// Kết hợp với rest
// Tham số là object
function logger3({name, price, ...rest}){
    console.log(name, price)
    console.log(rest) // {date: '10/10/2020'}
}

// Tham số là array
function logger4([a, b, ...rest]){
    console.log(a, b)
    console.log(rest) // [10, true, 1000, 'O']
}

logger3({
    name: 'Javascript',
    price: 100,
    date: '10/10/2020'
})

logger4(['A', 'V', 10, true, 1000, 'O'])
