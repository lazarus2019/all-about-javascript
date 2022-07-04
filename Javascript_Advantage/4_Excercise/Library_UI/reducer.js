const init = {
    cars: ['BMW', 'Honda', 'Mercedes']
}

export default function reducer(state = init, action, args) {
    // state được khởi tạo ban đầu = init, từ lần thứ 2 thì sẽ được truyền đối số đi kèm
    switch (action) {
        case 'ADD':
            const [newCar] = args

            return {
                ...state,
                cars: [...state.cars, newCar]
            }
        default:
            return state
    }
}