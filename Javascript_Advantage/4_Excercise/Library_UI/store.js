import {createStore} from './core.js'
import reducer from './reducer.js'

const {attach, connect, dispatch} = createStore(reducer)

// Khởi tạo hàm dispatch global để listen events của component
window.dispatch = dispatch

export{
    attach,
    connect
}