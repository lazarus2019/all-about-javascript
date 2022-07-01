// Library hỗ trợ generator & promise: https://github.com/tj/coz

/*
    Function Generator

    Generator là 1 object được trả về từ generator function
    Generator không thể được tạo ra trực tiếp

    Đặc điểm:
        - Hàm có thể dừng giữa chừng và tiếp tục chạy ở 1 thời điểm khác
        - Mỗi lần gọi next(), hàm sẽ thực thi đến khi gặp yield hoặc return
        - Kết hợp với Promise trong bất đồng bộ JS
    
    Cú pháp định nghĩa hàm Generator (có thêm dấu * sau chữ function):
    function* name([param[, param[, ...param]]]){
        statements
    }

    yield: Dùng để tạm dừng và cũng để tiếp tục việc thực thi bên trong generator function

    next(): Tiếp tục thực thi cho đến khi gặp yield/return  | {value: 2, done: true/false}
    return(): Dừng generator và return kết quả              | {value: 3, done: true}
    throw(): Dừng generator và trả về lỗi                   | {value: undefined, done: true}    
    Trong đó: 
        - value: kết quả của biểu thức trả về
        - done: false nếu generator chưa xong, true nếu hoàn thành

    yield*: 1 dạng ủy quyền thực thi. yield* có thể nhúng mã của 1 generator function ngay sau nó hoặc ủy truyền trực tiếp cho 1 iterator object
    Cú pháp yield*: yield* [[expression]]
        - expression (iterator object): generator function, array, string, list,...

    #NOTE: yield* là một biểu thức chứ không phải là một câu lệnh, do đó nó sẽ phản ánh lại giá trị được return về
*/

//// VD cơ bản của Hàm Generator
function* generator(i) {
    yield i
    yield i + 1
}

const gen = generator(1)
console.log(gen.next().value)
// expected output: 1

console.log(gen.next().value)
// expected output: 2

function* generateId() {
    yield 1

    console.log('Continue to run')
    yield 2

    console.log('Resume')
    return 3 // Gặp yield/return thì dừng
}

const newId = generateId()
newId.next()// {value: 1, done: false}
newId.next()// {value: 2, done: false}
newId.next()// {value: 3, done: true}
newId.next()// undefined

//// VD: Tạo ID tăng dần
function* generateIdIncrease() {
    let i = 0

    while (true) {
        yield i++
    }
}

const newIdIncrease = generateIdIncrease() // "Generator { }"
console.log(newIdIncrease.next())// {value: 1, done: false}
console.log(newIdIncrease.next())// {value: 2, done: false}
console.log(newIdIncrease.next())// {value: 3, done: false}
console.log(newIdIncrease.next())// {value: 4, done: false}
//...

//// VD: Tạo dãy số Fibonaci - Số tiếp theo là tổng của 2 số trước
function* generateFibonacci() {
    let prev = 0
    let curr = 1

    while (true) {
        yield curr

        // Calculate the next number
        const next = prev + curr
        prev = curr
        curr = next
    }
}

const fibo = generateFibonacci()
console.log(fibo.next())// {value: 1, done: false}
console.log(fibo.next())// {value: 1, done: false}
console.log(fibo.next())// {value: 2, done: false}
console.log(fibo.next())// {value: 3, done: false}
console.log(fibo.next())// {value: 5, done: false}

//// VD:Tạo biến iterable
function* loopRange(from, to) {
    for (let i = from; i <= to; i++) {
        yield i
    }
    return to + 1
}

const range = loopRange(0, 10)
for (const i of range) {
    console.log(i)
}

// Log from 0 to 10
//=> Vì for of chỉ chạy những giá trị có done: false, nên phần return sẽ không được in ra

//// VD: Tạo giá trị tăng dần
function* generateId() {
    let id = 1

    while (true) {
        const increment = yield id
        if (increment != null) {
            id += increment
        } else {
            id++
        }
    }
}

const generatorObject = generateId()
console.log(generatorObject.next())// {value: 1, done: false}
console.log(generatorObject.next())// {value: 2, done: false}
console.log(generatorObject.next(4))// {value: 6, done: false}
console.log(generatorObject.next(2))// {value: 8, done: false}
console.log(generatorObject.next())// {value: 9, done: false}
console.log(generatorObject.return(4))// {value: 4, done: true}
console.log(generatorObject.throw(new Error('Hi')))
console.log(generatorObject.next())

//// Yield*
function* g2() {
    yield 3;
    yield 4;
}

function* g1() {
    yield* [1, 2];
    yield* g2();
    yield* '56';
    yield* Array.from(arguments);
}

var iterator = g1(9, 10);

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: 4, done: false}
console.log(iterator.next()); // {value: "5", done: false}
console.log(iterator.next()); // {value: "6", done: false}
console.log(iterator.next()); // {value: 9, done: false}
console.log(iterator.next()); // {value: 10, done: false}
console.log(iterator.next()); // {value: undefined, done: true}

////NOTE: yield* là một biểu thức chứ không phải là một câu lệnh, do đó nó sẽ phản ánh lại giá trị được return về
function* g2() {
    yield* [1, 2];
    return 't sẽ trở thành vua hải tặc, vd như vậy xem chạy ko';
}

var rs;

function* g() {
    rs = yield* g2();
}

var iterator = g();

console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: undefined, done: true}, 
// g2() đã trả về {value: 't sẽ trở thành vua hải tặc, vd như vậy xem chạy ko', don

//// Dùng Generator với async code như promise
function fetchStory() {
    get('story.json')
        .then(function (response) {
            return JSON.parse(response)
        })
        .then(function (response) {
            console.log('Yey JSON!', response)
        })
}

// Dùng co library và generator
const fetchStory = co.wrap(function* () {
    try {
        const response = yield get('story.json')
        const text = yield JSON.parse(response)
        console.log('Yey JSON!', response)
    }catch(err){}
})

// Khi dùng Async/await
async function fetchStory() {
    try {
        const response = await get('story.json')
        const text = await JSON.parse(response)
        console.log('Yey JSON!', response)
    }catch(err){}
}