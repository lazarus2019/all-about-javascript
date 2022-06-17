// https://www.w3schools.com/html/html_attributes.asp

// DOM Attributes

/*
    Một vài (9) attribute (getter & setter) có cơ bản

    1. href [a]: đường dẫn của trang đích
    2. src [img]: đường dẫn tới file hình ảnh để hiển thị
    3. width height [img]: cấp thông tin chiều dài và chiều rộng cho hình
    4. alt [img]: nội dung đại hiện cho hình ảnh
    5. style [all]: thuộc tính giúp chỉnh sửa kiểu cách cho element
    6. lang [html]: khai báo ngôn ngữ cho trang web
    7. title [all]: định nghĩa thêm thông tin về element
    8. id [all]: chỉ mục của element
    9. className [all]: tên lớp(class) của element
*/

/*
    Tương tác với attribute
*/
let headingElement = document.querySelector('#heading')
// Lấy giá trị của attribute
headingElement.getAttribute('title')
headingElement.getAttribute('data-id')

// Lấy node của attribute
let titleAtt = headingElement.getAttributeNode('title')

// Thêm
headingElement.title = 'This is main heading'
headingElement.setAttribute('data-id', 1)
headingElement.style.color = 'blue'

// Xóa
headingElement.title = ''
headingElement.setAttribute('data-id','')
headingElement.removeAttribute('class')

// Xóa attribute theo node attribute
headingElement.removeAttributeNode(titleAtt)

// Sửa
headingElement.title = 'new value'
headingElement.setAttribute('data-id','new value')

// Kiểm tra sự tồn tại của attribute
headingElement.hasAttribute('data-id') // false
headingElement.hasAttribute('class') // true

// Kiểm tra element có thuộc tính hay không
headingElement.hasAttributes() // true