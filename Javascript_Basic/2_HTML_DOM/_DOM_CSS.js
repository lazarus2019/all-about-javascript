// DOM STYLE
// #Note: các thuộc tính CSS trong DOM được chuyển sang dạng camelCase 

const boxEl = document.querySelector('.box')

console.log(boxEl.style) // Mảng các thuộc tính CSS của element

// Thêm thuộc tính style cho element
boxEl.style.backgroundColor = 'green'
boxEl.style.fontSize = '20px'
boxEl.style.color = '#fff'

// Thêm style cho element bằng Object.assign
Object.assign(boxEl.style, {
    backgroundColor: 'green',
    fontSize: '20px',
    color: '#fff',
})

// Loại bỏ thuộc tính style đã set
boxEl.style.backgroundColor = ''
boxEl.style.fontSize = ''
boxEl.style.color = ''

