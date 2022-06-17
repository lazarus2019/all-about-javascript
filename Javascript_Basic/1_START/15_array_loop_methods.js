// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

/*
    ARRAY METHODS

    1. forEach()
    2. every()
    3. some()
    4. find()
    5. filter()
    6. map()
    7. reduce()
    8. reduceRight()

    // 1-6: đều có tham số (function(element, index, array){}, thisArg)
        - function(element, index, array){}: callBackFn
        - element: phần tử của mảng | Bắt buộc
        - index: chỉ số của phần tử | Tùy chọn
        - array: mảng gốc | Tùy chọn
        - thisArg: giá trị được dùng lại khi thực hiện hàm gọi callBackFn => ký tự 'this' | Tùy chọn

    #Note: Các phương thức trên không thay đổi mảng gốc
           Tốc độ của array methods chậm hơn so với các vòng lặp thông thường
           Các phương thức trên đều duyệt qua tất cả phần tử, kể cả phần tử empty (có thể xãy ra lỗi)
*/

let courses = [
    {
        id: 1,
        name: 'Javascript',
        coin: 240
    },
    {
        id: 2,
        name: 'C#',
        coin: 0
    },
    {
        id: 3,
        name: 'Java',
        coin: 120
    },
    {
        id: 4,
        name: 'PHP',
        coin: 80
    },
    {
        id: 5,
        name: 'Python',
        coin: 100
    }
]

// forEach: duyệt qua từng phần tử của mảng (có thể lấy index của phần tử đang duyệt)
courses.forEach(function(course, index){
    // console.log(this)
    console.log(index, course)
}, 5)

// every: duyệt và kiểm tra giá trị tất cả phần tử có cùng thỏa điều kiện hay không (!1 => false, all => true)
let isFree = courses.every(function(course){
    return course.coin === 0
})

console.log(isFree) // false

// some: duyệt và kiểm tra có ít nhất 1 phần tử thỏa điều kiện hay không (1 => true, !all => false)
let isFree = courses.some(function(course){
    return course.coin === 0
})

console.log(isFree) // true

// find: duyệt và trả về phần tử ĐẦU TIÊN thỏa điều kiện (0 => undefined)
let courseResult = courses.find(function(course){
    return 0 < course.coin && course.coin < 200
})

console.log(courseResult) // {id: 3, name: 'Java', coin: 120}

// filter: Tạo ra 1 mảng chứa các phần tử thỏa mãn điều kiện (default => [])
let freeCourses = courses.filter(function(course){
    return course.coin === 0
})

console.log(freeCourses) // [{id: 2, name: 'C#', coin: 0}]

// map: Tạo ra 1 mảng chứa những giá trị trả về của hàm gọi khi được thực thi
function courseHandler(course, index, originArray){
    return {
        id: course.id,
        name: `Khoa hoc: ${course.name}`,
        coin: course.coin,
        coinText: `Coin: ${course.coin}`,
        index: index,
        originArray: originArray
    }
}

let newCourses = courses.map(courseHandler)

// Áp dụng phương thức map để render ra view trên website
const courseHeader = function(course){
    return `<h2>${course.name}</h2>`
}

let headerCourses = courses.map(courseHeader) // '<h2>Javascript</h2><h2>C#</h2>'

// Render ra view website
document.querySelector('body').innerHTML = headerCourses.join('')


// reduce: Trả về 1 giá trị được hàm tích lũy qua từng vòng lặp (có thể đặt giá trị khởi tạo = initial value)
/*
    Note:
    - Phương thức reduce không thể thực thi khi mảng rỗng
    - Initial value:
        + Không đặt => Giá trị trả về sẽ có kiểu dữ liệu của phần tử đầu tiên của mảng
                       Giá trị tích lũy sẽ được gán bởi giá trị của phần tử đầu tiên
                       Giá trị hiện tại sẽ được gán bởi giá trị thứ 2 của mảng => bớt 1 vòng lặp
        + Đặt => Giá trị trả về sẽ cùng kiểu dữ liệu với giá trị khởi tạo
                 Giá trị tích lũy = giá trị khởi tạo
                 Vòng lặp chạy bình thường                 
*/
function coinHandler(accumulator, currentValue, currentIndex, originArray){
    // accumulator: giá trị tích lũy
    return accumulator + currentValue.coin
}

let totalCoin = courses.reduce(coinHandler, 0)
console.log(totalCoin) // 540

// Shorter
let totalCoinShort = courses.reduce((a, b)=> a + b.coin, 0)

console.log(totalCoinShort) // 540

// Ex: sum numbers
let numbers = [100, 20, -100, 0, 40, 60]
let totalNumber = numbers.reduce((a, b)=> a + b)

console.log(totalNumber) // 120

// Ex: Flat the array from Depth array
let depthArray = [1, 2, [3, 4], 5, 6, [7, 8, 9], 10]
let flatArray = depthArray.reduce(function(flatOutput, depthItem){
    return flatOutput.concat(depthItem)
}, [])

console.log(flatArray) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Ex: Get and render all courses from the topics
let topics = [
    {
        topic: 'Front-end',
        courses: [
            {
                id: 1,
                name: 'Javascript',
                coin: 250
            },
            {
                id: 2,
                name: 'HTML, CSS',
                coin: 0
            },
            {
                id: 3,
                name: 'Typescript',
                coin: 100
            },
        ]
    },
    {
        topic: 'Back-end',
        courses: [
            {
                id: 4,
                name: 'Java',
                coin: 0
            },
            {
                id: 5,
                name: 'C#',
                coin: 150
            },
            {
                id: 6,
                name: 'NodeJS',
                coin: 200
            },
        ]
    }
]

let newCourses = topics.reduce(function(courses, topic){
    return courses.concat(topic.courses)
}, [])

console.log(newCourses)
/*
    0: {id: 1, name: 'Javascript', coin: 250}
    1: {id: 2, name: 'HTML, CSS', coin: 0}
    2: {id: 3, name: 'Typescript', coin: 100}
    3: {id: 4, name: 'Java', coin: 0}
    4: {id: 5, name: 'C#', coin: 150}
    5: {id: 6, name: 'NodeJS', coin: 200}
*/

let htmls = newCourses.join('') // ready to render on view

// reduceRight: Tính chất tương tự method reduce, nhưng vòng lặp chạy từ PHẢI SANG TRÁI
const numbers = [175, 50, 25];
let result = numbers.reduceRight(function(total, num){
    return total - num
})

console.log(result) // -200