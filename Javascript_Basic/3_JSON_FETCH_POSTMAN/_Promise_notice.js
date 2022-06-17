// https://ehkoo.com/bai-viet/tat-tan-tat-ve-promise-va-async-await#ph%C3%A2n-bi%E1%BB%87t-thenresolve-reject-v%C3%A0-thenresolvecatchreject | https://viblo.asia/p/nhung-dieu-can-biet-ve-promise-javascript-bJzKmJwEZ9N

/*
    NHỮNG (8) ĐIỂM CẦN CHÚ Ý KHI DÙNG PROMISE

    1. Khác biệt của 2 cách sử dụng Resolve/Reject trong Promise
    2. Cẩn thận với this khi dùng tham chiếu hàm
    3. Luôn đưa vào .then() một hàm
    4. Phân biệt .then(resolve, reject) và .then(resolve).catch(reject)
    5. Cẩn thận nha, Promise không lazy
    6. Catch error và callback error của then
    7. Cẩn thận với return không tường minh
    8. Micro-Task Queue (ES8 term)
    9. Luôn truyền một function vào trong .then()
*/

// 1. Khác biệt của 2 cách sử dụng Resolve/Reject trong Promise
function stepOne(arg) {
  if (arg === 1) {
    return Promise.resolve('Done step one!');
  } else {
    return Promise.reject('Params invalid');
  }
}

function exec(arg) {
  return new Promise(function (resolve, reject) {
    stepOne(arg)
      .then(function (stepOneMessage) {
        if (stepOneMessage !== 'Done step one!') {
          return Promise.reject('Result not match');
        } else {
          return Promise.resolve('Done step two');
        }
      })
      .then(function (stepTwoMessage) {
        if (stepTwoMessage === 'Done step two') {
          return resolve('Process complete');
        } else {
          return Promise.reject('Process failed');
        }
      })
      .catch(function (error) {
        console.log(error)
        reject('Exec error');
      });
  });
}

exec(12).then((data) => console.log(data)) // Params invalid | Uncaught (in promise) Exec error 
exec(1).then((data) => console.log(data)) // Process complete


// 2. Cẩn thận với this khi dùng tham chiếu hàm
// Giả sử bạn có đoạn code sau:
const add2 = (x) => x + 2

Promise.resolve(4).then((result) => add2(result))
// Hàm onSuccess không làm gì khác ngoài việc chuyển result vào cho add2, nên bạn có thể dùng tham chiếu hàm để đoạn code trên gọn hơn.

Promise.resolve(4).then(add2)
// Bạn có thể nghĩ, vậy với phương thức của một đối tượng, ta cũng có thể đưa tham chiếu hàm vào .then()?
class User {
  constructor(user) {
    this.user = user
  }

  getUsername() {
    return this.user.username
  }
}

const u = new User({ username: 'pikalong' })
Promise.resolve().then(u.getUsername).then(console.log);
// Nhưng bạn lại nhận được lỗi sau:
// Unhandled rejection:[TypeError: Cannot read property ‘user’ of undefined]

// Lý do là vì khi trong strict mode, biến ngữ cảnh this chỉ được xác định khi trực tiếp gọi phương thức của đối tượng đó, hoặc thông qua .bind(). Bạn có thể xem giải thích chi tiết hơn ở đây.

// Để giải quyết lỗi này, bạn có thể dùng một trong những cách sau:
Promise.resolve().then(() => u.getUsername())

// hoặc
Promise.resolve().then(u.getUsername.bind(u))

// hoặc dùng hàm mũi tên khi khai báo phương thức trong class (cần plugin
// `transform-class-properties` của Babel)
class User {
  // ...
  getUsername = () => {
    return this.user.username
  }
}

// 3. Luôn đưa vào .then() một hàm
// - Bạn thử đoán xem đoạn code sau sẽ in ra gì?

Promise.resolve(1).then(2).then(console.log)
// - Câu trả lời là 1 đó. Phương thức .then đòi hỏi tham số của nó phải là một hàm. Nếu bạn đưa vào .then() một giá trị, nó sẽ bị bỏ qua, giải thích tại sao đoạn code trên hiển thị 1. Trường hợp tương tự:

Promise.resolve(1).then(Promise.resolve(2)).then(console.log) // 1
// - Cách giải quyết:

Promise.resolve(1)
  .then(() => 2)
  // hoặc như thế này, mặc dù hơi dư thừa
  .then(() => Promise.resolve(2))
  .then(console.log) // 2
// - Chúng ta sẽ được kết quả như ý.

// 4. Phân biệt .then(resolve, reject) và .then(resolve).catch(reject)
// - Hàm reject trong .then(resolve, reject) chỉ có thể chụp được lỗi từ những .then() phía trước nó, mà không thể bắt được lỗi xảy ra trong hàm resolve cùng cấp.

api.getUser('pikalong').then(
  (user) => {
    throw new Error('Lỗi rồi bạn ei')
  },
  (err) => {
    /* Không có gì ở đây cả */
  },
)

api
  .getUser('pikalong')
  .then((user) => {
    throw new Error('Lỗi rồi bạn ei')
  })
  .catch((err) => console.log(err)) // Chụp được rồi bạn ei
// - Lưu ý là promise sẽ dừng quá trình thực thi khi bắt được lỗi

Promise.resolve()
  .then(() => {
    throw 'foo'
  })
  .then(
    () => {
      throw 'bar'
    },
    (err) => {
      console.error('here', err)
    },
  )
  .catch((err) => console.error('final', err))

// console:
// "here foo"

// 5. Cẩn thận nha, Promise không lazy
// Promise thực thi ngay khi định nghĩa trực tiếp bằng 1 biến => bọc trong function và return về Promise đó
// - Với đoạn code sau:
console.log('before')
const promise = new Promise(function fn(resolve, reject) {
  console.log('hello')
  // ...
})
console.log('after')
// - Kết quả được in ra console lần lượt sẽ là:

// before
// hello
// after
// - Bạn có thể thấy hàm executor của Promise được thực thi ngay lập tức. 
// - Điều này có thể dẫn đến những kết quả không mong muốn, chẳng hạn như:

const getUsers = new Promise((resolve, reject) => {
  return http.get(`/api`, (err, result) =>
    err ? reject(err) : resolve(result),
  )
})

button.onclick = (e) => getUsers
// - Cách giải quyết là đưa vào một hàm trả về promise.

const getUsers = () =>
  new Promise((resolve, reject) => {
    return http.get(`/api`, (err, result) =>
      err ? reject(err) : resolve(result),
    )
  })

button.onclick = (e) => getUsers()

// 6. Catch error và callback error của then
// - Callback lỗi không bắt được lỗi khi khối promise resolved và trong callback của then có throw Error
const resolvePromise = new Promise((resolve, reject) => {
  resolve('OK')
})

const rejectPromise = new Promise((resolve, reject) => {
  reject('Error')
})

rejectPromise
  .then(() => {
    throw new Error('Oh no')
  })
  .catch(err => {
    console.log('rejectPromise, Catch lỗi', err)
  })

rejectPromise
  .then(() => {
    throw new Error('Oh no')
  }, err => {
    console.log('rejectPromise, Callback lỗi', err)
  })

resolvePromise
  .then(() => {
    throw new Error('Oh no')
  })
  .catch(err => {
    console.log('resolvePromise, Catch lỗi', err)
  })

resolvePromise
  .then(() => {
    throw new Error('Oh no')
  }, err => {
    console.log('resolvePromise, Callback lỗi', err)
  })
  .catch(err => {
    // Hàm này không chạy vì đã bắt được lỗi từ reject ở trên, và sẽ dừng thực thi tiếp ngay lúc đó
    console.log(err)
  })

// rejectPromise, Callback lỗi Error
// rejectPromise, Catch lỗi Error
// resolvePromise, Catch lỗi Error: Oh no

// 7. Cẩn thận với return không tường minh
// - Xét hai đoạn mã sau:
api
  .getUser('pikalong')
  .then((user) => {
    return api.getPostsByUser(user)
  })
  .then(console.log) // posts

api
  .getUser('pikalong')
  .then((user) => {
    api.getPostsByUser(user)
  })
  .then(console.log) // undefined
// - Đoạn mã thứ hai trả về undefined vì trong JavaScript nếu một hàm không công khai trả về một giá trị, undefined mặc định sẽ được trả về (nguồn).
// - Do đó, bạn cần lưu ý về giá trị return khi làm việc với Promise.

// 8. Micro-Task Queue (ES8 term)

// 9. Luôn truyền một function vào trong .then()
Promise.resolve('foo').then(Promise.resolve('bar')).then(function (result) {
  console.log(result); // foo
});
// Kết quả in ra là 'foo', vì không truyền bất kỳ hàm nào vào then (như ví dụ trên là một Promise) nên then sẽ tự động hiểu là then(null) => cho nên tham số của phương thức then tiếp theo sẽ là kết quả của Promise đầu tiên

Promise.resolve('foo').then(null).then(function (result) {
  console.log(result); // foo
});

// Vậy để có được kết quả mong muốn, hãy truyền vào then một function
Promise.resolve('foo').then(function () {
  return Promise.resolve('bar');
}).then(function (result) {
  console.log(result);
});