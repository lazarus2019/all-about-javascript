// https://developer.mozilla.org/en-US/docs/Web/API/console

/*
    Một vài thứ hay ho của Console

    1. Hiển thị tên biến cho dữ liệu console
    2. Thêm tính năng tùy chọn cho console
        - %c: thêm thuộc tính CSS style 
        - %o - %O: đối tượng Javascript
        - %s: chuỗi văn bản
        - %d - %i: số nguyên
        - %f: số thực
    3. Trình bày thành bảng các giá trị (table)
    4. Tính toán thời gian thực thi dữ liệu (time, timeLog và timeEnd)
    5. Kiểm tra những vị trí đã gọi function (trace)
    6. Bao các console thành 1 nhóm (group và groupEnd)

*/
const femaleUser = { name: 'Janna', age: 24, hometown: 'Brazil' }
const maleUser = { name: 'Ryan', age: 30, hometown: 'New Zealand' }

//// 1. Hiển thị tên biến cho dữ liệu console
// Bad
console.log(femaleUser)
console.log(maleUser)
// => Khó phân biệt 2 biến vì không hiển thị tên

// Good
console.log({ femaleUser, maleUser })
// => Bọc tên biến trong dấu {}

//// 2. Thêm tính năng color cho console
console.log('%c New Error', 'color: red')
console.log("Multiple styles: %cred %corange", "color: red", "color: orange", "Additional unformatted message");
for (let i = 0; i < 5; i++) {
    console.log("Hello, %s. You've called me %d times.", "Bob", i + 1);
}

//// 3. Trình bày thành bảng các giá trị (table)
console.table([femaleUser, maleUser])

//// 4. Tính toán thời gian thực thi dữ liệu (time, timeLog và timeEnd)
console.time('timer') // Lúc này là bắt đầu đếm
alert("Click to continue");
console.timeLog('timer') // Thời gian hiện tại 
alert("Do a bunch of other stuff...");
console.timeEnd('timer') // Kết thúc đếm

//// 5. Kiểm tra những vị trí đã gọi function (trace)
const test = () => {
    console.trace('tên của trace')
}

test()

//// 6. Bao các console thành 1 nhóm (group và groupEnd)
console.log("This is the outer level");
console.group("First group");
console.log("In the first group");
console.group("Second group");
console.log("In the second group");
console.warn("Still in the second group");
console.groupEnd();
console.log("Back to the first group");
console.groupEnd();
console.debug("Back to the outer level");

/* Result:
 1.This is the outer level
  - First group
      2. In the first group
      - Second group
        3. In the second group
        3. Still in the second group
     2. Back to the first group
  1. Back to the outer level
*/