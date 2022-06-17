/*
    2 Kiểu dữ liệu trong JS
        - Kiểu tham trị (Value Types) - nguyên thủy (String, Number, Boolean, BigInt, Symbol, undefined, null)
        - Kiểu tham chiếu (Reference Types) - phức tạp (function, array, object => object)

    2 Cách loại bỏ tham chiếu khi truyền tham số
        - Tạo 1 object mới để không ảnh hưởng tới object cũ
            VD: 
                const man1 = { name: "Sanji" }; //#a001
                const man2 = { ...man1 }; #a002
                //man2 là một object mới với địa chỉ mới và có tất cả giá trị của man1

                man1.name = "Zoro"
                console.log(man2.name) // Sanji
                
        - Chuyển object thành chuỗi và giải mã thành object
            VD:
                let b = JSON.parse(JSON.stringify(a));
*/

/*
    1. Kiểu tham trị (Value Types)
        - Đại diện: các kiểu dữ liệu nguyên thuỷ - primitive data type (String, Number, Boolean, BigInt, Symbol, undefined, null)
        - Tính chất: khi gán cho nó một giá trị thì nó sẽ lưu lại giá trị đó và tại một thời điểm thì chỉ lưu một giá trị.
        - Trong hàm: thực chất hàm sẽ tự tạo ra 1 biến và gán giá trị tham số => KHÔNG ẢNH HƯỞNG tới giá trị bên ngoài

    VD:
    let a = 1;
    //Tạo ra biến a và lưu giá trị của a vào ô nhớ - 1 

    let b = a;
    //Tạo ra biến b, sao chép giá trị của biến a và lưu vào ô nhớ mới - 1

    a = 2;
    //Sửa giá trị của biến a và cập nhật lại ô nhớ - 2

    console.log(b) //1

    => Như vậy, giá trị của a và b lưu ở hai ô nhớ khác nhau nên việc sửa ở ô nhớ này sẽ không ảnh hưởng đến ô nhớ khác.
*/

/*
    2. Kiểu tham chiếu (Reference Types)
        - Đại diện: các kiểu dữ liệu phức tạp (Object, Array, Function => gọi chung là object)
        - Tính chất: khi gán cho nó một giá trị thì nó KHÔNG lưu lại giá trị này mà thực chất nó lưu lại địa chỉ của ô nhớ lưu giá trị này.
        - Trong hàm: Vì tính chất gán địa chỉ ô nhớ nên việc thay đổi giá trị bên trong sẽ ẢNH HƯỞNG giá trị bên ngoài

    VD:
    let a = { name: "cat" }
    //Tạo ra biến a, lưu giá trị của a vào ô nhớ và gán lại địa chỉ ô nhớ cho biến a (a = #a001)

    let b = a
    //Tạo ra biến b và gán giá trị của biến a cho b, ở đây chính là địa chỉ địa chỉ ô nhớ của a (b =#a001)

    a.name = "dog"
    //Sửa giá trị của biến a thì giá trị trong ô nhớ được cập nhật

    console.log(b) // { name: "dog" }

    => Như vậy, a và b cùng lưu lại địa chỉ của một ô nhớ, khi một biến thay đổi thì giá trị trong ô nhớ thay đổi mà địa chỉ ô nhớ không thay đổi nên bất kỳ biến nào trỏ đến địa chỉ này đều bị thay đổi theo.

    VD2:
    Ví dụ 3: 
    const a = {
        id: 1, 
        info: {
            name: "John",
            age: 23
        }
    }

    Trong ví dụ trên ta thấy có hai object lồng nhau và cứ là object thì sẽ lưu theo kiểu tham chiếu. Đầu tiên, đi từ trong ra ngoài info sẽ được lưu vào ô nhớ và được gán cho một địa chỉ (info: #a001) sau đó a sẽ được lưu vào ô nhớ với giá trị { id: 1, info: #a001 } và gán lại địa chỉ của ô nhớ đó (a = #a002). Vậy nếu ta gán info cho một biến khác và thay đổi nó thì sẽ như thế nào?

    const Info = a.info
    Info.name = "David"
    console.log(a.info.name)//"David"

    Qua ví dụ này ta thấy một điều khá lạ là Info là hằng số tại sao lại có thể thay đổi được? Thực chất ở đây không phải là đang sửa giá trị của biến Info mà là sửa giá trị trong ô nhớ của nó còn nếu ta gán Info = b thì sẽ lỗi ngay bởi việc gán này sẽ làm thay đổi giá trị của nó.
*/

// Kết luận:
// Tham trị: LƯU GIÁ TRỊ ô nhớ => khi gán cho biến khác và sửa thì KHÔNG THAY ĐỔI GIÁ TRỊ CŨ
// Tham chiếu: chỉ LƯU ĐỊA CHỈ ô nhớ chứa giá trị => các biến được gán sẽ trỏ CÙNG ĐỊA CHỈ ô nhớ và THAY ĐỔI khi thuộc tính thay đổi
// 2 Cách tránh làm thay đổi giá trị tham chiếu: Clone object và chuyển object thành chuỗi sau đó parse về object