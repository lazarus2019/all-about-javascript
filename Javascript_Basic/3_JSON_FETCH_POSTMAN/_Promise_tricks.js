// https://ehkoo.com/bai-viet/tat-tan-tat-ve-promise-va-async-await#ph%C3%A2n-bi%E1%BB%87t-thenresolve-reject-v%C3%A0-thenresolvecatchreject | https://viblo.asia/p/nhung-dieu-can-biet-ve-promise-javascript-bJzKmJwEZ9N

/*
    MỘT VÀI THỦ THUẬT KHI SỬ DỤNG PROMISE

    1. Chạy các Promise tuần tự
    2. Truyền dữ liệu giữa các promises với nhau
    3. Truyền Error tree chi tiết trong Promise (reject(new Error('message')))
*/

// 1. Chạy các Promise tuần tự.
// - Trong trường hợp muốn chạy các promises một cách tuần tự như sơ đồ ở trên, bạn có thể dùng hàm Array.prototype.reduce .

;[promise1, promise2, promise3].reduce(function (currentPromise, promise) {
  return currentPromise.then(promise)
}, Promise.resolve())

// Đoạn ở trên khi được viết dài dòng ra
Promise.resolve().then(promise1).then(promise2).then(promise3)
// - Async/await mang đến giải pháp “xinh đẹp” hơn, cho phép bạn truy xuất đến giá trị của các promises phía trước nếu cần thiết.

async function a() {
  const res1 = await promise1()
  const res2 = await promise2(res1)
  const res3 = await promise3(res2)
}

// 2. Truyền dữ liệu giữa các promises với nhau
// - Một trong những điểm hạn chế của Promise là không có cơ chế mặc định để bạn truyền dữ liệu giữa các promise objects với nhau. Nghĩa là:

api
  .getUser('pikalong')
  .then((user) => api.getPostsByUser(user))
  .then((posts) => {
    // Muốn sử dụng biến user ở trên thì làm sao đây?
  })
// - Một cách là dùng Promise.all().

api
  .getUser('pikalong')
  .then((user) => Promise.all([user, api.getPostsByUser(user)]))
  .then((results) => {
    // Dùng kỹ thuật phân rã biến trong ES6. Bạn lưu ý chúng ta dùng 1 dấu , để
    // tách ra phần tử thứ hai của mảng mà thôi
    const [, posts] = results

    // Lại tiếp tục truyền dữ liệu bao gồm [user, posts, comments] xuống promise sau
    return Promise.all([...results, api.getCommentsOfPosts(posts)])
  })
// - Hoặc, nếu bạn cảm thấy phân tách mảng khó dùng vì phải nhớ thứ tự của các giá trị thì ta có thể dùng object như sau:

api
  .getUser('pikalong')
  .then((user) => api.getPostsByUser(user).then((posts) => ({ user, posts })))
  .then((results) =>
    api
      .getCommentsOfPosts(results.posts)
      .then((comments) => ({ ...results, comments })),
  )
  .then(console.log) // { users, posts, comments }
// - Lại một lần nữa, async/await lại tỏa sáng vì giúp bạn truy xuất đến kết quả của những promises phía trước.

async function a() {
  const user = await api.getUser('pikalong')
  const posts = await api.getPostsOfUser(user)
  const comments = await api.getCommentsOfPosts(posts)
}

//  3. Truyền Error tree chi tiết trong Promise (reject(new Error('message')))
const p = new Promise((resolve, reject) => {
  reject(new Error('promise failed!'));
});
p.catch(err => {
  console.log(err);
});

// Error: promise failed!
//     at :4:9
//     at new Promise ()
//     at :2:11
//     at render (tryit.php:202)
//     at tryit.php:170
//     at dispatch (jquery.js:4435)
//     at r.handle (jquery.js:4121)