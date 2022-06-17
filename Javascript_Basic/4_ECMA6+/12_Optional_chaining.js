/*
    Optional chaining hay Safe navigation
    
    Vấn đề: Giá trị của dữ liệu trả về bị undefined hoặc null => các lệnh phía dưới không được thực thi => crash chương trình
    Một vài giải quyết đề ra như sau:
        - Câu lệnh if 
        - Toán tử 3 ngôi ?:
        - Toán tử AND &&
    => nhưng đều dài dòng, lặp lại code và có thể xuất hiện nhiều lớp lồng nhau

    Sự ra đời của optional chaining => code gọn gàng hơn, kiểm tra nhanh chóng dữ liệu undefined và null
    Khái niệm:  
        Là toán tử ký hiệu ?. dùng để dừng lại quá trình xử lý nếu giá trị trước ?. là undefined hoặc null => trả về undefined
        => Giúp kiểm tra trước giá trị của object trước khi truy cập thuộc tính đó
        
    
    Sử dụng Optional chaining trong:
        - Object
        - Thuộc tính của Object
        - Array
        - Function
    #Ngoài ra: ?. có thể để đọc và xóa thuộc tính trong object, nhưng không thể thay đổi giá trị của thuộc tính.
    VD: có thể dùng với delete để xóa thuộc tính nếu object tồn tại
    

    Chú ý khi dùng Optional chaining:
        - Không nên lạm dụng optional chaining => Chỉ dùng khi giá trị phía trước ?. không bắt buộc (chấp nhận = null hoặc undefined)
        - Biến trước ?. phải được khai báo

    Kết hợp với toán tử nullish coalescing (??):
    - Đây là 1 toán tử logic trả về toán hạng bên phải nếu toán hạng bên trái null hoặc undefined
*/

// Ví dụ thực tế về Optional chaining
const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah',
        cat2: {
            name: 'Daniel',
            cat3: {
                name: 'Noah'
            }
        }
    }
};

/* Kiểm tra sự tồn tại của thuộc tính name trong cat, cat2, cat3 */
//// Cách thông thường
// If và AND &&
if (adventurer.cat &&
    adventurer.cat.cat2 &&
    adventurer.cat.cat2.cat3) {
    console.log(adventurer.cat.cat2.cat3.name)
}
// => dài dòng

// Ternary operators
const cat3Name = adventurer === undefined ? undefined
    : adventurer.cat === undefined ? undefined
        : adventurer.cat.cat2 === undefined ? undefined
            : adventurer.cat.cat2.cat3 === undefined ? undefined
                : adventurer.cat.cat2.cat3.name
// => dài dòng

// Try-catch
const cat3Name
try {
    cat3Name = adventurer.cat.cat2.cat3.name
} catch (error) {
    cat3Name = null
}
// => dài dòng

//// Sử dụng Optional chaining => ngắn gọn
if (adventurer?.cat?.cat2?.cat3) {
    console.log(adventurer.cat.cat2.cat3.name)
}

// Trường hợp chỉ muốn kiểm tra cat1 và cat2
if (adventurer.cat?.cat2?.cat3) {
    console.log(adventurer.cat.cat2.cat3.name)
}

// Trường hợp chỉ muốn kiểm tra cat2 và cat3
if (adventurer.cat.cat2?.cat3?.name) {
    console.log(adventurer.cat.cat2.cat3.name)
}

/* Sử dụng Optional chaining trong object */
let possibleNull = null;
let value = 0;
let result = possibleNull?.[value++];
console.log(value); // 0 as value was not incremented
/*
    Giải thích: Mặc dù biến possibleNull đang là null, nhưng kết quả vẫn không trả về lỗi bởi vì toán tử ?. đã giúp bạn xử lý nó. 
    Nó sẽ bỏ qua đoạn đó và tiếp tục thực hiện chương trình, vì vậy mà biến value lúc này sẽ không tăng giá trị, vẫn giữ nguyên là 0.
*/

/* Sử dụng Optional chaining trong thuộc tính object */
const adventurer = {
    name: 'Alice',
    cat: {
        name: 'Dinah'
    }
};

const dogName = adventurer.dog?.name;
console.log(dogName);
// expected output: undefined
/*
    Giải thích: Nếu toán hạng bên trái của ?. là null hoặc undefined, biểu thức tính toán sẽ có giá trị là undefined.
*/

let nestedProp = myObj?.['prop' + 'Name'];

/* Sử dụng Optional chaining trong array */
let user1 = {
    name: "Alex",
};

let user2 = null;

console.log(user1?.["name"]); // Alex
console.log(user2?.["name"]); // undefined
// Dùng chung với delete
delete user?.name; // xóa thuộc tính user.name nếu user tồn tại.

// Trường hợp thay đổi giá trị thuộc tính => error
let user = null;

user?.name = "Alex";
// Uncaught SyntaxError: Invalid left-hand side in assignment

/* Sử dụng Optional chaining trong hàm */
let userAdmin = {
    admin() {
        console.log("I am admin");
    },
};

let userGuest = {};

userAdmin.admin?.(); // I am admin
userGuest.admin?.(); // không có gì hiển thị

/*
    Giải thích: Trong ví dụ trên, ?. dùng đễ kiểm tra xem phương thức admin có tồn tại hay không. Nếu tôn tại thì phương thức adnin được gọi
    Đối tượng userAdmin có phương thức admin nên userAdnin.admin khác null và undefined. Vì vậy, userAdnin.admin()_ được goi
    Đối tượng usereuest không có phương thức admin nên usereuest.admin bằng undefined . Do đó, userGuest.admin(). không được goi
*/

//// Kết hợp với nullish coalescing
// Ví dụ 1
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0

// Ví dụ 2
let customer2 = {
    name: "Paige",
    details: {
        age: 30 // once again a city is not provided on this object
    }
};
const customerCity2 = customer2?.city ?? "City not provided";
console.log(customerCity2); // prints: "City not provided"