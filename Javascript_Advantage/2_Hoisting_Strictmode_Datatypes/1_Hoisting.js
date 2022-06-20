/*
    Hoisting - Đưa lên đầu phạm vi

    var, let, const, function declaration.

    Hoạt động của engine: Đọc qua 1 lượt => phân tích cú pháp => hoisting => thực thi chương trình
*/
//// Var và function declaration
// Var
console.log(age) // undefined
console.log(fullName) // ReferenceError: fullName is not defined
var age = 20

/*
    Tính chất của từ khóa var sẽ đưa phần khai báo lên trên đầu phạm vi
    Vì giá trị mặc định của age là undefined nên console sẽ ra undefined
*/
// Sau khi đoạn mã trên được engine đọc qua thì sẽ chuyển đổi lại như sau:
var age
console.log(age)
console.log(fullName)
age = 20

// Function declaration
console.log(sum(10, 2)) // 12

function sum(a, b) { return a + b }
//=> Đối với function thì phần khai báo được đưa lên đầu nên khi sử dụng trước đó vẫn không ảnh hưởng

//// Let, const
{
    console.log(fullName) // Cannot access 'fullName' before initialization
    console.log(key) // Cannot access 'key' before initialization

    let fullName = 'Krix Dan'
    const key = 'user_setting'
}
//=> Let và const khi được hoisted không được gán giá trị mặc định và được đưa vào 'Temporal Dead Zone (vùng tạm thời không truy cập được)'

//// BONUS: Ví dụ về Hoisting
// Ví dụ 1
const counter1 = makeCounter()

console.log(counter1()) // What's the output?

function makeCounter() {
    let counter = 0

    return increase

    function increase() {
        return ++counter
    }
}

// KQ: 1, phần khai báo hàm increase được đưa lên đầu nên return trước không ảnh hưởng

// Ví dụ 2
var tip = 100;

(function () {
    console.log("I have $" + husband());

    function wife() {
        return tip * 2;
    }

    function husband() {
        return wife() / 2;
    }

    var tip = 10;
})();
// Output: ?
// KQ: I have NaN, phần khai báo tip trong hàm IIFE được đưa lên đầu và gán giá trị mặc định là undefined