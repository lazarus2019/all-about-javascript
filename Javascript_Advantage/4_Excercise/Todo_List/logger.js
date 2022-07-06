// Tạo middleware: phần trung gian giúp trả ra trạng thái trước và sau khi dispatch của reducer 

export default function logger(reducer) {
    return (prevState, action, args) => {
        console.group(action)
        console.log('Prev State: ', prevState)
        console.log('Action arguments: ', args)
        
        const nextState = reducer(prevState, action, args)
        console.log('Next State: ', nextState)

        console.groupEnd(action)
        return nextState
    }
}