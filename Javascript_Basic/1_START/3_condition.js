/*
    If - Else
*/

// Câu điều kiện
/*
    Các giá trị convert sang boolean sẽ là falsy:
    - 0
    - false
    - '' - ""
    - undefined
    - NaN
    - null

    Các giá trị convert sang boolean sẽ là truthy:
    - Khác falsy
    - '0'
    - ' '
    - 'false'
    - []
    - {}
    - function(){}

    Ngoại lệ:
    document.all là một ngoại lệ chính thức duy nhất theo đặc tả ECMA (phiên bản 5). Đặc tả này mô tả toàn bộ các object khi chuyển sang boolean sẽ là true
    - document.all chuyển sang boolean sẽ là false
    - document.all khi là toán hạng của toán tử so sánh == hoặc != sẽ là undefined
    - Khi typeof document.all sẽ trả về "undefined"
*/

var fullName = 'Lazarus'
if(fullName){
    console.log('DIEU KIEN DUNG')
}else{
    console.log('DIEU KIEN DUNG')    
}