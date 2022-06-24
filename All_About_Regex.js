// Tài liệu: https://www.w3schools.com/jsref/jsref_obj_regexp.asp || https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions?retiredLocale=vi
// Công cụ: https://regexr.com/
// Luyện tập: https://regexlearn.com/learn | http://regextutorials.com/excercise.html
// Video regex in 20 minutes: https://www.youtube.com/watch?v=rhzKDrUiJVk

// Những biểu thức chính quy (regex) thường được sử dụng: https://regexland.com/most-common-regular-expressions

/*
    Regular Expression - Biểu thức chính quy

    Là biểu thức quy ước định dạng của một mẫu ký tự tìm kiếm
    - Thường sử dụng khi cần tìm kiếm, thay thế và so khớp dữ liệu đầu vào, đầu ra
    - Cú pháp tổng quát: /mẫu_quy_ước(pattern)/cách_thức_so_khớp(flags)
        + Cách thức so khớp:
            *i: không phân biệt hoa thường
            *g: tìm toàn bộ (thay vì dừng ở vị trí đầu tiên tìm thấy)
            *m: tìm trên nhiều dòng
    - Các phương thức thường sử dụng bao gồm:
        + match()       : []        (của string)
        + replace()     : string    (của string)
        + split()       : []        (của string)
        + search()      : boolean   (của string)
        + exec()        : []        (của regular)
        + test()        : boolean   (của regular)

    Character Regular:
    Character Class
    Special Character
    Phương thức test
    Achors
    Quantifiers
    Flags
    String.prototype.match

    Characters:
    abc…	    Tìm a theo sau là b,c...
    123…	    Tìm số 1 theo sau là 2,3...
    .	        Lấy tất cả ký tự - ngoại trừ ký tự xuống dòng

    Escaped characters (ký tự thoát):
    \.          .
    \$          $
    \+          +
    \*          *
    \^          ^
    \?          ?
    \(          (
    \)          )
    \[          [
    \]          ]
    \{          {
    \}          }
    \|          |
    \\          \

    Brackets:    
    [abc]	    Tìm các chữ cái a,b hoặc c
    [abc][vz]	Tìm các chữ cái a,b hoặc c, theo sau đó là v hoặc z
    [^abc]	    Bỏ qua ký tự a, b và c ([^a-z] bỏ qua ký tự chữ từ a-z)
    [a-z]	    Tìm các ký tự từ a-z
    [A-Z]	    Tìm các số từ A-Z
    [0-9]	    Tìm các ký tự chữ từ 0-9, có thể kết hợp thêm [a-z0-9A-Z]
    (a|b|c)     Tìm ký tự a, b hoặc c
    \w\d\s  	Chỉ tìm ký tự chữ, số, khoảng trắng
    \W\D\S	    Bỏ qua ký tự chữ, số, khoảng trắng

    Metacharacter:
    \0          Tìm ký tự null
    \n          Tìm ký tự xuống hàng
    \t          Tìm ký tự tab
    \t          Find a vertical tab character
    \xxx        
    \1          Match the result of a capture group, \1 match first group, \3 match third group

    Anchors:
    ^regex      Biểu thức chính quy phải khớp điểm BẮT ĐẦU
    regex$      Biểu thức chính quy phải khớp điểm KẾT THÚC
    \b          Tìm so khớp bắt đầu hoặc kết thúc từ (x\b: kết thúc, \bx: bắt đầu)
    \B          Tìm so khớp không bắt đầu hoặc kết thúc từ

    (x)         Nhóm chuỗi x và ghi nhớ ký tự đó (thường xử dụng với regex.exec(), nhóm chuỗi sẽ bắt đầu từ 1, 0 = chuỗi gốc)
    (?:x)       Nhóm chuỗi x nhưng KHÔNG ghi nhớ 
    (a(bc))	    Nhóm chuỗi trong nhóm
    (.*)	    Nhóm chuỗi lấy tất cả
    (.*?)	    Capture the first match
    x{m}	    Lặp lại x với m lần
    x{m,n}	    Lặp lại x với m tới n lần
    x{m,}       Lặp lại x với ít nhất m lần
    x{,n}       Lặp lại x với tối đa n lần (Thường JS sẽ trả về chuỗi rỗng)
    n+	        Kiểm tra ký tự xuất hiện 1 hoặc nhiều lần liên tiếp, tương tự {1,}
    n*	        Kiểm tra ký tự xuất hiện 0 hoặc nhiều lần liên tiếp, tương tự {x,}
    n?	        Kiểm tra ký tự xuất hiện 0 hoặc 1 lần, tương tự {0,1}
    (x?=n)      Kiểm tra chuỗi x nếu theo sau đó có ký tự n
    (x?!n)      Kiểm tra chuỗi x nếu theo sau đó KHÔNG có ký tự n
    (x?<=n)     Kiểm tra chuỗi x nếu theo trước đó có ký tự n
    (x?!=n)     Kiểm tra chuỗi x nếu theo trước đó KHÔNG có ký tự n
    Misc	    Misc Meta Characters

    Flags:
    g           So sánh toàn bộ chuỗi (global)
    m           So sánh nhiều dòng (multiline)
    m           So sánh không phân biệt chữ hoa thường (case-insensitive)
    u           So sánh chuỗi unicode
    y           sticky
    s           dotall
*/

/*
    Khởi tạo regex

    1. Sử dụng đối tượng RegExp
    2. Mô tả chính quy thuần (regular expression literal)
*/

// Cách 1: Sử dụng đối tượng RegExp
const regex = new RegExp('/\b(b\w{3})\b.*\b(l\w{3})\b/')

// Cách 2: Thuần (regular expression)
const regexString = /\b(b\w{3})\b.*\b(l\w{3})\b/

/*
    Sử dụng các phương thức liên quan tới regex
*/
const text = 'The best things in life are free'

// [RegExp]exec=>array: Tìm kiếm chuỗi phù hợp với mẫu so khớp, trả về mảng kết quả tìm kiếm của CAPTURE GROUP và null nếu không thấy
const regexExec = /\b(b\w{3})\b.*\b(l\w{3})\b/
let resultExec = regexExec.exec(text)

console.log('resultExec :>> ', resultExec);
/*
    KQ:
    [0]: Toàn bộ chuỗi, ở đây là 'best things in life'
    [1]: Kết quả của nhóm ngoặc () đầu tiên, ở đây là 'best'
    [2]: Kết quả của nhóm ngoặc () thứ 2, ở đây là 'life'
    input: Đoạn text dùng để so sánh
    index: Vị trí chuỗi tìm thấy
*/
// Khi không sử dụng capture group => vẫn return array nhưng chỉ có [0] lấy được

// [RegExp]test=>boolean: Kiểm tra mẫu có khớp với chuỗi hay không => trả về true|false
const regexTest = /\d+/
let resultTest = regexTest.test(text)

console.log('resultTest :>> ', resultTest); // false

// [String]match=>array: Tìm kiếm chuỗi phù hợp với mẫu so khớp, trả về mảng kết quả và null nếu không tìm thấy
const regexMatch = /\w{4,}/
let resultMatch = text.match(regexMatch)

console.log('resultMatch :>> ', resultMatch); // ['best', 'things', 'life', 'free']

// [String]replace: Tìm kiếm chuỗi phù hợp với mẫu so khớp để thay thế với chuỗi mới
const regexReplace = /th/gi
let resultReplace = text.replace(regexReplace, '__')

console.log('resultReplace :>> ', resultReplace); // '__e best __ings in life are free'

// Có thể kết hợp với capture group
const regexReplaceGroup = /(th)/gi
let resultReplaceGroup = text.replace(regexReplaceGroup, '$1_')

console.log('resultReplaceGroup :>> ', resultReplaceGroup); 'Th_e best th_ings in life are free'

// [String]search=>index: Tìm kiếm chuỗi phù hợp với mẫu so khớp => trả về vị trí của chuỗi đó và -1 nếu không tìm thấy
const regexSearch = /free/g
let resultSearch = text.search(regexSearch)

console.log('resultSearch :>> ', resultSearch); // 28

// [String]split=>array: Dùng để ngắt chuỗi thành mảng các chuỗi con bằng biểu thức chính quy hoặc một chuỗi bất biến

/*
    Những biểu thức chính quy thường sử dụng
*/

// Email
const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

// Simple date dd/mm/yyyy
const regexSimpleDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/

// URL
const regexURL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

// Empty string
const regexEmptyString = /^(\w+\S+)$/

// Phone number
const regexPhoneNumber = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/


/*
   Những (20) ví dụ luyện tập về regex (nâng cao 1 xíu)

   1. Lấy ra những số thực
   2. Lấy ra mục chứa năm trước năm 1990
   3. Lấy ra những mã màu thập lục phân (24-bit), bỏ qua mã màu 12-bit
   4. Lấy ra những mã màu 12-bit và 24-bit là màu đỏ, xanh lá và xanh dương
   5. Lấy ra đoạn chuỗi dài hơn 30 ký tự
   6. Loại bỏ những từ lặp lại kế tiếp nhau
   7. Lấy ra tất cả thẻ HTML
   8. Cắt số thập phần về 2 đơn vị sau phần thập phân
   9. Thêm dấu , cho số
   10. Lấy những function có tên bắt đầu là chữ thường
   11. Đổi định dạng yyyy-mm-dd thành dd.mm.yyyy
   12. Chỉ cho phép định dạng thời gian 24h
   13. Chỉ cho phép định dạng thời gian AM/PM
   14. Thay thế phần ngăn cách tham số ; thành ,
   15. Chuyển biến var a = new A(...) -> A a(...);
   16. Lấy địa chỉ IPv6
   17. Lấy mã màu 24-bit và 32-bit thập lục phân
   18. Thay thế toán tử bằng cách gọi hàm (trường hợp này là toán tử a + b -> Add(a, b))
   19. Lấy query string từ URL
   20. Lấy tên miền (host) chỉ bao gồm http:// trên URL
   21. Lấy chuỗi không chứa từ khóa truyền vào
*/

// 1. Lấy ra những số thực
string = 'Acceleration of gravity 9.80665 m/s^2'
pattern = /\d+\.\d+/

// 2. Lấy ra mục chứa năm trước năm 1990
string = '3 The Godfather: Part II (1974)'
pattern = /.*\(19[1-8]\d\)/ // Phần nằm trong ngoặc sẽ là số năm

// 3. Lấy ra những mã màu thập lục phân (24-bit), bỏ qua mã màu 12-bit
string = 'AliceBlue #F0F8FF'
pattern = /#(\d|[A-F]){6}/

// 4. Lấy ra những mã màu 12-bit và 24-bit là màu đỏ, xanh lá và xanh dương
string = 'Dark Grey #a9a9a9 Black #000'
pattern = /#([0-9a-fA-F]{1,2})\1\1/ // Phần \1 có nghĩa là biểu thức thứ nhất trong () sẽ phải lặp lại 1 lần nữa

// 5. Lấy ra đoạn chuỗi dài hơn 30 ký tự
string = 'This line is way too loooooooooooong.'
pattern = / ^.{30}.+$/

// 6. Loại bỏ những từ lặp lại kế tiếp nhau
string = 'I had just just consummated an unusually hearty dinner'
replace_pattern = /\b(.+)\b\s+\1\b/
replace_with = $1 // Ví dụ tìm ra 2 từ 'just just' thì loại bỏ 1 từ phía sau, $1 tượng trưng cho từ phía trước được thay thế

// 7. Lấy ra tất cả thẻ HTML
string = '<!DOCTYPE html> <html> <head> <title>This is a title</title> </head></html>'
pattern = /<[^<>]+>/

// 8. Cắt số thập phần về 2 đơn vị sau phần thập phân
string = '1.351299 US Dollar 0.164114 US Dollar 0.819950 US Dollar'
replace_pattern = /(\d\.\d\d)\d+/
replace_with = $1 // $1 tượng tương cho số thập phân chỉ có 2 đơn vị phía sau

// 9. Thêm dấu , cho số
string = '1361220000 201032714 152518015 143600000 173615000 317121000'
replace_pattern = /(\d)(?=(\d{3})+\b)/ // hoặc /\B(?=(\d{3})+(?!\d))/ với with là ','
replace_with = '$1,' // Dấu , sẽ làm lỗi file nên đặt trong ''

// 10. Lấy những function có tên bắt đầu là chữ thường
string = 'function bazEx(x) {return function(y, z){return x+y+z;}}'
pattern = /function\s+[a-z]\w+\(.*?\)/

// 11. Đổi định dạng yyyy-mm-dd thành dd.mm.yyyy
string = 'Antoine Lavoisier 1743-08-26 — 1794-05-08'
replace_pattern = /(\d{4})-(\d\d)-(\d\d)/
replace_with = $3.$2.$1

// 12. Chỉ cho phép định dạng thời gian 24h
string = '08:61 09:59 13:00 23:61 20:20'
pattern = /((0|1)\d|2[0-3]):[0-5]\d/

// 13. Chỉ cho phép định dạng thời gian AM/PM
string = '00:15 AM 1:00 PM 09:59 19:34 PM'
pattern = /\b(0?\d|1[0-2]):[0-5]\d (AM|PM)/

// 14. Thay thế phần ngăn cách tham số ; thành ,
string = 'void Foo(int x; float y; char z) int Avg(List<int> l; int count)'
replace_pattern = /;(?=[^\(]+\))/
replace_with = ','

// 15. Chuyển biến var a = new A(...) -> A a(...);
string = 'var bar = new Bar(foo, true); var foos = new List<Foo>(3); var foo = new Foo();'
replace_pattern = /var\s+(\w+)\s+=\s+new\s+((?:\w|<|>)+)(.+;)/
replace_with = '$2 $1$3' // Dấu , sẽ làm lỗi file nên đặt trong ''

// 16. Lấy địa chỉ IPv6
string = '2607:f0d0:1002:51::4 2001:db8::ff00:42:8329 2001:0db8:0000:0000:0000:ff00:0042:8329'
pattern = /((\d|[a-f]){0,4}:){2,7}[0-9a-f]{1,4}/

// 17. Lấy mã màu 24-bit và 32-bit thập lục phân
string = '#00ffhh #agaeffe0 #00ff0088 #000000 #000000ff #ffffff'
pattern = /#(([0-9a-f]{6})|([0-9a-f]{8}))\b/

// 18. Thay thế toán tử bằng cách gọi hàm (trường hợp này là toán tử a + b -> Add(a, b))
string = 'foo(x) + bar(x) (a1 + a2)/2'
replace_pattern = /(\w[a-z0-9()*.]+)\s?\+\s?(\w[a-z0-9()*.]+)/
replace_with = Add($1, $2)

// 19. Lấy query string từ URL
string = 'http://pitchimprover.com/index.php?type=Perfect https://www.google.com/search?q=regexp http://www.learnregexp.com?excercise=extract-host-from-URL'
pattern = /\?([^=]+)=(.+)\b/

// 20. Lấy tên miền (host) chỉ bao gồm http:// trên URL
string = 'http://pitchimprover.com/index.php?type=Perfect https://www.google.com/search?q=regexp http://www.learnregexp.com?excercise=extract host from URL'
pattern = /http:\/\/(www.)?[^?\/]+/

// 21. Lấy chuỗi không chứa từ khóa truyền vào
string = `Cake 1: sugar, flour, cocoa powder, baking powder, chocolate
          Cake 2: cream cheese, sugar, vanilla extract
          Cake 5: gingersnap cookies, chopped pecans
        `
pattern = /^(.(?!chocolate))*$/