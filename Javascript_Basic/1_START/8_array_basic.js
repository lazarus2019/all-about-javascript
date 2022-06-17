// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

/*
    MẢNG TRONG JAVASCRIPT

    1. Tạo mảng
        - Cách tạo
        - Sử dụng cách nào? Tại sao?
        - Kiểm tra data type

    #Note: Mảng kế thừa đối tượng Object và function
    2. Truy xuất mảng
        - Độ dài mảng
        - Lấy phần tử theo index
*/

let languages = [
    'Javascript',
    'C#',
    'Java',
    null,
    undefined,
    function () {

    },
    {},
    123
]
let jobs = new Array(1, 3, {}, 'value')

console.log(typeof languages) // Object
console.log(typeof jobs) // Object

// Vì mảng có kiểu dữ liệu object nên phải sử dụng phương thức khác để check
console.log(Array.isArray(languages)) // true
console.log(Array.isArray(jobs)) // true

// Độ dài mảng
console.log(languages.length) // 8
console.log(jobs.length) // 4

// Truy xuất theo index
console.log(languages[3]) // null
console.log(jobs[3]) // 'value'

/*
    Một vài (11) phương thức (methods) của array:
*/

let animals = [
    'Cat',
    'Poland Bear',
    'Penguin',
    'Pig',
    'Hippo',
    'Giraffe',
    'Camel'
]

// 1. To string: chuyển tất cả phần tử sang chuỗi có ngăn cách bởi ','
console.log(animals.toString()) // 'Cat,Poland Bear,Penguin,Pig,Hippo,Giraffe,Camel'

// 2. Join: hợp nhất tất cả phần tử của mảng thành 1 chuỗi với dấu ngăn cách được chỉ định
console.log(animals.join('-')) // 'Cat-Poland Bear-Penguin-Pig-Hippo-Giraffe-Camel'

// 3. Pop: Xóa phần tử cuối và trả về phần tử đó (hết phần tử => undefined)
console.log(animals.pop()) // 'Camel'

// 4. Push: Thêm nhiều phần tử vào cuối mảng và trả về độ dài mới
console.log(animals.push(123)) // 8
console.log(animals.push('A', {}, 1)) // 10

// 5. Shift: Xóa phần tử đầu mảng và trả về phần tử đó (hết phần tử => undefined)
console.log(animals.shift()) // 'Cat'

// 6. Unshift: Thêm nhiều phần tử vào đầu mảng và trả về độ dài mới
console.log(animals.unshift(123)) // 8
console.log(animals.unshift('A', {}, 1)) // 10

// 7. Splice: Vừa xóa vừa thêm phần tử vào mảng và trả về phần tử bị xóa (nếu có)
console.log(animals.splice(1, 4)) // ['Poland Bear', 'Penguin', 'Pig', 'Hippo']
// => source array: ['Cat', 'Giraffe', 'Camel']

console.log(animals.splice(1, 0, "Lion", "Wolf", 123)) // []
// => source array: ['Cat', 'Lion', 'Wolf', 123, 'Poland Bear', 'Penguin', 'Pig', 'Hippo', 'Giraffe', 'Camel']

console.log(animals.splice(1, 1, "Lion")) // ['Poland Bear']
// => source array: ['Cat', 'Lion', 'Penguin', 'Pig', 'Hippo', 'Giraffe', 'Camel']

// 8. Includes: Kiểm tra phần tử có nằm trong mảng hay không (có thể thêm vị trí bắt đầu)
// Nếu truyền vị trí bắt đầu < 0 (tính từ right -> left) và nó + độ dài chuỗi =< 0 => 0
console.log(animals.includes('Pig')) // true
console.log(animals.includes('Pig', 5)) // false
console.log(animals.includes('Pig', -4)) // true

// 9. Concat: Tạo một mảng mới bằng cách hợp nhất nhiều mảng hoặc nhiều phần tử
let fruits = ['Mango', 'Peace', 'Avocado']
let countries = ['Korea', 'Thailand', 'France']
console.log(animals.concat(fruits)) // ['Cat', 'Poland Bear', 'Penguin', 'Pig', 'Hippo', 'Giraffe', 'Camel', 'Mango', 'Peace', 'Avocado']
console.log(animals.concat(countries, fruits)) // ['Cat', 'Poland Bear', 'Penguin', 'Pig', 'Hippo', 'Giraffe', 'Camel', 'Korea', 'Thailand', 'France', 'Mango', 'Peace', 'Avocado']
console.log(animals.concat("New Element")) // ['Cat', 'Poland Bear', 'Penguin', 'Pig', 'Hippo', 'Giraffe', 'Camel', 'New Element']

// 10. Slice: Tạo một mảng gồm các phần tử bị cắt ra từ mảng gốc
console.log(animals.slice(2)) // ['Penguin', 'Pig', 'Hippo', 'Giraffe', 'Camel']
console.log(animals.slice(2, 5)) // ['Penguin', 'Pig', 'Hippo']

// 11. findIndex: tìm chỉ mục của phần tử trong mảng
let cat = animals[0]
let catIndex = animals.findIndex(cat) // 0

// 12. indexOf: trả về chỉ mục ĐẦU TIÊN của phần tử trong mảng (có thể nhập chỉ mục bắt đầu) => nếu không tìm thấy thì trả về -1
let cat = animals[2]
let catIndex = animals.indexOf(cat) // 2
let catIndexByValue = animals.indexOf('Cat') // 0

let catIndex = animals.indexOf(cat, 3) // -1

// 13. lastIndexOf: trả về chỉ mục CUỐI CÙNG của phần tử trong mảng
let pig = animals[3]
let pigIndex = animals.indexOf(pig) // 3
let pigIndexByValue = animals.indexOf('Pig') // 3

let pigIndex = animals.indexOf(pig, 5) // -1

/*
    Sắp xếp(sort) mảng
*/
let months = ['January', 'February', 'March', 'April', 'May1']

// sort: mặc định sẽ sắp xếp mảng theo bảng chữ cái
console.log(months.sort()) // ['April', 'February', 'January', 'March', 'May1']

// Sắp xếp số theo bảng chữ cái
let points = [10, 12, 25, 90, 100, 20]
console.log(points.sort()) // [10, 100, 12, 20, 25, 90]

// Sắp xếp số theo thứ tự tăng dần
console.log(points.sort(function (a, b) { return a - b })) // [10, 12, 20, 25, 90, 100]

// Sắp xếp số theo thứ tự giảm dần
console.log(points.sort(function (a, b) { return b - a })) // [100, 90, 25, 20, 12, 10]

// reverse: lật ngược mảng
console.log(months.reverse()) // ['May1', 'March', 'January', 'February', 'April']
console.log(points.reverse()) // [20, 100, 90, 25, 12, 10]

// Sắp xếp theo kiểu dữ liệu của array chứa object
const cars = [
    { type: "Volvo", year: 2016 },
    { type: "Saab", year: 2001 },
    { type: "BMW", year: 2010 }
];

// Theo năm
console.log(cars.sort(function (a, b) { return a.year - b.year })) // [{ type: "Saab", year: 2001 }, { type: "BMW", year: 2010 }, { type: "Volvo", year: 2016 }]

// Theo thương hiệu
let result = cars.sort(function (a, b) {
    let x = a.type.toLowerCase();
    let y = b.type.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
});

console.log(result) // [{ type: "BMW", year: 2010 }, { type: "Saab", year: 2001 }, { type: "Volvo", year: 2016 }]

/*
    Tìm max, min của mảng
*/

// Giá trị số lớn nhất trong mảng
Math.max.apply(null, points) // 100
Math.max.apply(points) // 100

// Tìm max cách thủ công
function myArrayMax(arr) {
    let len = arr.length;
    let max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
}

// Giá trị số nhỏ nhất trong mảng
Math.min.apply(null, points) // 100
Math.min.apply(points) // 100

// Tìm min cách thủ công
function myArrayMin(arr) {
    let len = arr.length;
    let min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
}

