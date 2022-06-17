/* 
Một số hàm build-in (đã được Javascript dựng sẵn, chỉ cần lấy ra dùng):
    1. Alert => popup alert message
    2. Console 
    3. Confirm => popup alert cancel|OK
    4. Prompt => popup alert message, confirm and enter va
    5. Set timeout
    6. Set interval

*/

var fullName = 'Daniel Lazarus'

// alert(message?: any): void
alert('Message')

console.log(fullName)
console.error(fullName)
console.warn(fullName)
console.info(fullName)

// confirm(message?: string): boolean
let isDelete = confirm('Are you sure about that?')
if(isDelete){
    alert('Deleted')
}else{
    alert('Cancel')
}

// prompt(message?: string, _default?: string): string
let result = prompt('Enter your age')
alert('Your age: ', result)

// setTimeout(functionRef, delay, param1, param2,...): number (trả về id của phương thức setTimeout đó)
// => Thực thi một đoạn code sau một khoảng thời gian xác định (chỉ chạy 1 lần)
setTimeout(function(){
    alert('Message')
}, 1000) // 1000 milliseconds = 1 second

// Hoặc gán setTimeout cho 1 biến để nhận về id của setTimeout đó
let myTimeout = setTimeout(function(){
    alert('Message')
}, 1000) // 1000 milliseconds = 1 second

// Ngoài ra, có thể truyền tham 1 hoặc nhiều tham số vào hàm trong setTimeout như sau:
setTimeout(function(data){
    alert(data)
}, 1000, 5000) //=> sau 1s chương trình sẽ show thông báo với nội dung 5000

// clearTimeout(setTimeout_id): Xóa setTimeout theo id
clearTimeout(myTimeout)

// setInterval(func, delay, arg0, arg1, /* ... ,*/ argN): number (trả về id của phương thức setInterval đó)
// => Thực thi một đoạn code sau một khoảng thời gian xác định (lặp đi lặp lại sau khoảng thời gian đã đặt)
setInterval(function(){
    console.log('Random number: ' + Math.random())
}, 2000)

// Hoặc gán setInterval cho 1 biến để nhận về id của setInterval đó
let myInterval = setInterval(function(){
    console.log('Random number: ' + Math.random())
}, 2000)

// Tương tự với setInterval:
setInterval(function(data, text){
    console.log(text + data)
}, 2000, Math.random(), 'Random number:') //=> cứ mỗi 2s chương trình sẽ in ra CÙNG 1 số ngẫu nhiên (0-1)

// clearInterval(setInterval_id): Xóa setInterval theo id
clearInterval(myInterval)