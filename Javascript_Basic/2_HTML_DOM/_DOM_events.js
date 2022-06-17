// https://www.w3schools.com/jsref/dom_obj_event.asp | https://developer.mozilla.org/en-US/docs/Web/Events

/*
    DOM EVENTS

    1. Attribute events: Định nghĩa thẳng event và tag trong html
    2. Assign event using the element node: Gán event sử dụng element node
*/

const heading2Els = document.querySelectorAll('.heading-2')
const heading2FirstEl = heading2Els[0]

heading2FirstEl.onmouseover = function(){
    console.log('I\'m in the heading')
}

heading2FirstEl.onmouseout = function(){
    console.log('I\'m out the heading')
}

heading2Els.forEach((heading2El) => {
    heading2El.onclick = function (e) {
        // e: viêt tắt của event, là đối tượng được tạo ra khi thao tác trên trang web
        // e.target: đối tượng đầu tiên thực nhận event
        console.log(e.target.innerHTML)
    }
})

// Cách khác
heading2Els.forEach((heading2El) => {
    heading2El.addEventListener('click', (e) => {
        // console.log(e.target.innerHTML)
        console.log(heading2El.innerHTML)
    })
})

// Có thể tách ra làm hàm riêng
heading2Els.forEach((heading2El) => {
    heading2El.addEventListener('click', clickHeading)
})
function clickHeading() {
    console.log(this.innerHTML)
}

/*
    Một vài event cơ bản trong Javascript
*/

// 1. Input / select
const inputText = document.querySelector('.input-text')
const inputCheckbox = document.querySelector('.input-checkbox')
const selectBox = document.querySelector('.select-box')

// input: gõ vào khung input => execute
inputText.oninput = function (e) {
    console.log(e.target.value) // Giá trị của thẻ input
}

// keyup: nhấn nút và thả ra => execute
inputText.onkeyup = function (e) {
    console.log(e.target.value)
    // e.which: mã nút bấm trên bàn phím được thực hiện
    console.log(e.which)
    switch (e.which) {
        case 13:
            console.log('ENTER')
            break
        case 27:
            console.log('ESC')
            break
    }
}

// keydown: nhấn nút => execute
inputText.onkeydown = function (e) {
    console.log(e.target.value)
}

// keypress: giữ nút => execute
inputText.onkeypress = function (e) {
    console.log(e.target.value)
}

// onchange: nội dung element thay đổi khác với nội dung cũ và blur, giá trị checkbox/select/radio thay đổi => execute 
inputText.onchange = function (e) {
    console.log(e.target.value)
}

inputCheckbox.onchange = function (e) {
    console.log(e.target.checked) // Kiểm tra tình trạng hộp checkbox
}

selectBox.onchange = function (e) {
    console.log(e.target.value) // Lấy ra được value của select (từ value của option được chọn)
}

/*
    onclick	        Xảy ra khi click vào thẻ HTML
    ondbclick	    Xảy ra khi double click vào thẻ HTML
    onchange	    Xảy ra khi giá trị (value) của thẻ HTML đổi. Thường dùng trong các đối thẻ form input
    onmouseover	    Xảy ra khi con trỏ chuột bắt đầu đi vào thẻ HTML
    onmouseout	    Xảy ra khi con trỏ chuột bắt đầu rời khỏi thẻ HTML
    onmouseenter	Tương tự như onmouseover
    onmouseleave	Tương tự như onmouseout
    onmousemove	    Xảy ra khi con chuột di chuyển bên trong thẻ HTML
    onkeydown	    Xảy ra khi gõ một phím bất kì vào ô input
	onload	        Sảy ra khi thẻ HTML bắt đầu chạy, nó giống như hàm khởi tạo trong lập trình hướng đối tượng vậy đó.
	onkeyup	        Xảy ra khi bạn gõ phím nhưng lúc bạn nhã phím ra sẽ được kích hoạt
	onkeypress	    Xảy ra khi bạn nhấn môt phím vào ô input
	onblur	        Xảy ra khi con trỏ chuột rời khỏi ô input
	oncopy	        Xảy ra khi bạn copy nội dung của thẻ
	oncut	        Xảy ra khi bạn cắt nội dung của thẻ
	onpaste	        Xảy ra khi bạn dán nội dung vào thẻ
    contextmenu     Xảy ra khi click chuột phải hoặc nhấn tổ hợp phím để hiện bảng chọn context
*/

/*
abort
afterprint
animationend
animationiteration
animationstart
beforeprint
beforeunload
blur
canplay
canplaythrough
change
click
contextmenu
copy
cut
dblclick
drag
dragend
dragenter
dragleave
dragover
dragstart
drop
durationchange
ended
error
focus
focusin
focusout
fullscreenchange
fullscreenerror
hashchange
input
invalid
keydown
keypress
keyup
load
loadeddata
loadedmetadata
loadstart
message
mousedown
mouseenter
mouseleave
mousemove
mouseover
mouseout
mouseup
mousewheel
offline
online
open
pagehide
pageshow
paste
pause
play
playing
popstate
progress
ratechange
resize
reset
scroll
search
seeked
seeking
select
show
stalled
storage
submit
suspend
timeupdate
toggle
touchcancel
touchend
touchmove
touchstart
transitionend
unload
volumechange
waiting
wheel
 */