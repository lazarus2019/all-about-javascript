// Kiểm tra
/*
    IIFE - Immediately Invoked Function Expression
    -> Self-Invoking function
    Là biểu thức tạo ra 1 hàm và thực thi nó ngay lập tức

    1. IIFE trông như thế nào?
    2. Cách tạo ra một IIFE
    3. Dùng dấu ; trước IIFE
    4. IIFE là hàm "private"
    5. Sử dụng IIFE khi nào? | Library, bookmark browser,...
    6. Ví dụ sử dụng IIFE

    => Lợi ích:
        - Mọi biến, hàm và các phương thức trong IIFE đều có tính private (!global) => không ảnh hưởng tới toàn bộ chương trình bên ngoài
        - Dễ dàng tạo library cho các ứng dụng khác nhau (phải sử dụng `use strict` => tránh lỗi type, scope trong js)
        - Sử dụng để tạo bookmark cho browser
    => Bất lợi:
        - Không có tính tái sử dụng trong cùng ứng dụng

    #Note: Những biến, hàm và phương thức được return bởi IIFE => có thể truy cập từ bên ngoài
*/

////  1. IIFE trông như thế nào?
// Tự động chạy code bên trong dấu () tương tự như console.log()
(123); // 123
('Hello') // 'Hello'
    (['Noah', 'Jupiter']) // ['Noah', 'Jupiter']
    (function () { }) // f (){}
    (() => { }) // () =>{}

    // => Vì vậy có thể bao trọn function và sử dụng () để gọi hàm bên trong
    (function () {
        console.log('NOW NOW')
    })()

    (() => {
        console.log('NOW NOW 2')
    })()

    // Truyền tham số và sử dụng đối số như function thường
    ((message) => {
        console.log('Message', message)
    })(message)

    //// 2. Cách tạo ra một IIFE
    /*
       Có 3 cách khởi tạo IIFE:
           - Declaration function  | function nameFunc(){}
           - Expression function   | function(){}
           - Arrow function        | ()=>{}
        
        Shorthand
   */

    // Declaration function
    (function myFunc() {
        console.log('Declaration function: NOW')
    })()

    // Expression function
    (function () {
        console.log('Expression function: NOW')
    })()

    // Arrow function
    (() => {
        console.log('Arrow function: NOW')
    })()

    // Shorthand (ngắn gọn hơn) bằng cách sử dụng toán tử phía trước IIFE
    // => Đặt toán tử phía trước thì sẽ ép function phía sau thực thi 
    // => Toán tử hợp lệ bao gồm: +, -, !
    + function () {
        let name = 'Lazarus'
        console.log(name)
    }()

    - function () {
        let name = 'Lucas'
        console.log(name)
    }()

!function () {
    let name = 'Ryan'
    console.log(name)
}()

//// 3. Dùng dấu; trước IIFE
// Với trường hợp code JS không sử dụng dấu ; ở cuối câu thì IIFE sẽ không hiểu => đang gọi 1 thứ không phải hàm trước đó
let name = 'Lazarus';

// Hàm sẽ không được thực thi nếu trước đó không có dấu ;
(function () {
    console.log('Hi!')
})()

    // => Có thể dùng dấu ; ở trước IIFE để có tính thẩm mỹ hơn
    ; (function () {
        console.log('Hi! 2')
    })()

//// 4. IIFE là hàm "private"
// Hàm IIFE có tính private nên chỉ truy cập được trong block của nó, nên không thể gọi ra ngoài global

let i = 0
    ; (function myFunc() {
        i++
        console.log(i)
        i < 10 && myFunc()
    })

//// 6. Ví dụ sử dụng IIFE
const app = {
    cars: [],
    get() {
        return this.cars
    },
    add(car) {
        this.cars.push(car)
    },
    edit(index, car) {
        this.cars[index] = car
    },
    delete(index) {
        this.cars.splice(index, 1)
    }
}

app.add('Honda')
app.add('Mazda')
app.add('BMW')

app.edit(0, 'Suzuki')

app.delete(1)

app.cars = null
app.add('Honda') // ERROR
app.get() // ERROR

// Có thể thấy, tất cả các thuộc tính, phương thức bên trong biến app đều có thể truy cập từ bên ngoài => không có tính bảo mật, an toàn, toàn vẹn dữ liệu

// Để đảm bảo cars không bị gán lại bởi thao tác bên ngoài, hãy chuyển đổi hàm trên thành IIFE như sau:

const appIIFE = (function () {
    // Private
    const cars = []

    // Public
    return {
        get() {
            return cars
        },
        add(car) {
            cars.push(car)
        },
        edit(index, car) {
            cars[index] = car
        },
        delete(index) {
            cars.splice(index, 1)
        }
    }
})()

appIIFE.add('Honda')
appIIFE.add('Mazda')
appIIFE.add('BMW')

appIIFE.edit(0, 'Suzuki')

appIIFE.delete(1)

appIIFE.cars = null // Vẫn thực thi nhưng không ảnh hưởng tới biến cars bên trong
appIIFE.add('Honda') // Vẫn add được
appIIFE.get() // ['Suzuki', 'BMW', 'Honda']