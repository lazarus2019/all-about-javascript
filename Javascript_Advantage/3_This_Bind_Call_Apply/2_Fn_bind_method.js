/*
    Fn.bind() - Cho phép ràng buộc THIS cho 1 phương thức (function)

    Phương thức bind() sẽ trả về 1 hàm mới
    Có thể nhận các đối số như hàm ban đầu

    - Phương thức bind() cho phép ràng buộc this cho 1 phương thức(function)
    - Phương thức bind() trả về 1 hàm mới với context được bind
    - Hàm được trả về từ bind() vẫn có thể nhận các đối số của hàm gốc

    Fn.bind(objectName, parameter1, parameter2,...)
    Trong đó:
        - objectName: Tên đối tượng muốn ràng buộc vào từ khóa THIS
        - parameter1, parameter2,...: Là những tham số muốn truyền vào hàm trước .bind()
    
    Lưu ý: Đối số truyền vào hàm thông qua BIND sẽ được ƯU TIÊN hơn so với gọi hàm và truyền đối số
*/

//// Xét ví dụ: Bind document object
this.firstName = 'Minh'
this.lastName = 'Thu'

const teacher = {
    firstName: 'Minh',
    lastName: 'Thảo',
    getFullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

// Case 1:
console.log(teacher.getFullName()) // 'Minh Thảo'

// Case 2:
const getTeacherName = teacher.getFullName

// console.log(getTeacherName === teacher.getFullName) // true

console.log(getTeacherName()) // 'Minh Thu'

/*
    Giải thích:
        - Đối tượng this được khai báo đầu tiên là window
        - Biến getTeacherName được tham chiếu tới phương thức trong object
        - getTeacherName không được gọi bởi bất kỳ đối tượng nào nên mặc định this = window
*/

// Sử dụng từ khóa BIND để ràng buộc nó với từ khóa this cho hàm/method
const getTeacherName2 = teacher.getFullName.bind(teacher)

// console.log(getTeacherName === teacher.getFullName) // true

console.log(getTeacherName2()) // 'Minh Thảo'

const student = {
    firstName: 'Nam',
    lastName: 'Hoàng'
}

const getTeacherName3 = teacher.getFullName.bind(student)

console.log(getTeacherName2()) // 'Nam Hoàng'

//// Đối số truyền vàp hàm thông qua BIND sẽ được ƯU TIÊN hơn
const teacher = {
    firstName: 'Minh',
    lastName: 'Thảo',
    getFullName(data1, data2) {
        console.log(data1, data2)
        return `${this.firstName} ${this.lastName}`
    }
}

const getTeacherName4 = teacher.getFullName.bind(student, 'Test 3', 'Test 4')

console.log(getTeacherName4('Test 1', 'Test 2'))
/*
    KQ:
    Test 3 Test 4
    Nam Hoang
*/

//// Xét ví dụ: Bind DOM listen events
// Chạy hàm getFullName khi click btn
const employee = {
    firstName: 'Văn',
    lastName: 'Toàn',
    getFullName() {
        console.log(`${this.firstName} ${this.lastName}`)
    }
}

const button = document.querySelector('button')

// button.onclick = function(){
//     employee.getFullName() // 'Văn Toàn'
// }
//=> Event này hoạt động bình thường

button.onclick = employee.getFullName // undefined undefined
/*
    Giải thích:
    - Đây là hành đông gán phương thức cho phương thức
    - Khi click button thì handle DOM của JS sẽ tìm object đang click (ở đây là button)
    - Từ khóa this trả về hiện tại là button, cho nên khi .firstName hay .lastName thì không có dữ liệu => undefined
*/
//=> Để giải quyết vấn đề này, hãy set ràng buộc this thành object cần lấy dữ liệu (ở đây là employee)

button.onclick = employee.getFullName.bind(employee) // 'Văn Toàn'

//// Xét ví dụ: Dùng để selector
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

//// Xét ví dụ: Kết hợp object methods + DOM listen events
/*
    HTML:
    <input type="text" placeholder="Enter car name...">
    <button id="submit">Add</button>
    <ul id="root"></ul>
*/
const app = (() => {
    const cars = ['BMW']

    const root = $('#root')
    const input = $('input')
    const submit = $('#submit')

    return {
        add(car) {
            cars.push(car)
        },
        delete(index) {
            cars.splice(index, 1)
        },
        render() {
            const html = cars.map((car, index) => {
                return `<li>
                            ${car}
                            <span class="delete" data-index="${index}">&time;</span>
                        </li>`
            }).html.join('')

            root.innerHTML = html
        },
        handleDelete(e) {
            const deleteBtn = e.target.closest('.delete')

            if(deleteBtn){
                const index = deleteBtn.dataset.index
                // console.log(this) 
                // Nếu không dùng ràng buộc thì this ở đây là ul#root

                this.delete(index)
                this.render()
            }
        },
        init() {
            //Handle DOM events
            /*
            submit.addEventListener = function(){
                const car = input.value
                this.add(car)
                this.render()
            }

            => Không thực hiện được, hàm add và render không tìm thấy vì this hiện tại đi theo context của function bao xung quanh đó (ở đây là this = submit)

            => Giải pháp: 
                - Tạo 1 biến bên ngoài hàm và trỏ về biến this, sau đó sử dụng biến đó trong function (VD: const _this = this)
                - Thay thế expression function => arrow function
            */

            submit.addEventListener('click', () => {
                const car = input.value
                this.add(car)
                this.render()

                input.value = null
                input.focus()
            })

            // Xóa xe
            root.addEventListener('click', this.handleDelete.bind(this))
            // Tương tự ví dụ Bind DOM listen events

            this.render()
        }
    }
})() // IIFE - Để tránh lặp namespace, tạo vùng độc lập và chạy ngay

app.init()