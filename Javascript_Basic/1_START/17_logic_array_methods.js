/*
    LOGIC ARRAY METHODS & REMAKE YOUR OWN METHOD

    NOTE: Để tránh việc lặp qua các empty element => sử dụng for/in
          Tuy nhiên, tính chất của vòng lặp for/in duyệt qua tất cả các thuộc tính của đối tượng và của cả prototype của đối tượng
          => Các phương thức tự khởi tạo cũng sẽ nằm trong phạm vi của vòng lặp
          Cho nên phải xác nhận các thuộc tính đó có phải của riêng đối tượng hay không, bằng cách:
          - Sử dụng phương thức hasOwnProperty(property_key)

            if(object.hasOwnProperty(key)){
                // key riêng của đối tượng
            }
            
        hoặc
            
            if(Object.hasOwnProperty.call(object, key)){
                // key riêng của đối tượng
            }
*/

// --REDUCE
// Add a method to constructor Array - Thêm phương thức cho hàm tạo Array
Array.prototype.reduce2 = function (callbackFn, result) {
    // Vì initial value cũng là giá trị trả về cuối cùng nên đặt thành result
    // Trường hợp không nhập giá trị khởi tạo => result = giá trị của phần tử đầu tiên và lặp từ vòng thứ 2
    let i = 0
    if (arguments.length < 2) {
        i = 1
        result = this[0]
    }

    // Vòng lặp - gọi lại hàm callback
    for (; i < this.length; i++) {
        // this == mảng đang dùng method này
        result = callbackFn(result, this[i], i, this)
    }

    return result
}

let numbers = [1, 2, 3, 4, 5, 6]

let resultNumber = numbers.reduce2(function (total, number) {
    return total + number
}, 0)

// --MAP
Array.prototype.map2 = function (callBackFn) {
    const output = []

    for (const index in this) {
        if (this.hasOwnProperty(index)) {
            let result = callBackFn(this[index], index, this)
            if (result != null) {
                output.push(result)
            }
        }
    }

    return output
}

let points = [100, 20, 40, 50, 0, -10]

points.length = 1000

let resultPoint = points.map2(function (point) {
    return point > 20 ? point : null
})
console.log(resultPoint) // [100, 20, 50]

// --FOREACH
Array.prototype.forEach2 = function (callBackFn) {

    for (const index in this) {
        // Vì không chỉ lặp qua các thuộc tính của đối tượng, for/in còn lặp qua các thuộc tính tự khởi tạo của prototype
        // Cho nên cần phải kiểm tra thuộc tính đó có phải của mảng hay thuộc prototype của mảng
        if (this.hasOwnProperty(index)) {
            callBackFn(this[index], index, this)
        }
    }

}

points.forEach2(function (point, index) {
    console.log(index, point)
})

// --FILTER
Array.prototype.filter2 = function (callBackFn) {
    const output = []

    for (let index in this) {
        if (Object.hasOwnProperty.call(this, index)) {
            console.log(index)
            let result = callBackFn(this[index], index, this)
            if (result != null && result) {
                output.push(this[index])
            }
        }
        // if (this.hasOwnProperty(index)) {
        // }
    }

    return output
}

let newPoints = points.filter2(function (point, index) {
    return point > 0
})

console.log(newPoints) // [100, 20, 40, 50]

// --FIND
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

Array.prototype.find2 = function (callBackFn) {
    let output;
    for (const index in this) {
        if (this.hasOwnProperty(index)) {
            let result = callBackFn(this[index], index, this)
            if (result != null && result) {
                output = result
                break
            }
        }
    }

    return output
}

let resultTopic = topics.find2(function (topic, index) {
    return topic.courses
})

// --SOME
Array.prototype.some2 = function (callBackFn) {
    let output = false

    for (const index in this) {
        if (this.hasOwnProperty(index)) {
            let result = callBackFn(this[index], index, this)
            if (result != null && result) {
                output = true
                break
            }
        }
    }

    return output
}

let isPositive = points.some2(function (point, index) {
    return point > 0
})

// --EVERY
Array.prototype.every2 = function (callBackFn) {
    let output = true 

    for (const index in this) {
        if (this.hasOwnProperty(index)) {
            let result = callBackFn(this[index], index, this)
            if (result != null && !result) {
                output = false
                break
            }
        }
    }

    return output
}

let isPositive = points.every2(function (point, index) {
    return point > 0
})
