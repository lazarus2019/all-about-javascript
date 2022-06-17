/*
    EVENT LISTENER
    
    1. Xử lý nhiều việc khi 1 event xảy ra
    2. Lắng nghe / Hủy bỏ lắng nghe
*/

const btn = document.querySelector('#btn')

// Thêm sự kiện
btn.onclick = function () {
    // Việc làm 1
    console.log('Việc làm 1')

    // Việc làm 2
    console.log('Việc làm 2')

    // Việc làm 3
    alert('Việc làm 3')
}

// Loại bỏ sự kiện
setTimeout(() => {
    btn.addEventListener('click', () => { })
}, 3000)


// Thêm sự kiện
btn.addEventListener('click', () => {
    // Việc làm 1
    console.log('Việc làm 1')

    // Việc làm 2
    console.log('Việc làm 2')

    // Việc làm 3
    alert('Việc làm 3')
})

// Loại bỏ sự kiện
btn.removeEventListener('click')

