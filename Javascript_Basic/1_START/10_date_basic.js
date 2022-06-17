// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

/*
    ĐỐI TƯỢNG DATE TRONG JAVASCRIPT
    1. Cách tạo?
        4 cách tạo đối tượng Date:
        - new Date()
        - new Date(year, month, day, hours, minutes, seconds, milliseconds)
        - new Date(milliseconds)
        - new Date(date string)
            + ISO Date: YYYY-MM-DDTHH:MM:SSZ (2015-03-25T12:00:00Z, 2015-03-25T12:00:00-06:30)
            + Short Date: MM/DD/YYYY (03/25/2015)
            + Long Date: "MMM DD YYYY" or "DD MMM YYYY" (Mar 25 2015, 25 Mar 2015, January 25 2015)
        #Note: month[0-11], hours[0-23]
            - Nếu lớn hơn giá trị mặc định thì sẽ được cộng dồn
*/

new Date()
new Date(2020, 10, 11, 8, 6, 20, 10)
new Date(86400000)
new Date('October 13, 2014 11:13:00')

new Date().valueOf() // 1652857395055 (số millisecond kể từ 1/1/1970)

// Hiển thị ngày bằng chuỗi
new Date().toTimeString()       // '12:31:56 GMT+0700 (Indochina Time)'
new Date().toString()           // 'Wed May 18 2022 12:32:16 GMT+0700 (Indochina Time)'
new Date().toISOString()        // '2022-05-18T05:32:46.933Z'
new Date().toUTCString()        // 'Wed, 18 May 2022 05:34:14 GMT'
new Date().toLocaleDateString() // '5/18/2022'
new Date().toLocaleTimeString() // '12:35:06 PM'
new Date().toLocaleString()     // '5/18/2022, 12:36:57 PM'
new Date().toDateString()       // 'Wed May 18 2022'
new Date().toJSON()             // '2022-05-18T05:36:09.079Z'

/*
    Một (10)vài phương thức(methods) của Date
*/

// --Lấy dữ liệu
new Date().getFullYear()        // 2022
new Date().getMonth()           // 5 [0-11]
new Date().getDate()            // 18
new Date().getHours()           // 12 [0-23]
new Date().getMinutes()         // 44 [0-59]
new Date().getSeconds()         // 59 [0-59]
new Date().getMilliseconds()    // 678 [0-999]
new Date().getDay()             // 3 [0-6] (Lấy ra thứ trong tuần, 0 = sunday, 1 = monday)
new Date().getTime()            // 1652852731501 (số millisecond kể từ 1/1/1970)
new Date().getTimezoneOffset()  // -420 = -7(hours) * 60 (trả về độ lệch múi giờ bằng phút theo vị trí hiện tại)
Date.now()                      // 1652852731501 (tương tự getTime nhưng bỏ qua giây nhuận)

// Tương tự nhưng lấy thông tin của Date theo múi giờ quốc tế
new Date().getUTCDate()
new Date().getUTCDay()
new Date().getUTCFullYear()
new Date().getUTCHours()
new Date().getUTCMilliseconds()
new Date().getUTCMinutes()
new Date().getUTCMonth()
new Date().getUTCSeconds()

// --Gán dữ liệu
new Date().setFullYear(2017)        
new Date().setMonth(5)           
new Date().setDate(10)            
new Date().setHours(11)           
new Date().setMinutes(20)        
new Date().setSeconds(58)         
new Date().setMilliseconds(100)   
let thisYear = new Date()
new Date().setTime(thisYear.getTime()) // Gán thời gian theo millisecond kể từ 1/1/1970

// Tương tự nhưng lấy thông tin của Date theo múi giờ quốc tế
new Date().setUTCDate()
new Date().setUTCDay()
new Date().setUTCFullYear()
new Date().setUTCHours()
new Date().setUTCMilliseconds()
new Date().setUTCMinutes()
new Date().setUTCMonth()
new Date().setUTCSeconds()
