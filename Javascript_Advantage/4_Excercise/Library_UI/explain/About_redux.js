// https://fullstack.edu.vn/learning/javascript-nang-cao?id=0be05ec9-5fb0-49e3-b256-063767ffe51a 
/*
    Tổng quan về redux

    Actions: Các events, cách chúng ta send data từ app đến Redux store (tương tác user và app, API calls, form submission,...)
        - Gửi bằng store.dispatch() method
        - Chứa type property biểu lộ action thực hiện, và payload để chứa thông tin
    Reducers:
        - Thực hiện 1 action và trả về 1 state mới
        - State được lưu như những objects
    Store:
        - Lưu trạng thái ứng dụng
        - Có thể access state được lưu, update state, đăng ký hoặc hủy đăng ký các listeners qua helper methods
        - Khi actions thực hiện trên 1 state thì luôn trả về state mới

    Nguyên lý vận hành: Data flow 1 hướng (theo cấu trúc flux của facebook), tránh gọi chồng chéo

                UI --triggers--> ACTIONS --sent to--> REDUCER
                ^                                        |       
                |                                        |
            defines                                  updates
                |                                        |
                ------- STATE <--contains-- STORE <-------

    - Tất cả trạng thái (state) được lưu tại store, view lấy thay đổi từ store để hiện thị
    - Events từ view phải gửi action để update trạng thái trong store
    - Reducer dựa vào action để update state trong store
    - State là plain javascript object, không được biến đổi trực tiếp mà phải thông qua tạo object mới cho reducer trả về

    Gif: https://topdev.vn/blog/wp-content/uploads/2019/05/redux-workflows.gif
    Video: https://www.youtube.com/watch?v=I1pGvUouVv4
*/

import html from '../core.js'

const cars = ['BMW', 'Honda', 'Mercedes']

const isSuccess = false

const output = html`
    <h1>${isSuccess && 'Thành Công'}</h1>
    <ul>
        ${cars.map(car => `<li>${car}</li>`).join('')}
    </ul>
`

console.log(output)

document.querySelector('#root').innerHTML = output