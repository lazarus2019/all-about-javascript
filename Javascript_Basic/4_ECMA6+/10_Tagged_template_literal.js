/*
    Tagged template literals - Ký tự chuỗi

    Gọi function qua cú pháp template literal
    Trong đó:
        - Tham số thứ nhất là mảng chứa các chuỗi nội suy
        - Các tham số tiếp theo lần lượt là tham số truyền vào
        - Nếu tham số ở vị trí đầu hoặc cuối thì mảng chuỗi cũng có string rỗng ở đầu và cuối
*/

// Tạo ra chuỗi HTML có highlight các giá trị truyền vào (sử dụng reduce)
function highlight([first, ...strings], ...values) {
    console.log('first ', first) // 'Học lập trình'
    console.log('strings ', strings) // [' tại ', '!']
    console.log('values ', values) // ['Javascript', 'F8']

    return values.reduce(
        (value, currentValue) => [...value, `<span>${currentValue}</span>`, strings.shift()],
        [first]
    ).join('')
    /* Giải thích: 
            Bắt đầu chuỗi với 'Học lập trình' 
            => chèn giá trị đầu tiên của values vào previousValue 
            => chèn giá trị tiếp theo của mảng nội suy 
            => Tiếp tục loop cho đến khi hết 
    */

    // console.log(rest) // [['Học lập trình ', ' tại ', '!'], 'Javascript', 'F8']
}

let brand = 'F8'
let course = 'Javascript'

// Kết quả mong muốn: Học lập trình <span>Javascript</span> tại <span>F8</span>!
let html = highlight`Học lập trình ${course} tại ${brand}!`

console.log(html) // Học lập trình <span>Javascript</span> tại <span>F8</span>!