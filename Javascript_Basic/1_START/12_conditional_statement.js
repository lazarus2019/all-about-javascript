// https://www.w3schools.com/js/js_if_else.asp | https://www.w3schools.com/js/js_switch.asp

// Câu lệnh rẽ nhánh If - Else
// #condition(điều kiện): true || false

if (condition) {
    // code
} else if (condition2) {
    // code
} else if (condition3) {
    // code
} else {
    // code
}

// Câu lệnh rẽ nhánh Switch - Case
// #expression: biểu thức
// #condition: true || false || number || string

switch (expression) {
    case condition:
        // code
        break
    case condition:
        // code
        break
    case condition:
        // code
        break
    case condition:
        // code
        break
    case condition:
        // code
        break
    default:
        // code default == else
}

/*
    Chú ý:
        + Điều kiện sử dụng trong switch case là tuyệt đối (===)
        + Sử dụng break ở mỗi case để tránh các dòng lệnh phía dưới sẽ được thực thi cho đến hết vòng lặp hoặc cho đến khi gặp được lệnh break
        + Trường hợp default không nhất thiết phải đặt dưới cùng, nếu đặt ở phía trên PHẢI THÊM LỆNH BREAK
*/