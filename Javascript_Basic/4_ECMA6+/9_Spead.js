/*
    Spread - Trải ra

    Nối các object hoặc array thành 1

    Khác với rest là tham số, spread là đối số
*/

/* [Array] Spread */
const array = ['JS', 'ReactJS']
const array2 = ['C#', 'PHP', 'Java']

// Cách gộp array thông thường
let array3 = array.concat(array2) // ['JS', 'ReactJS', 'C#', 'PHP', 'Java']

// Sử dụng spread
let array3 = [...array, ...array2] // ['JS', 'ReactJS', 'C#', 'PHP', 'Java']

/* [Object] Spread */
const object = {
    name: 'JS'
}

const object2 = {
    price: 3000
}

let object3 = { ...object, ...object2 } // {name: 'JS', price: 3000}

// VD: Tạo mới object dựa trên object ban đầu
let defaultSettings = {
    api: 'https://api-default',
    darkMode: false,
    signup: true,
    //
    //
    //
}

let newSetting = {
    ...defaultSettings,
    api: 'https://api-new',
    darkMode: true,
    //
    //
}

//#Note: giá trị của key sẽ được lấy ở key được định nghĩa cuối cùng

const array = ['JS', 'ReactJS', 'C#', 'PHP', 'Java']

function logger(...rest) { // Rest
    for (let i = 0; i < rest.length; i++) {
        console.log(rest[i])
    }
}

logger(...array) // Spread