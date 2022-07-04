export default function html([first, ...strings], ...values) {
    return values.reduce(
        (acc, cur) => acc.concat(cur, strings.shift()),
        [first]
    )
        .filter(x => x && x !== true || x === 0)
        // x: truthy loại bỏ true
        .join('')
}

export function createStore(reducer) {
    let state = reducer() // default: {cars: ['BMW', 'Honda', 'Mercedes']}
    const roots = new Map()

    function render() {
        console.log(roots)
        for (const [root, component] of roots) {
            // [root, component] = [key, value]
            // component là những thành phần chứa view
            const output = component() // component = App (script.js) = connector(App) (App.js)
            root.innerHTML = output
        }
    }

    return {
        // Render dữ liệu ra view
        attach(component, root) {
            // component = App (script.js) = connector(App) (App.js)
            // root là node #root
            roots.set(root, component)
            render()
        },
        // Đẩy dữ liệu từ store sang view
        connect(selector = state => state) {
            // selector mặc định sẽ là 1 hàm lấy ra thuộc tính của state, nếu chỉ muốn lấy 1 vài thuộc tính thì phải định nghĩa lại
            // selector được truyền đối số state làm gốc nên dễ dàng lọc ra lấy các giá trị cần thiết

            // Khi truyền đối số là hàm App thì component = App
            return component => (props, ...args) =>
                component(Object.assign({}, props, selector(state), ...args)) // App sẽ được gọi lại vào đây App(Object.assign(...))

            // HAY
            /* connect(selector = state => state){
                return component => { // Trả về lần 1
                    return (props, ...args) => { // Trả về lần 2
                        return component(Object.assign({}, props, selector(state), ...args)) // Trả về lần 3
                    }
                }
            } */
        },
        // Xử lý events
        dispatch(action, ...args) {
            // Bằng cách truyền đối số args vào reducer, state sẽ được thay đổi và cập nhật lại vào state hiện tại
            // Reducer: Nhận state -> thay đổi -> trả về state mới
            state = reducer(state, action, args)
            render()
        }
    }
}