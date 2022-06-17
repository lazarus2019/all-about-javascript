/*
    CLASSES
    Khái niệm: Là cách viết khác của constructor function
    Lợi ích: 
        - Tổ chức code gọn gàng hơn
        - Thuộc tính, biến, phương thức được chia theo cấp rõ ràng (có block riêng)
*/
// Tạo khuôn mẫu với Constructor function
function CourseFn(name, price){
    this.name = name
    this.price = price

    this.getName = function(){
        return this.name
    }

    this.getPrice = function(){
        return this.price
    }

    const isSuccess = false
    if(condition){
        isSuccess = true
    }
}

// Tạo khuôn mẫu với Class
class Course{
    constructor(name, price){
        this.name = name
        this.price = price
    }

    getName(){
        return this.name
    }

    getPrice(){
        return this.price
    }

    start(){
        let isSuccess = false
        if(condition){
            isSuccess = true
        }
    }
}

const cSharpCourse = new Course('C#', 1000)
const jsCourse = new Course('Javascript', 1200)