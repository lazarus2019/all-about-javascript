// https://ehkoo.com/bai-viet/tat-tan-tat-ve-promise-va-async-await | NOTE: https://kysumattien.com/javascrip-promise-interesting-things

/*
    PROMISE - ASYNC & AWAIT

    - Đồng bộ (Synchronous - Sync): 1 lần chỉ chạy 1 bước, bước 1 xong thì sang bước 2 
                                    (như các đoạn mã được biên dịch từ trên xuống, trái sang phải) => tạo ra trạng thái chờ
    - Bất đồng bộ (Asynchronous - Async): Có thể nhảy đi và bỏ qua bước nào đó, có thể thực hiện nhiều bước cùng lúc
                                          => chương trình hoạt động không chặt chẽ, không có quy trình nên quản lý rất khó khăn
    Một vài phương thức bất đồng bộ:
        - setTimeout
        - setInterval
        - fetch
        - XMLHttpRequest
        - file reading
        - request animation frame
        ...

    - Pain: Callback hell(Pyramid of doom) là các hàm callback lồng nhau, thường xuất hiện khi hàm sau nhận giá trị từ hàm trước

    Promise:
        Khái niệm: Là 1 cơ chế trong Javascript(ES6-2012) giúp thực thi các tác vụ bất đồng bộ mà không rơi vào callback hell
        Cách tạo: Tạo promise với từ khóa new => có 1 function dùng để execute => thực thi => 2 tham số (resolve-thành công & reject-thất bại)
                  Và khi sử dụng promise thì sử dụng 2 phương thức then(resolve) và catch(reject)              
        Trạng thái: Pending(chờ), Fulfilled(thành công), Rejected(Thất bại)
        Cách thức hoạt động: 
            - Khi promise trả về resolve thì phương thức then sẽ nhận về giá trị từ resolve
            - Phương thức then bao gồm 2 tham số là hàm đại diện cho trạng thái success và error (nếu tham số không phải là hàm => bỏ qua)
            - Phương thức then có thể return về 1 giá trị, promise khác hoặc ném lỗi xuống .then tiếp theo
            - Phương thức then sau đó phải chờ promise trước thực hiện xong thì mới thực hiện
            - Kết quả của phương thức then trước là tham số đầu vào của phương thức then sau

    #Note: Luôn đặt .catch block cuối mỗi Promise chain để xử lý lỗi, nếu không JS engine sẽ lỗi UnhandledPromiseRejectionWarning
        - .then block là cách viết gọn của .then(fulfillmentHandler, null) 
        - .catch block là cách viết gọn của .then(null, rejectionHandle) (VD: .then(null, (err) => {console.log(err)}))
        - khi .then() không truyền rejectionHandle thì mặc định lỗi trong Promise chain sẽ được propagate - lan truyền đến các Promise phía sau trong chuỗi Promise (xãy ra tương tự nếu không truyền fulfillmentHandler)
*/

// Ví dụ Sync & Async
setTimeout(function () {
    console.log(1)
}, 1000) // sleep time

console.log(2)
/*
    Trường hợp này phương thức setTimeout được thực thi trước nhưng được in ra sau
    Kết quả: 2 1
    Có thể thấy, lệnh console trong setTimeout chưa được thực thi nhưng lệnh bên dưới đã được thực thi => Bất đồng bộ
*/

// Promise
let myPromise = new Promise(
    // Executor
    function (resolve, reject) {
        // Logic
        // Thành công: resolve()
        // Thất bại: reject()

        resolve([
            {
                id: 1,
                name: 'Javascript',
                price: 250
            }
        ])
        // reject('Error message')
        // Note: nếu promise không trả 1 trong 2 phương thức trên => memory leak (rò rĩ bộ nhớ, treo)
    }
)

myPromise
    .then(function (courses) {
        // catch from resolve
        // console.log('Successfully!')
        console.log(courses)
    })
    .catch(function (error) {
        // catch from reject
        // console.log('Failure!')
        console.log(error)
    })
// .finally(function () {
//     // always executor
//     console.log('Done!')
// })

// (Trường hợp 1) tham số trong then không phải là 1 hàm thì giá trị đó sẽ bị bỏ qua
let newPromise = new Promise(
    function (resolve, reject) {
        resolve(1)
    }
)
newPromise
    .then(2)
    .then(
        console.log // KQ: 1
    )

// (Trường hơp 2) tương tự
let newPromise = new Promise(
    function (resolve, reject) {
        resolve(1)
    }
)
newPromise
    .then(Promise.resolve(2))
    .then(console.log) // KQ: 1

// Cách giải quyết
newPromise
    .then(() => 2)
    .then(Promise.resolve(2)) // Ở trường hợp 2 thì thêm dòng này
    .then(console.log) // KQ: 2

// Dùng Promise thay thế callback hell thế nào
let promise = new Promise(function (resolve, reject) {
    resolve()
})

promise
    .then(function () {
        // Trả về 1 promise khác
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve([1, 2, 3])
            }, 3000)
        })
    })
    // Lúc này then sẽ chờ kết quả từ Promise phía trên
    .then(function (data) {
        console.log(data)
        return 2
    })
    .then(function (data) {
        console.log(data)
        return 3
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (error) {
        console.log(error)
    })
    .finally(function () {
        console.log('DONE!')
    })

// Ex: Tạo ra 1 chương trình in ra số tăng dần sau 1s

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms, ms)
    })
}

sleep(1000)
    .then(function (data) {
        console.log(data)
        return sleep(1000)
    })
    .then(function (data) {
        console.log(data)
        return sleep(1000)
    })
    .then(function (data) {
        console.log(data)
        return sleep(1000)
    })
    .then(function (data) {
        console.log(data)
        return sleep(1000)
    })

// Example: in ra comments và thông tin người dùng tạo ra comment đó
let comments = [
    {
        id: 1,
        user_id: 1,
        content: '50k views............ OH MY GOD. Thank you so much for all the love on this video :) I\'m currently working on a part 2 of this video, so stay tuned to my channel if you\'d like to see that! ❤️',
        time: '2 years ago'
    },
    {
        id: 2,
        user_id: 2,
        content: 'Twice has something special ... they are so natural ... and each one has a different charisma. It is easy to love them.',
        time: '2 months ago'
    },
    {
        id: 3,
        user_id: 3,
        content: 'i dont care what anyone says, they aren\'t just members of a KPOP group, they are sisters. No one can make me think otherwise. Just look at how they are with each other. They are sisters for life',
        time: '1 months ago'
    },
    {
        id: 4,
        user_id: 4,
        content: 'I cried at “minaya we got three awards”',
        time: '2 weeks ago'
    },
    {
        id: 5,
        user_id: 5,
        content: '"Mina ya, we got three awards~" still makes me cry 😢💖',
        time: '1 year ago'
    },
    {
        id: 6,
        user_id: 6,
        content: 'how dare they criticize our twice for "not looking close to each other" like are you blind?!',
        time: '8 months ago'
    },
]

let users = [
    {
        id: 1,
        name: 'danaonce',
    },
    {
        id: 2,
        name: 'cholitocholito',
    },
    {
        id: 3,
        name: 'Damatovg',
    },
    {
        id: 4,
        name: 'Tomato Bob {•_•}',
    },
    {
        id: 5,
        name: 'Aristheia',
    },
    {
        id: 6,
        name: 'aw lisse',
    },
]

function getComments() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(comments)
        }, 1000)
    })
}

function getUserByIds(userIds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            let result = users.filter(user => {
                return userIds.includes(user.id)
            })
            resolve(result)
        }, 1000)
    })
}

getComments()
    .then(function (comments) {
        let userIds = comments.map((comment) => {
            return comment.user_id
        })

        return getUserByIds(userIds)
            .then(function (users) {
                // Gói thông tin user và comment để truyền xuống then
                return {
                    users: users,
                    comments: comments
                }
            })
    })
    .then(function (data) {
        let htmls = ''
        data.comments.forEach(comment => {
            let user = data.users.find((userInfo) => {
                return userInfo.id === comment.user_id
            })

            htmls += `<li style="margin-bottom: 16px">${user.name}: ${comment.content} (${comment.time})</li>`
        });

        document.querySelector('.comment-box').innerHTML = htmls
    })