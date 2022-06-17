// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch | https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

/*
    CRUD (thường dùng):
        - Create: Tạo mới -> POST
        - Read: Lấy dữ liệu -> GET
        - Update: Chỉnh sửa -> PUT / PATCH
        - Delete: Xóa dữ liệu -> DELETE

    Giao thức: HTTP protocol -> Truyền tải qua internet
    Phương thức: POST, GET, PUT/PATCH, DELETE

    Một vài phương thức khác: 
        - Lấy dữ liệu, không có body chỉ có header -> HEAD
        - Ghi đè các thông tin được thay đổi của đối tượng -> PATCH
        - Thiết lập 1 kết nối với server theo URI -> CONNECT
        - Mô tả các tùy chọn giao tiếp cho resource -> OPTIONS
        - Thực hiện 1 bài test loop-back theo đường dẫn đến resource -> TRACE

    REST (REpresentational State Transfer): 1 dạng chuyển đổi cấu trúc dữ liệu, 1 kiểu viết kiến trúc API. 
    Sử dụng phương thức HTTP để giao tiếp giữa các máy.

    => RESTful API là 1 tiêu chuẩn dùng trong việc thiết kết API cho các ứng dụng web để quản lý các resourse

    Lợi ích:
        - Ứng dụng trong rõ ràng - dễ nhìn
        - Rest URL đại diện cho một resource chứ không phải hành động
        - Nhiều định dạng dữ liệu trả về: JSON, xml, html,..
        - Code đơn giản - ngắn gọn
        - Chú trọng tài nguyên của các hệ thống

    Header: authentication và quy định dữ liệu trả về
    3 cơ chế Authentication chính:
        - HTTP Basic
        - JSON Web Token (JWT)
        - OAuth2

    Các loại content mà client có thể chỉ định trả về từ server-content type (thông qua Accept trong header - MIME type):
        - image - png, jpeg, gif
        - audio - wav, mpeg
        - video - mp4, ogg
        - application - json, pdf, xml, octet-stream
    VD: lấy danh sách bài viết
    GET /v1/posts
    Accept: application/json

    Status code:
        - 200 | OK: GET, PUT, PATCH, DELETE thành công
        - 201 | Created: Resource tạo thành công
        - 204 | No content: Resourse xóa thành công
        - 304 | Not Modified: Client có thể sử dụng dữ liệu cache
        - 400 | Bad request: Request không hợp lệ
        - 401 | Unauthorized: Request cần có auth
        - 403 | Forbidden: Bị từ chối không cho phép
        - 404 | Not found: Không tìm thấy resource từ URI
        - 405 | Method not allowed: Phương thức không cho phép với user hiện tại
        - 410 | Gone: Resource không tồn tại, version cũ không hỗ trợ
        - 415 | Unsupported media type: Không hỗ trợ kiểu resource này
        - 422 | Unprocessable Entity: Dữ liệu không được xác thực
        - 429 | Too many requests: Request bị từ chối do giới hạn
        - 500 | Internal server error: Tình huống máy chủ không xử lý được
        - 502 | Bad gateway: Nhận phản hồi không hợp vệ
        - 504 | Gateway timeout: Không nhận được phản hồi kịp thời

    Một vài quy ước khi dùng REST API:
        - Sử dụng đúng status code, tránh API lỗi và trả về status 2xx nhưng body là error message
        - Trong URI không dùng underscore (_), hãy dùng hyphen (-)
        - URI đều là chữ thường (lowercase)
        - Không dùng đuôi file (extention) trong URI (VD: .html, .xml, .json)    

    Thiết kế REST API mẫu:
        - POST /v1/posts (tạo mới một bài viết)
        - GET /v1/posts (lấy danh sách bài viết)
        - GET /v1/posts/:post_id (lấy chi tiết bài viết với post_id cụ thể)
        - PUT /v1/posts/:post_id (update bài viết với post_id cụ thể)
        - DELETE /posts/:post_id (delete bài viết với post_id cụ thể)
*/

let coursesAPI = 'http://localhost:3000/courses'
const updateBtn = document.querySelector('.update-course-btn')
const createBtn = document.querySelector('.create-course-btn')

function start() {
    // getCourses(function (courses) {
    //     renderCourses(courses)
    // })
    // Kiểu ngắn hơn
    getCourses(renderCourses)

    handleCreateForm()
}

start()

function getCourses(callback) {
    fetch(coursesAPI)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function createCourse(data, callback) {
    let options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    }
    fetch(coursesAPI, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function handleDeleteCourse(id) {
    let options = {
        method: 'DELETE'
    }
    fetch(coursesAPI + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(function () {
            let courseItem = document.querySelector('.course-item-' + id)
            if (courseItem) {
                courseItem.remove()
            }
        })
}

let currentCourseContent = 'Current course: '
function updateCourse(id, data, callback) {
    let options = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch(coursesAPI + '/' + id, options)
        .then(function (response) {
            return response.json()
        })
        .then(callback)
}

function renderCourses(courses) {
    const listCourses = document.querySelector('.courses')

    let htmls = courses.map((course) => {
        return `<li class="course-item-${course.id}" >
                        <h4>${course.name}</h4>
                        <p>${course.description}</p>
                        <button onclick="handleDeleteCourse(${course.id})">Xóa</button>
                        <button onclick="handleUpdateCourse(${course.id})">Chỉnh sửa</button>
                    </li>`
    })

    listCourses.innerHTML = htmls.join('')
}

function handleCreateForm() {
    createBtn.addEventListener('click', () => {
        let name = document.querySelector('input[name="name"]').value
        let description = document.querySelector('input[name="description"]').value
        let formData = {
            name: name,
            description: description
        }
        createCourse(formData, getCourses(renderCourses))
    })
}

function enableUpdate() {
    createBtn.disabled = true
    updateBtn.disabled = false
}

function disableUpdate() {
    createBtn.disabled = false
    updateBtn.disabled = true
}

function updateCurrentCourse(id, data) {
    let currentCourse = document.querySelector('.course-item-' + id)
    if (currentCourse) {
        currentCourse.querySelector('h4').textContent = data.name
        currentCourse.querySelector('p').textContent = data.description
    }
}

function setInputValue(course) {
    let currentCourseSpan = document.querySelector('.current-course')
    currentCourseSpan.textContent = 'Current course: ' + course.name
    document.querySelector('input[name="name"]').value = course.name
    document.querySelector('input[name="description"]').value = course.description

    enableUpdate()
}

function clearInputData() {
    var inputs = document.querySelectorAll('input')
    inputs.forEach(function (input) {
        input.value = ""
    })
}

function handleUpdateCourse(id) {
    let currentCourse
    getCourses(function (courses) {
        currentCourse = courses.find(course => course.id === id)
        setInputValue(currentCourse)
    })

    updateBtn.addEventListener('click', () => {
        let name = document.querySelector('input[name="name"]').value
        let description = document.querySelector('input[name="description"]').value

        let formData = {
            name: name,
            description: description
        }

        updateCourse(id, formData, function () {
            updateCurrentCourse(id, formData)
            clearInputData()
            disableUpdate()
        })
    })
}

// Update course - Another way
function editCourse(courseId, data) {
    var opt = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch(coursesApi + '/' + courseId, opt)
        .then(function (reponse) {
            return reponse.json()
        })
        .then(function (data) {
            console.log('done')
        })
}

function handleEditCourse(courseId) {
    var saveBtn = document.querySelector('.create-course-btn')
    var courseItem = document.querySelector('.course-item-' + courseId)
    var nameCurrent = courseItem.querySelector('h4').innerHTML
    var descCurrent = courseItem.querySelector('p').innerHTML
    saveBtn.innerHTML = 'Save'


    document.querySelector('input[name="name"]').value = nameCurrent
    document.querySelector('input[name="desc"]').value = descCurrent


    saveBtn.onclick = function () {
        var nameEdited = document.querySelector('input[name="name"]').value
        var descEdited = document.querySelector('input[name="desc"]').value

        var formData = {
            name: nameEdited,
            desc: descEdited
        }

        // Request Method: PUT
        editCourse(courseId, formData)

        // Re-render
        var courseItem = document.querySelector('.course-item-' + courseId)
        courseItem.querySelector('h4').innerHTML = formData.name
        courseItem.querySelector('p').innerHTML = formData.desc


        // Clear inputs
        var inputs = document.querySelectorAll('input')
        inputs.forEach(function (input) {
            input.value = ""
        })

        saveBtn.innerHTML = "Create"
    }
}

