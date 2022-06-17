// https://zellwk.com/blog/dom-traversals/

/*
    TRAVERSING - Cách duyệt qua các phần tử trong DOM

    Có 3 hướng để duyệt:
    1. Downwards - Hướng xuống (vào trong)
    2. Upwards - Hướng lên (ra bên ngoài)
    3. Sideways - Hướng ngang (ngang bằng cấp & trong cùng 1 phần tử cha)

    #Note: trường hợp đặt biệt
    el.firstElementChild // El con đầu tiên
    el.lastElementChild // El con cuối cùng
    el.firstChild;  // Node con đầu tiên (node object)
    el.lastChild;  // Node con cuối cùng (node object)
*/

//--Traversing downwards - Duyệt element theo hướng xuống
/*
    Có 2 phương thức:
    - el.querySelector & el.querySelectorAll
    - el.children
*/

// el.querySelector & el.querySelectorAll: duyệt phần tử con từ phần tử cha (nhanh hơn khi duyệt từ phần tử lớn(document))
const component = document.querySelector('.component')
const title = component.querySelector('.component__title') // sử dụng phần tử cha để duyệt vào trong

console.log(title) // <h2 class="component__title"> ... </h2>

const headingEls = document.querySelectorAll('.heading-2')
const secondHeading = headingEls[1]

// el.children: Trả về một HTMLCollection bao gồm các phần tử con
const boxElement = document.querySelector('.box')
const headingElements = boxElement.children
// Để lặp qua các phần tử bằng forEach thì chuyển sang array
const array = Array.from(headingElements)
array.forEach(el => { /* code */})

//--Traversing upwards - Duyệt element theo hướng lên
/*
    Có 2 phương thức:
    - el.parentElement
    - el.closest
*/

// el.parentElement: lấy ra phần tử cha cấp 1
const firstEl = document.querySelector('.heading-2')
const parentEl = firstEl.parentElement // <div class="box">...</div>

// el.closest: lấy ra phần tử cha gần nhất khớp với bộ lọc (trả về null nếu không tìm thấy)
const firstEl = document.querySelector('.heading-2')
const parentEl = firstEl.closest('.box') // <div class="box">...</div>

//--Traversing sideways - Duyệt element theo hướng ngang (trong cùng phần tử cha)
/*
    Có 3 phương thức:
    - el.nextElementSibling
    - el.previousElementSibling
    - parentElement, children, index
*/

// nel.nextElementSibling: lấy ra phần tử kết tiếp (trả về null nếu không tìm thấy)
const firstEl = document.querySelector('.heading-2')
const secondEl = firstEl.nextElementSibling // <h2 class="heading-2 heading--selected">Heading in box 2</h2>

// el.previousElementSibling: lấy ra phần tử trước đó (trả về null nếu không tìm thấy)
const firstElement = secondEl.previousElementSibling // <h2 class="heading-2">Heading in box 1</h2>

// Kết hợp parentElement, children, index để lấy ra phần tử chính xác theo index
const firstEl = document.querySelector('.heading-2')
const boxEl = firstEl.parentElement
const allElements = boxEl.children
const fourthEl = allElements[3] // <h2 class="heading-2">Heading in box 4</h2>

// Hoặc có thể viết ngắn hơn
const fifthEl = firstEl.parentElement.children[4] // <h2 class="heading-2">Heading in box 5</h2>

