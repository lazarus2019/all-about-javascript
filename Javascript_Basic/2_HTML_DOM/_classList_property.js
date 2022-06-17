/*
    CLASSLIST PROPERTY

    1. Add: Thêm 1 hoặc nhiều class mới
    2. Remove: Xóa 1 hoặc nhiều class
    3. Contains: Kiểm tra class có nằm trong list class hay không (trả về true/false)
    4. Toggle: Thêm/xóa class nếu element chứa/không chứa class đó (đã có =>  xóa, chưa có =>  thêm)
    5. Replace: Thay thế 1 class thành 1 class khác (trả về true/false)
    6. Length: Kiểm tra số lượng class của element
    7. Value: Trả về chuỗi class của element
*/

const boxEl = document.querySelector('.box')
// Add new classes
boxEl.classList.add('hidden')
boxEl.classList.add('new__box', 'main__box')

// Remove classes
boxEl.classList.remove('hidden')
boxEl.classList.remove('new__box', 'main__box')

// Contains class
boxEl.classList.contains('hidden') // false
boxEl.classList.contains('box') // true

// Toggle class
boxEl.classList.contains('show') // false
boxEl.classList.toggle('show') // => contains
boxEl.classList.toggle('show') // => not contains

// Replace class (ok => true)
boxEl.classList.replace('box', 'new__box') // true
boxEl //  <div class="new__box">...</div>
boxEl.classList.replace('_', 'new__class') // false

// Class length
boxEl.classList.length // 1 ['box']
boxEl.classList.add('hidden')
boxEl.classList.length // 2 ['box', 'hidden']

// Class value
boxEl.classList.value // 'box'
boxEl.classList.add('hidden')
boxEl.classList.value // 'box hidden'


