// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

/*
    FETCH: Nhận vào tham số là 1 URL => trả về 1 Promise

    Front-end: Xây dựng giao diện người dùng
    Back-end: Xây dựng logic xử lý + cơ sở dữ liệu

    API Server(Fake) / Mock API

    fetch(url, {options})

    Các thuộc tính tùy chỉnh (options) trong của request FETCH:
        - method: *GET, POST, PUT, DELETE, etc.
        - mode: no-cors, *cors, same-origin
        - cache: *default, no-cache, reload, force-cache, only-if-cached
        - credentials: include, *same-origin, omit
        - headers:
            + 'Content-Type': application/json, application/x-www-form-urlencoded
                [mode: "no-cors"]: application/x-www-form-urlencoded, multipart/form-data, or text/plain
        - redirect: manual, *follow, error
        - referrerPolicy: no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        - body: JSON.stringify(data)

    #Note: với dữ liệu truyền đi thì phải bổ sung Content-type phù hợp với dữ liệu đó
            (VD: truyền json thì phải dùng Content-type: 'application/json')
*/

// API: Cổng giao tiếp giữa các PM
// Backend -> API(URL) -> Fetch -> JSON/XML -> JSON.parse -> Javascript types -> Render ra giao diện HTML

// Ví dụ phương thức POST đầy đủ
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // chuyển đổi kết quả JSON sang dạng đối tượng trong Javascript
}

postData('https://example.com/answer', { answer: 42 })
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });

// Ví dụ về API lấy danh sách posts từ jsonplaceholder
let postAPI = 'https://jsonplaceholder.typicode.com/posts'

fetch(postAPI)
    .then(function (response) {
        return response.json()
        // JSON.parse: JSON -> Javascript types
    })
    .then(function (posts) {
        let htmls = posts.map(function (post) {
            return `<li>
                        <h2>${post.title}</h2>
                        <p>${post.body}</p>
                    </li>`
        })

        document.querySelector('.posts-box').innerHTML = htmls.join('')
    })
    .catch(function (error) {
        console.error(error)
    })

// Áp dụng Fetch để lấy dữ liệu từ JSON server
let courseAPI = 'http://localhost:3000/courses'

fetch(courseAPI)
    .then(function (response) {
        return response.json()
    })
    .then(function (courses) {
        console.log(courses)
    })

// Gửi yêu cầu bao gồm credentials
/*
    Access-Control-Allow-Origin

    include: Yêu cầu có thông tin xác thực gồm trên cả 2 lệnh gọi cùng nguồn gốc vào chéo (dùng để yêu cầu gửi cookie)
    same-origin: Gửi thông tin đăng nhập nếu URL yêu cầu có cùng nguồn gốc với tập lệnh gọi
    omit: không bao gồm thông tin đăng nhập trong yêu cầu
*/

//// Đăng tải JSON - file - multi files thông qua FETCH
// Đăng tải JSON
const data = { username: 'example' };

fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

// Đăng tải file (sử dụng thẻ input:file, FormData() và fetch())
const formData = new FormData();
const fileField = document.querySelector('input[type="file"]');

formData.append('username', 'abc123');
formData.append('avatar', fileField.files[0]);

fetch('https://example.com/profile/avatar', {
    method: 'PUT',
    body: formData
})
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Đăng tải nhiều file (sử dụng thẻ input:file với attribute multiple, FormData() và fetch())
const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');

formData.append('title', 'My Vegas Vacation');
for (let i = 0; i < photos.files.length; i++) {
    formData.append(`photos_${i}`, photos.files[i]);
}

fetch('https://example.com/posts', {
    method: 'POST',
    body: formData,
})
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });