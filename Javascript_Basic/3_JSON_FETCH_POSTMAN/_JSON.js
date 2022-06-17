/*
    JSON - Javascript Object Notation: 

    Định nghĩa:
        - Là định dạng dữ liệu (chuỗi)
        - Là định dạng trao đổi dữ liệu nhẹ (lưu trữ và truyền dữ liệu)
        - Văn bản thuần túy được viết bằng ký hiệu đối tượng Javascript
        - Thường được dùng để gửi dữ liệu từ máy chủ lên trang web
        - Dễ dàng sử dụng với bất kỳ ngôn ngữ lập trình (dữ liệu mở)
    
    Quy tắc cú pháp JSON:
        - Dữ liệu đi theo dạng cặp "thuộc tính:giá trị" (key:value)
        - Dữ liệu được ngăn cách bởi dấu ','
        - Dữ liệu dạng chuỗi phải được đặt trong dấu ""
        - Ngoặc {} để bao toàn bộ đối tượng
        - Ngoặc [] để bao một mảng
    
    Phương thức:
        - JSON.parse(string): chuyển JSON -> Javascript types
        - JSON.stringify(object): chuyển Javascript types -> JSON

    Kiểu dữ liệu của giá trị:
        - String
        - Number
        - Object (JSON object)
        - Array
        - Boolean
        - null
    
    #Note: Kiểu dữ liệu không được chứa (Function, Date và undefined) vì sẽ không được chuyển đổi sang JSON
*/

/*
    Khởi tạo JSON
*/

// JSON DATA (key/value)
// "firstName":"John"
// "error": null
// "error": {}

// JSON Object: chứa nhiều cặp key-value
const myFirstJSON = { "firstName": "John", "lastName": "Doe" }

// JSON Array: chứa array bao các object
const employeeArray = {
    "employees": [
        { "firstName": "John", "lastName": "Doe" },
        { "firstName": "Anna", "lastName": "Smith" },
        { "firstName": "Peter", "lastName": "Jones" }
    ]
}

// JSON Convert
var text = '{ "employees" : [' +
    '{ "firstName":"John" , "lastName":"Doe" },' +
    '{ "firstName":"Anna" , "lastName":"Smith" },' +
    '{ "firstName":"Peter" , "lastName":"Jones" } ]}';

var obj = JSON.parse(text);  

console.log(obj.employees[1].firstName, obj.employees[1].lastName) // John Doe

const employeeJSON = JSON.stringify(employeeArray) // data is now a string, and ready to be sent to a server

// JSON Storing Data
const myObj = {name: "John", age: 31, city: "New York"};
const myJSON = JSON.stringify(myObj);
localStorage.setItem("testJSON", myJSON);

// JSON Retrieving Data
let text = localStorage.getItem("testJSON");
let obj = JSON.parse(text);
document.getElementById("demo").innerHTML = obj.name;