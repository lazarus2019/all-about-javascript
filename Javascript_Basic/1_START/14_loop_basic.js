// https://www.w3schools.com/js/js_loop_for.asp | https://www.w3schools.com/js/js_loop_forin.asp | https://www.w3schools.com/js/js_loop_forof.asp | https://www.w3schools.com/js/js_loop_while.asp

/*
    VÒNG LẶP - LOOP

    1. for - Lặp với điều kiện đúng
    2. for/in - Lặp qua các thuộc tính của đối tượng
    3. for/of - Lặp qua các giá trị của đối tượng có thể lặp
    4. while - Lặp khi điều kiện đúng 
    5. while/do - Lặp ít nhất 1 lần, sau đó lặp khi điều kiện đúng

    #Note: 
        - for: lặp với số lần xác định
        - while: lặp với số lần KHÔNG xác định
        - iterable: 1 đối tượng cho phép duyệt qua các phần tử với vòng lặp for
    *Vòng lặp for/in for/of sẽ không duyệt qua các phần tử empty
*/

// 1. FOR LOOP (Lặp với điều kiện đúng)
for (let i = 0; i < 50; i++) {
    console.log(i)
}

let myArray = [
    'Javascript',
    'PHP',
    'C#',
    'Java',
    'Python'
]

for (let i = 0; i < myArray.length; i++) {
    console.log(myArray[i])
}

// 2. FOR-IN LOOP (Lặp qua các thuộc tính của đối tượng)
// Không chỉ lặp qua các thuộc tính của đối tượng, for/in còn lặp qua các thuộc tính tự tạo của prototype
let myInfo = {
    name: 'Krix',
    age: 40,
    address: 'Vietnam'
}

let language = 'Javascript'

for (let key in myInfo) {
    console.log(`${key} has value: ${myInfo[key]}`)
}

for (const char in language) {
    console.log(language[char])
}

// 3. FOR-OF LOOP (Lặp qua các giá trị của đối tượng có thể lặp)
let languages = [
    'Javascript',
    'Java',
    'C#',
    'PHP'
]

for (const value of languages) {
    console.log(value)
}

for (const value in languages) {
    console.log(languages[value])
}

// Object.keys: Lấy tất cả keys của object
for (let value of Object.keys(myInfo)) {
    console.log(myInfo[value])
}

// Object.values: Lấy tất cả value của object
for (let value of Object.values(myInfo)) {
    console.log(value)
}

// 4. WHILE LOOP (Lặp khi điều kiện đúng)
let i = 0
while (i < 50) {
    i++
    console.log(i)
}

let index = 0
while (index < myArray.length) {
    console.log(myArray[index])
    i++
}

// 5. WHILE-DO LOOP (Lặp ít nhất 1 lần, sau đó lặp khi điều kiện đúng)
let n = 0
let isSuccess = false
do {
    i++

    console.log('Nap the lan ' + i)
    if (true) {
        isSuccess = true
    }
} while (!isSuccess && n < 3)

// NESTED LOOP - Vòng lặp lồng nhau
let nestedArray = [
    [1, 2],
    [3, 4],
    [5, 6]
]

for (let i = 0; i < nestedArray.length; i++) {
    for (let j = 0; j < nestedArray[i].length; j++) {
        console.log(nestedArray[i][j]) // 1 2 3 4 5 6
    }
}

/*
    BREAK & CONTINUE TRONG VÒNG LẶP

    break: thoát khỏi vòng lặp
    continue: bỏ qua các câu lệnh phía dưới và chuyển sang vòng lặp tiếp theo
 */

for (let i = 0; i < 10; i++) {
    if (i >= 5) {
        break
    }

    console.log(i) // 0 1 2 3 4
}

for (let i = 0; i < 10; i++) {
    if (i % 2 !== 0) {
        continue
    }

    console.log(i) // 0 2 4 6 8
}

/*
    RECURSIVE - ĐỆ QUY - Hàm tự gọi chính nó

    1. Xác định điểm dừng
    2. Logic handle => tạo ra điểm dừng

    // A -> Loop    -> CPU
    // A -> De quy  -> RAM
 */

// Ex: Đếm ngược
function countDown(num) {
    if (num > 0) {
        // loop
        console.log(num)

        return countDown(num - 1)
    }
    return num
}
countDown(10) // 10 9 8 7 6 5 4 3 2 1

// Ex: Lặp qua các giá trị của mảng
function loop(start, end, cb) {
    if (start <= end) {
        cb(start) // print the array value
        return loop(start + 1, end, cb)
    }

}
let array = ['Javascript', 'PHP', 'C#', 'Java']

loop(0, array.length - 1, function (index) {
    console.log(array[index]) // 'Javascript' 'PHP' 'C#' 'Java'
})

// Ex: Tính giai thừa
// 3 * 2 * 1 = 
// 6 * 5 * 4 * ... * 1 = 720

function giaiThua(num) {
    if (num > 0) {
        return num * giaiThua(num - 1)
    }
    return 1
}

giaiThua(6) // 720

/*
    BONUS: Giải toán xóa phần tử trùng lặp trong mảng
*/
let orgArray = ['a', 'b', 'c', 'd', 'd', 'c', 'b', 'a']

let mySet = new Set(orgArray) // {'a', 'b', 'c', 'd'}
// Set là object cho phép lưu trữ dữ liệu 1 cách duy nhất, không trùng lặp, không thể có 2 giá trị giống nhau trong cùng 1 Set
// Set nhận giá trị iterable hoặc 1 mảng có cùng kiểu dữ liệu với nhau

let result = [...mySet] // ['a', 'b', 'c', 'd']
// Cách chuyển object chỉ chứa value sang dạng array