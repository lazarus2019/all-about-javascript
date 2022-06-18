// https://viblo.asia/p/scope-trong-javascript-RQqKLnW6l7z | https://kickoff.tech/wp-content/uploads/2019/04/const-vs-let-vs-var-scope.png

/*
    Scope - Phạm vi

    Các loại phạm vi:
        - Global - Toàn cầu
        - Code block - Khối mã: let, const,(if else, loop, {},...)
        - Local scope - Hàm: var, function
    Tính chất của scope:    
        - Khi gọi mỗi hàm luôn có 1 phạm vi mới được tạo
        - Các hàm có thể truy cập các biến được khai báo trong phạm vi của nó và bên ngoài nó
        - Cách thức 1 biến được truy cập
    Khi nào biến bị xóa khỏi bộ nhớ?
        - Biến toàn cầu: Thoát trang, refresh trang
        - Biến trong code block & trong hàm: Khi hàm, code block được thực thi xong
        - Biến trong hàm được tham chiếu bởi 1 hàm: KHÔNG BỊ XÓA
*/

/* Các loại phạm vi */
//// Phạm vi global
function logger() {
    console.log('Inside logger function')
}
var myName = 'Luca'

function log() {
    console.log(myName) // Luca
    logger() // Inside logger function
}

//=> Biến myName và func logger được khai báo toàn cục nên có thể truy cập ở bất kỳ phạm vi nào

//// Phạm vi code block (VD: {})
{
    const age = 20
    var age1 = 21
    let age2 = 22

    console.log(age, age1, age2) // 20 21 22
}

console.log(age) // KHÔNG được thực thi
console.log(age1) // Được thực thi
console.log(age2) // KHÔNG được thực thi

//=> Phần khai báo let và const chỉ có thể sử dụng trong phạm vi block đó, không thể dùng ở bên ngoài block

//// Phạm vi local hàm
function logger() {
    var myName = 'lazarus'
}

logger()
console.log(myName) // ERROR

//=> Biến myName chỉ tồn tại trong phạm vi của function khởi tạo (kể cả sử dụng từ khóa var)

//// Khi gọi mỗi hàm luôn có 1 phạm vi mới được tạo
function logger(first, last) {
    console.log(first, last)
}

logger('Nam', 'Hoai') // Nam Hoai
logger('Dung', 'Nguyen') // Dung Nguyen
logger('Anh', 'Quoc') // Anh Quoc

//=> Các biến first, last khi được thực thi sẽ tạo ra 1 phạm vi truy cập mới cho nên các hàm đều in ra giá trị khác nhau

//// Các hàm có thể truy cập các biến được khai báo trong phạm vi của nó và bên ngoài nó
const myAge = 20
function logger() {
    const myName = 'Lazarus'
    console.log(myAge, myName)

    function logger2() {
        const myGender = 'male'
        console.log(myAge, myName, myGender)
    }
    logger2() // 20 Lazarus male
}

logger() // 20 Lazarus

//// Cách thức 1 biến được truy cập
// Ví dụ
const x = 0
{
    {
        const x = 5
        {
            {
                {
                    {
                        const x = 10
                        console.log(x) // 10
                    }
                }
            }
        }
    }
}

//=> Vì mỗi code block sẽ tạo ra những phạm vi khác nhau nên biến x bên trong không ảnh hưởng bởi biến bên ngoài (và ngược lại)
//=> Trong block có chứa console, thì block đó sẽ tìm trong phạm vi của nó xem biến đó đã được khai báo hay chưa (rồi => lấy luôn giá trị đó, chưa => loang ra các code block bên ngoài để lấy)

// Ví dụ khác
const x = 0
{
    {
        const x = 5
        {
            {
                {
                    {
                        console.log(x) // Cannot access 'x' before initialization
                        const x = 10
                    }
                }
            }
        }
    }
}

//=> Vì tính chất quét trong phạm vi của code block trước nên engine JS thấy biến được sử dụng trước khi khai báo => ERROR

// Ví dụ khác 2
function b() {
    console.log(text);
}

function a() {
    var text = "in a";
    b();
}

a();
var text = "in gloal";
// Kết quả: undefined

/*
    => Biến text trong hàm b lấy giá trị từ phần khai báo var text ở phía dưới (do tính chất hoisting)
    => Vì text được gán giá trị ở cuối chương trình nên text trong hàm b mặc đinh là undefined
*/

//// Khi nào biến bị xóa khỏi bộ nhớ?
// Trường hợp đặc biệt: Biến trong hàm được tham chiếu bởi 1 hàm
function makeCounter() {
    let counter = 1

    function increase() {
        return ++counter
    }

    return increase
}

const increase1 = makeCounter()

console.log(increase1()) // 2
console.log(increase1()) // 3
console.log(increase1()) // 4

//=> Hàm con increase được trả về và lưu vào biến toàn cục increase1 nên biến counter được lưu vào bộ nhớ, không bị xóa khi thực thi code block