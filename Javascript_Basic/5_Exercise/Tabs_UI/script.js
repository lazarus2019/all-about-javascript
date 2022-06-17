const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const tabs = $$('.tab-item')
const panes = $$('.tab-pane')

const tabActive = $('.tab-item.active')
console.log([tabActive]) // Kiểm tra thuộc tính của tabActive => vị trí bên trái (offsetLeft) và kích thước chiều ngang (offsetWidth)
const line = $('.tabs .line')

tabs.forEach((tab, index)=>{
    let pane = panes[index]

    tab.addEventListener('click', (e)=>{
        $('.tab-item.active').classList.remove('active')
        $('.tab-pane.active').classList.remove('active')

        line.style.left = tab.offsetLeft + 'px'
        line.style.width = tab.offsetWidth + 'px'

        tab.classList.add('active')
        pane.classList.add('active')
    })
})