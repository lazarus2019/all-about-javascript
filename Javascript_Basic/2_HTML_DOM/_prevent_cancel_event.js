/*
    target: cho biết nơi bắt đầu sự kiện.
    Là phần tử mà người dùng đã nhấp vào, trong trường hợp sự kiện click. Nó có thể là phần tử gốc hoặc bất kỳ phần tử con nào của nó tùy thuộc vào nơi được người dùng click vào chính xác.

    currentTarget == this: cho chúng ta biết phần tử nào mà sự kiện đã được đính kèm hoặc phần tử có eventListener đã kích hoạt sự kiện, nói chung là để lắng nghe sự kiện.    

    event.preventDefault: Huỷ bỏ event nếu nó có thể huỷ mà không dừng sự lan rộng(propagation) của event tới phần khác.
    event.cancelable: Kiểm tra event có thể hủy hay không (default = false)
    event.defaultPrevented: Kiểm tra event của phần tử đã được sử dụng lệnh hủy bỏ event hay chưa (default = false)

    event.eventPhase: Chỉ ra luồng sự kiện hiện tại của element thuộc kiểu gì
        - [0] NONE
        - [1] CAPTURING_PHASE: flow bắt giữ (parent -> children)
        - [2] AT_TARGET: event đang ở đối tượng gây ra sự kiện
        - [3] BUBBLING_PHASE: flow nổi bọt (children -> parent)
    
    #Note: Có thể tự cài đặt luồng sự kiện capturing(true) hoặc bubbling(false) ở tham số thứ 3 của thuộc tính addEventListener
    VD: element.addEventListener('event_name', callbackFn, true/false)

    event.stopPropagation: Ngăn chặn sự lan rộng của sự kiện hiện tại tới thằng khác.
        - Với capturing: đặt stopPropagation tại phần tử cha
        - Với bubbling: đặt stopPropagation tại phần tử con
        
    event.stopImmediatePropagation: ngăn chặn những listeners(sau đó, của phần tử cha hoặc con) cũng đang đang lắng nghe cùng event được gọi.   
    
    #Note: 
        - stopPropagation: Chỉ thực thi khi parent và children cùng 1 kiểu event
        - stopImmediatePropagation: Luôn luôn được thực thi

*/

/*
    Sử dụng preventDefault
*/
const aElements = document.links
for (let i = 0; i < aElements.length; i++) {
    aElements[i].addEventListener('click', (e) => {
        if (!e.target.href.startsWith('https://fullstack.edu.vn/')) {
            e.preventDefault() // Ngăn chặn chuyển hướng page sang website khác fullstack
        }
    })
}

const searchInput = document.querySelector('#search-input')
const ulElement = document.querySelector('ul')

// Loại bỏ sự kiện gõ phím ẩn thẻ ul
ulElement.addEventListener('mousedown', (e)=>{
    e.preventDefault()
})

ulElement.addEventListener('click', (e) => {
    console.log(e.target)
})

/*
    Sử dụng stopPropagation
*/
const containers = document.querySelectorAll('.containers div')

for (let i = 0; i < containers.length; i++) {

    // Luồng sự kiện: BUBBLING
    containers[i].addEventListener('click', displayEventPhase, false)
    
    // Luồng sự kiện: CAPTURING
    //containers[i].addEventListener('click', displayEventPhase, true)
}

function displayEventPhase(e){
    let phase = e.eventPhase

    e.stopPropagation() // Chỉ 1 phần tử TARGET thực hiện nhận sự kiện và ngăn chặn sự kiện lan ra các phần tử khác

    const level = phase == 0 ? 'NONE' :
                  phase == 1 ? 'CAPTURING' :
                  phase == 2 ? 'TARGET' :
                  phase == 3 ? 'BUBBLING' : 'ERROR'
    
    console.log(`Box: ${this.id} - ${level}`)
}