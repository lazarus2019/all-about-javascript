import { attach } from './store.js'
import App from './component/App.js'
// App = connector(App)

attach(App, document.querySelector('#root'))
// App là đoạn return thứ 2, do không truyền thêm đối số để nhận bên (props, ...args) nên 2 giá trị này là undefined và []
// (props, ...args) => Dùng để bổ sung các thuộc tính muốn truyền vào component trong tương lai

// Ví dụ khi truyền thêm thuộc tính cho component: App({color:'red'},{price: 200000, weight:1500})

// script.js --> store.js --> core.js --> reducer.js  --> App.js