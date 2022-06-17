/*
    Default parameter value - Giá trị mặc định của tham số

    - Chỉ lấy giá trị mặc định khi tham số truyền vào là undefined
*/

function logger(message = 'Default message'){
    console.log(message)
}

logger() // 'Default message'
logger('Error message') // 'Error message'

// VD khác

function showConsole(message, type = 'log'){
    console[type](message)
}

showConsole('This is message') // 'This is message'
showConsole('Error message', 'error') // error: 'Error message'