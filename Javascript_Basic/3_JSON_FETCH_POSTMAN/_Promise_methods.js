/*
    Một vài phương thức của Promise:
    
    1. Promise.resolve: Trả về 1 promise resolved(hoàn thành) với 1 giá trị cụ thể
    2. Promise.reject: Trả về 1 promise reject(lỗi) với 1 lỗi cụ thể (có thể truyền string hoặc error instance)
    3. Promise.all (iterable of multiple promises): 
        - Nhận 1  mảng các promise hoặc có thể là non-promise(number, boolean,...)
        - Trả về 1 promise mới
        - Chờ tất cả promise trong mảng resolved, kết quả promise mới này là mảng chứa kết quả của từng promise theo thứ tự
        - Khi 1 promise BỊ REJECTED => TRẢ VỀ ngay lập tức(catch), các promise khác tiếp tục thực thi nhưng kết quả bị BỎ QUA
        - Thực thi promise dạng parallel(song song)
    4. Promise.race (iterable of multiple promises): 
        - Nhận 1  mảng các promise hoặc có thể là non-promise(number, boolean,...)
        - Trả về 1 promise mới
        - Kết quả của promise là kết quả của promise bất kỳ ĐẦU TIÊN resolved hoặc rejected
    5. Promise.any: 
        - Nhận 1  mảng các promise hoặc có thể là non-promise(number, boolean,...)
        - Trả về 1 promise mới
        - Trả về kết quả của promise được resolved ĐẦU TIÊN, bỏ qua những rejected promise
        - Nếu không có resolved promise => Error: All promises were rejected
    6. Promise.allSetted (iterable of multiple promises):
        - Nhận 1  mảng các promise hoặc có thể là non-promise(number, boolean,...)
        - Trả về 1 promise mới
        - Chờ cho tất cả promise được sử lý, kết quả trả về là mảng chứa các object chứa trạng thái và giá trị promise kể cả resolved hay rejected
        - Được hỗ trợ ở 1 vài trình duyệt phiên bản mới 

*/

// Promise.resolve và Promise.reject
Promise.resolve(123).then((data) => console.log(data)) // 123

Promise.reject('Error message').catch((data) => console.log(data)) // Error message
Promise.reject(new Error('Error message')).catch((data) => console.log(data))
// Error: Error message
//     at :4:9
//     at new Promise ()
//     at :2:11
//     at render (tryit.php:202)
//     at tryit.php:170
//     at dispatch (jquery.js:4435)
//     at r.handle (jquery.js:4121)

// Promise.all: Trả về mảng các kết quả của promise (nếu rejected => trả về lỗi và kết quả bị bỏ qua)
const p1 = Promise.resolve(100)
const p2 = Promise.resolve(true)
const p3 = Promise.reject('error')
const p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("p4")
    }, 2000)
})

// Promise 1
Promise.all([p1, p2, p4])
    .then(data => {
        console.log('p1,p2,p4', data)
    })
    .catch(err => {
        console.log('p1,p2,p4', err)
    })

// Promise 2
Promise.all([p1, p2, p3, p4])
    .then(data => {
        console.log('p1,p2,p3,p4', data)
    })
    .catch(err => {
        console.log('p1,p2,p3,p4', err)
    })

// Promise 2: p1,p2,p3,p4 error
// Promise 1: p1,p2,p4 [ 100, true, 'p4' ]
// Promise 2 được trả về trước vì p3 ngay lập tức trả về rejected => in ra lỗi luôn

// Một vài cách nhận về kết quả promise của Promise.all
Promise.all([p1, p2, p3, p4])
    .then(data => {
        let result1 = data[0]
        let result2 = data[1]
        let result3 = data[2]
        let result4 = data[3]
        console.log('p1,p2,p3,p4', data)
    })
    // Hoặc
    .then(([result1, result2, result3, result4]) => {
        console.log(result1, result2, result3, result4)
        console.log('p1,p2,p3,p4', data)
    })
    .catch(err => {
        console.log('p1,p2,p3,p4', err)
    })

// Promise.race: Trả về kết quả của promise ĐẦU TIÊN được resolved hoặc reject
Promise.race([p1, p2, p4])
    .then(data => {
        console.log('p1,p2,p4', data)
    })
    .catch(err => {
        console.log('p1,p2,p4', err)
    })

Promise.race([p1, p2, p3, p4])
    .then(data => {
        console.log('p1,p2,p3,p4', data)
    })
    .catch(err => {
        console.log('p1,p2,p3,p4', err)
    })

// p1,p2,p4 100
// p1,p2,p3,p4 100

// Promise.allSetted: Trả về mảng các object chứa trạng thái và giá trị resolved hay rejected của từng promise
Promise.allSettled([p1, p2, p4])
    .then(data => {
        console.log('p1,p2,p4', data)
    })
    .catch(err => {
        console.log('p1,p2,p4', err)
    })

Promise.allSettled([p1, p2, p3, p4])
    .then(data => {
        console.log('p1,p2,p3,p4', data)
    })
    .catch(err => {
        console.log('p1,p2,p3,p4', err)
    })
// "p1,p2,p4" Array [Object { status: "fulfilled", value: 100 }, Object { status: "fulfilled", value: true }, Object { status: "fulfilled", value: "p4" }]
// "p1,p2,p3,p4" Array [Object { status: "fulfilled", value: 100 }, Object { status: "fulfilled", value: true }, Object { status: "rejected", reason: "error" }, Object { status: "fulfilled", value: "p4" }

// Promise.any: Trả về kết quả resolved promise ĐẦU TIÊN
const APromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("A tới trong vòng 3500 nốt nhạc")
    }, 3500)
});

const BPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("B tới trong vòng 800 nốt nhạc")
    }, 800)
});

const CPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("C tới trong vòng 300 nốt nhạc")
    }, 300)
});

Promise.any([APromise, BPromise, CPromise]).then((firstResolvedData) => {
  console.log(`Cuối cùng ai nhận tiền: ${firstResolvedData}`)
});