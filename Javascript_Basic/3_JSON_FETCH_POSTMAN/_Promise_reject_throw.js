// https://kysumattien.com/javascrip-promise-interesting-things

/*
    1. Tại sao không thể bắt lỗi của chính promise trong .then block?
    2. Khác biệt giữa "reject" và "throw" khi dùng trong Promise
*/

// 1. Tại sao không thể bắt lỗi của chính promise trong .then block?
// khởi tạo foo là object rỗng
const foo = {};
// step 1:
fetch('http://some.url.1/')
    // step 2:
    .then(function (response1) {
        foo.bar(); // foo.bar hem có, undifined,
        // lỗi foo.bar is not a function.

        // gặp lỗi phía trên ngay lập tức chạy tới đoạn
        // catch để handle lỗi, nên dòng này không chạy
        return fetch('http://some.url.2/?v=' + response1);
    })

    // step 3:
    .then(
        function fulfilled(response2) {
            // never gets here
        },
        // rejection handler to catch the error
        function rejected(err) {
            console.log(err); // `TypeError` from `foo.bar()` error
            return 42;
        }
    )

    // step 4:
    .then(function (msg) {
        console.log(msg); // 42
    });

// 2. Khác biệt giữa "reject" và "throw" khi dùng trong Promise
//### Trường hợp 1: callback bất đồng bộ đặt trong Promise

// Đối với Throw
const p = new Promise((resolve, reject) => {
    // Asynchronous function called within the Promise.
    // throw lỗi trong asynchronous callback - đặt trong setTimeout
    setTimeout(() => {
        throw 'promise failed!';
    }, 1000);
});

// .catch sẽ không bắt được lỗi trên
// và JS engine sẽ la lên
p.catch(err => {
    console.log(err);
});

// => catch block không bắt được lỗi vì setTimeout là 1 async function
// Lúc này JS Engine sẽ thông báo lỗi 'Uncaught promise failed!' có nghĩa là phát hiện lỗi nhưng không có phương thức nào bắt lỗi này hết

// Đối với Reject
const p = new Promise((resolve, reject) => {
    // Asynchronus function called within the Promise.
    setTimeout(() => {
        reject('promise failed!');
    }, 1000);
});

// Giờ thì catch đã có thể bắt được lỗi
// JS Enginge không còn cảnh báo nữa
p.catch(err => {
    console.log(err); // 'promise failed!'
});
// => Khi sử dụng reject, JS engine không còn hiện lỗi nữa

//### Trường hợp 2: Ngắt luồng chạy code khi gặp lỗi

// Đối với throw
const p = new Promise((resolve, reject) => {
    throw 'promise failed!';

    console.log('Here'); // Hàm này sẽ không được thực thi
});

p.catch(err => {
    console.log(err);
});

// => khi throw được phát hiện thì sẽ ném ra một exception, ngắt luồng thực thi code và thoát ra khỏi scope function đó

// Đối với reject
const p = new Promise((resolve, reject) => {
    reject('promise failed!');

    console.log('Here'); // Vẫn được thực thi nhé
});

p.catch(err => {
    console.log(err);
});
// Kết quả:
// Here
// promise failed!

// => Có thể thấy với reject, luồng thực thi code vẫn tiếp tục các câu lệnh tiếp theo trong scope function và tìm tới catch block để xử lý lỗi

//### Trường hợp 3: Được dùng trong phạm vi nào

// Đối với throw (dùng ở bất kỳ scope của try-catch, kể cả scope của Promise)
var a = 20;
try {
    if (a < 25) throw 'Less than 25';

    console.log('Okay!');
} catch (err) {
    console.log('inside catch');
    console.log(err);
}

// Kết quả
// inside catch
// Less than 25

// Đối với reject
var a = 20;
try {
    if (a < 25) Promise.reject('Less than 25');

    console.log('Okay!');
} catch (err) {
    console.log('inside catch');

    console.log(err);
}