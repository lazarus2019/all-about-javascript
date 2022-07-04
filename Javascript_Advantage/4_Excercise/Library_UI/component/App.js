import html from '../core.js'
import { connect } from '../store.js'

const connector = connect()
// Hàm connect() được thực thi => trả về return lần 1

// Để lấy ra các dữ liệu đặc biệt, tự chọn thay vì lấy hết trong state để xử lý
/*
    // Thêm điều kiện cho selector
    const connector = connect(state => {
        car: state.cars[0],
        cars: state.cars
    })
*/

function App({ cars }) {
    // Chỉ lấy key cars từ state
    return html` <h1>Hello</h1>
                <ul>
                ${cars.map(car => `<li>${car}</li>`)}
                </ul>
                
                <button onclick="dispatch('ADD', 'Chevrolet')">Add car</button>
        `
}

export default connector(App) // Đối số hiện tại component = App