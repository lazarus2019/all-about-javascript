// 
/*
    innerText - textContent: Lấy text node trong element node và bỏ qua các thẻ html trong node
    vừa là setter vừa là getter

    #Khác:
        innerText: 
            - Get: Nội dung text sẽ giống với nội dung hiển thị trên trình duyệt
            - Set: Các ký tự mở đóng thẻ => mã hóa, xuống dòng => <br>

        textContent: 
            - Get: lấy ra toàn bộ nội dung text nguyên bản (bao gồm: dấu khoảng cách, dấu dòng) 
                   không bị ảnh hưởng bởi các yếu tố css khác 
                   Note: nếu có chứa đoạn mã css (trong thẻ style) hoặc js (trong thẻ script) đều được lấy ra
            - Set: không thay đổi, xuống dòng => khoảng cách            
*/

let headingElement = document.querySelector('#heading')
console.log(headingElement.textContent) // Heading 2 ID
console.log(headingElement.innerText) // Heading 2 ID

headingElement.textContent = 'New heading'
headingElement.innerText = 'New heading 2'

/*
    innerHTML - outerHTML: Lấy ra chuỗi nội dung bên trong/ngoài node hoặc thêm các element node vào trong element

    #Khác:
        innerHTML: Lấy chuỗi nội dung bên trong (các element con)

        outerHTML: Lấy chuỗi nội dung bên ngoài (từ element cha vào đến các element con)
*/

let boxElement = document.querySelector('.box')
boxElement.innerHTML = '<h1>This is new main heading</h1>'
console.log(boxElement.innerHTML)

boxElement.outerHTML = '<div class="new-box"></div>'
console.log(boxElement.outerHTML)