/*
    Các kiểu dữ liệu trong javascript:
    1. Dữ liệu nguyên thủy - Primitive Data
        - Number
        - String
        - Boolean
        - Undefined
        - Null
        - Symbol
    Note: Giá trị được tạo ra => ghi vào vùng/ô nhớ (không thể sửa)
    2. Dữ liệu phức tạp - Complex Data
        - Function
        - Object

*/

// Number type
var num1 = 8;
var num2 = 3;
var num3 = 5.5;

// String type
var name1 = 'Krix';
var name2 = 'Krix \'Daniel';
// Nháy đơn và nháy kép như nhau

// Boolean
var isLogin = true;

// Undefined
var age;

// Null
var isNull = null; // nothing => type object

// Symbol
var id1 = Symbol('id'); //unique
var id2 = Symbol('id'); //unique

console.log(id1 == id2); // false

// Function
var myFunction = function(){
    alert('This is message!')
}

myFunction(); // Call function

// Return type of object
console.log(typeof myFunction)

// Object types
var myObject = {
    // key : value
    name: 'Krix Daniel',
    age: 18,
    gender: 'male',
    myFunction: function(){
        alert('This is function inside object!')
    }
}

console.log('myObject', myObject);

var myArray = [
    'Javascript',
    'PHP',
    'C#',
    'Java',
    'Angular'
];

