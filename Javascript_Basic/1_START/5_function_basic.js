/*
    Hàm (function) trong Javascript

    1. Hàm?
        - Một khối mã
        - Làm 1 việc cụ thể
    2. Loại hàm
        - Build-in: Những hàm được tạo sẵn trong JS
        - Tự định nghĩa
    3. Tính chất
        - Không thực thi khi định nghĩa
        - Sẽ thực thi khi được gọi
        - Có thể nhận tham số
        - Có thể trả về 1 giá trị

Tên hàm: a-z A-Z $ _ 0-9 (không được đặt ở vị trí đầu tiên)
*/

function myFirstFunction(){
    alert('Hooray')
}

// Hàm trả về 1 giá trị
function getLastLetter(string){
    return string.charAt(string.length - 1)
}

let result = getLastLetter('Lazarus') //=> 's'

// Tham số hàm

/*
    1. Tham số?
        - Định nghĩa: là 1 giá trị truyền vào hàm để thực hiện các thao tác trong hàm
        - Kiểu dữ liệu: không giới hạn
        - Tính private: chỉ sử dụng được trong hàm
        - 1 tham số
        - Nhiều tham số
    2. Truyền tham số
        - 1 tham số
        - Nhiều tham số
    3. Arguments?
        - Đối tượng arguments:
            + Khả năng truy cập vào bên trong hàm
            + Tính chất giống mảng
            + Chứa tất cả giá trị đối số truyền vào hàm
        - Dùng vòng lặp for để duyệt qua từng giá trị
*/

function writeLog(message){ // Tham số: message
    console.log(message)
}

writeLog('Test Message'); // Đối số: 'Test Message'

// Đặt giá trị mặc định cho tham số
function alertFunction(message = 'Default Message'){
    alert(message)
}

alertFunction() // 'Default Message'
alertFunction('Test Message') // 'Test Message'

function writeLog2(){
    // console.log(arguments)
    for(var param of arguments){
        console.log(param)
    }
}

writeLog2('Log1', 'Log2', 'Log3', 'Log4', 5, 10, 0)

/*
    Lưu ý về hàm:
        - Khi function trùng tên?
            => hàm sau sẽ ghi đè hàm trước
        - Khai báo biến trong function?
            => Chỉ sử dụng được trong hàm
        - Định nghĩa function trong function?
            =>  Chỉ sử dụng được trong hàm
*/

/*
    Các loại hàm:
    1. Declaration function: dựa vào hosting (giống từ khóa var) => có thể gọi trước khi được định nghĩa
    2. Expression function: không thể gọi trước khi đinh nghĩa
    3. Arrow function

*/

// Declaration function
function showMessage(){
    console.log('Declaration function')
}

// Expression function
var showMessage2 = function(){
    console.log('Expression function')
}

setTimeout(function(){    
})

// Vẫn có thể đặt thêm tên hàm như sau
setTimeout(function autoReset(){    
})

var myObject = {
    myFunction: function(){}
}