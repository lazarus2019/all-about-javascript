/*
    Khi event loop thấy trong callback queue có 1 callback
    Microtask (API, Promise,...): Execute trước khi bắt đầu event loop tiếp theo
    Macrotask (DOM event, timing,...): Execute vào event loop tiếp theo

    VD: nếu promise được lồng bởi setTimeout thì promise sẽ được thực thi trước khi thực thi callback trong setTimeout
*/

const promise = fetch('https://jsonplaceholder.typicode.com/todos/1')

// promise.then((res) => res.json()).then(data => console.log(data))

/*
    Async - await

    Async: Giúp code gọn hơn, giá trị trả về tự động được truyền qua Promise. Nếu thành công thì tự động trả về resolve còn lỗi thì trả về reject

    #Note: Throw error trong async như thế nào?
        - Sử dụng try-catch để nhận về error
        - console error đó và throw Error('noi dung error') mới => lúc này catch của Promise mới nhận được

    Await: Giúp code bất đồng bộ chạy theo tuần tự, nó sẽ đợi 1 hàm có trả về Promise hoàn thành (thành công/thất bại) sau đó mới thực thi các câu lệnh dưới đó => Trả về giá trị trực tiếp của hàm (KHÔNG dùng then)
    => Tránh tình trạng rơi vào Promise hell

    #Note:
        - Await cho từng Promise:
            + Sử dụng khi các hàm phụ thuộc vào kết quả của nhau để thực hiện
            + Có thể lấy được giá trị của từng hàm khi có kết quả trả về
            + Tổng thời gian thực hiện lâu hơn vì phải chạy tuần tự
        - Await kết hợp với Promise.all:
            + Sử dụng khi các hàm không phụ thuộc vào nhau
            + Giá trị hàm không tồn tại
            + Tổng thời gian = Promise thực thi lâu nhất
        
    #Note2: 
        - Sử dụng async await khi dùng method map, filter và forEach thì các phương thức này sẽ không dừng vòng lặp để đợi Promise trả về kết quả => không thể lấy riêng từng kết quả để dùng => Vì thế phải sử dụng Promise.all để lấy nhận lại danh sách kết quả
*/
// Promise thông thường
const getUserData = (info) => {
    return Promise.resolve(info)
}
getUserData('user-info').then(str => console.log(str))

// Sử dụng async
const getUserData2 = async (info) => {
    return info
}
getUserData2('user-info').then(str => console.log(str))

///// Throw error trong async
const getUserDataError = async () => {
    try{
        const user = getUserData2('user-info')
        throw Error('Error sẽ nhận được')
    }catch(error){
        console.log('Error: ', error) // 'Error: Error sẽ nhận được'
        throw Error('Nội dung error mới')
    }
}

getUserDataError
    .then(data => console.log(data))
    .catch(error => console.log(error)) // 'Nội dung error mới'

//// Await
// Chạy code tuần tự bằng Promise thông thường
const testSpeedPromise = () => {
    const arr = []
    return getUserData2('A').then(v => {
        arr.push(v)
        getUserData2('B').then(v => {
            arr.push(v)
            getUserData2('C').then(v => {
                arr.push(v)
            })
        })
        return arr
    })
}

// Hoặc bằng cách ngắn hơn
const testSpeedPromise2 = () => {
    const arr = []
    return getUserData2('A').then(v => {
        arr.push(v)
        return getUserData2('B')
    }).then(v => {
        arr.push(v)
        return getUserData2('C')
    }).then(v => {
        arr.push(v)
        return arr
    })
}

// Sử dụng await
const testSpeed = async () => {
    const personA = await getUserData2('A')
    const personB = await getUserData2('B')
    const personC = await getUserData2('C')

    return [personA, personB, personC]
}

const testSpeedPromiseAll = async () => {
    const personA = getUserData2('A')
    const personB = getUserData2('B')
    const personC = getUserData2('C')

    const result = await Promise.all([personA, personB, personC])
    return result
}

// Tính thời gian xử lý tác vụ
console.time('test')
testSpeed().then(arr => {
    console.log(arr)
    console.timeEnd('test') // 3.02ms
})

console.time('test1')
testSpeedPromise().then(arr => {
    console.log(arr)
    console.timeEnd('test1') // 1.65ms
})

console.time('test2')
testSpeedPromise2().then(arr => {
    console.log(arr)
    console.timeEnd('test2') // 3.12ms
})

console.time('test3')
testSpeedPromiseAll().then(arr => {
    console.log(arr)
    console.timeEnd('test3') // 2.39ms
})


// => Promise lồng vào nhau -> Promise all + await -> await -> Promise return từng Promise

//// Sự khác biệt khi sử dụng await và await + Promise.all
// Tạo 1 hàm ngủ
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const getUserDataNew = async (info) => {
    await sleep(1000)
    return info
}

const getUserDataNew2 = async (info) => {
    await sleep(3000)
    return info
}

const testSpeedNew = async () => {
    const personA = await getUserDataNew('A') // 1 giây xử lý
    const personB = await getUserDataNew('B') // 1 giây xử lý
    const personC = await getUserDataNew2('C') // 3 giây xử lý

    return [personA, personB, personC]
}

const testSpeedPromiseAllNew = async () => {
    const personA = getUserDataNew('A') // 1 giây xử lý
    const personB = getUserDataNew('B') // 1 giây xử lý
    const personC = getUserDataNew2('C') // 3 giây xử lý

    const result = await Promise.all([personA, personB, personC])
    return result
}

console.time('testAwait')
testSpeedNew().then(arr => {
    console.log(arr)
    console.timeEnd('testAwait') // ít nhất 1+1+3 = 5s
})

console.time('testAwaitPromise')
testSpeedPromiseAllNew().then(arr => {
    console.log(arr)
    console.timeEnd('testAwaitPromise') // ít nhất 3s
})

//// Trường hợp sử dụng Async-await với map
const arr = ['a', 'b', 'c', 'd']

const result = arr.map(async (item)=>{
    return await getUserDataNew(item)
})

const promises = arr.map(item => getUserDataNew(item))

(async ()=>{
    console.log(await new Promise.all(promises))
})

const test = async()=>{
    for(const item of arr){
        console.log(await getUserDataNew(item))
    }

    // Hoặc cách khác
    for await (const item of promises){
        console.log(item)
    }

    // Async-await với câu điều kiện
    if(await getUserDataNew('a') === 'a'){
        console.log('Yeah, you did it!')
    }
}