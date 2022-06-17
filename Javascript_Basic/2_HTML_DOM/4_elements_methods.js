/*
    CREATE ELEMENT METHODS - Phương thức tạo mới thành phần trong DOM

    Quy trình:
        1. Tạo element node
        2. Tạo các text code, attribute node con
        3. Thêm node con trên vào element node
        4. Thêm element node vào một vị trí nào đó
 */
// Cách 1
let a = document.createElement('a') // 1. Element node
let text = document.createTextNode('This is a link')  // 2. Text code
let href = document.createAttribute('href') // 2. Attribute
href.value = 'www.google.com' // Set attribute value
a.appendChild(text) // 3
a.setAttributeNode(href) // 3

// Cách 2
let a = document.createElement('a')
a.textContent = 'This is a link'
a.href = 'www.google.com'

let boxNode = document.querySelector('.box') // Element parent
// element.appendChild(node): Thêm 1 node vào vị trí cuối cùng của element
// element.append(node, node2,...): Thêm 1 hoặc nhiều node vào vị trí cuối cùng của element
boxNode.appendChild(a) // Chèn vào bên trong element cha, Ở DƯỚI CÙNG
boxNode.insertBefore(a) // Chèn ở bên ngoài element cha, Ở PHÍA TRƯỚC

/*
    GET ELEMENTS 
    1. Element: ID, class, tag, CSS selector, HTML collection
    2. Attribute
    3. Text
*/

// Truy cập element theo ID
// Mỗi ID đều phải riêng biệt và duy nhất, nếu trùng thì element đầu tiên chỉ được gọi
let headingNode = document.getElementById('heading')
console.log(headingNode)

// Truy cập tập hợp các element theo class
let headingNodes = document.getElementsByClassName('heading') // NodeList
console.log(headingNodes)

// Truy cập tập hợp các element theo tag
let headingNodes = document.getElementsByTagName('h2') // HTML collection
console.log(headingNodes)
let secondHeading = document.getElementsByTagName('h2')[1]

// Truy cập element theo CSS selector
let boxNode = document.querySelector('.box')
let headingNode = document.querySelector('.box .heading-2:first-child')
let headingNode2 = document.querySelector('.box .heading-2:nth-child(2)')

let selectedHeading = boxNode.querySelector('.heading--selected') // Chọn element con trong node cha

let headingNodes = document.querySelectorAll('.box .heading-2') // NodeList

// Lấy tra các elements có class này nhưng không có class khác
let onlyHeadingNodes = document.querySelectorAll('.box .heading-2:not(.heading--selected)')

// Lấy ra elements theo Attribute
let aloneButtons = document.querySelectorAll('[name="alone-button"]')
// Lấy ra các elements có name: 'alone-button' và type: 'button'
let aloneButtons = document.querySelectorAll('[name="alone-button"][type="button"]')
// Lấy ra các elements có thuộc tính name
let elementsHaveName = document.querySelectorAll('[name]')
// Lấy ra các elements checkbox được checked
let checkboxChecked = document.querySelectorAll('input[type="checkbox"]:checked')
// Lấy ra các elements checkbox KHÔNG được checked
let checkboxNotChecked = document.querySelectorAll('input[type="checkbox"]:not([checked])')


/*
    REMOVE, REPLACE ELEMENT - Xóa, thay thế phần tử
 */

// element.remove(): xóa bản thân element đó
let el = document.querySelector('#heading')
el.remove()

// Note: trường hợp trình duyệt không hỗ trợ, có thể xóa gián tiếp qua parent node
el.parentNode.removeChild(el)

// Hoặc sử gọi trực tiếp parent node
let headingBox = document.querySelector('.h2-box')
headingBox.remove(el)

// element.replaceChild(new_node, old_node): thay thế node cũ bằng node mới
let el2 = document.querySelector('.heading--selected')
headingBox.replaceChild(el2, el)


/*
    CHECK ELEMENT BY MATCH: Kiểm tra phần tử có class/id không
*/

let headingBox =  document.querySelector('.h2-box')
let isBox = headingBox.matches('.h2-box') // true
// Sử dụng ký tự ',' để thêm điều kiện khác
let answer = headingBox.matches(".container, .wrapper"); // false

