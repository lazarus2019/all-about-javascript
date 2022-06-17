/*
    Polyfill

    Là hành động tạo ra các phương thức, hàm để đáp ứng các trình duyệt cũ.
    Giúp trình duyệt cũ có thể chạy hàm, phương thức mà chỉ có những phiên bản trình duyệt mới hỗ trợ.

*/

// VD: phương thức includes của String
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict'

        if (search instanceof RegExp) {
            throw TypeError('first argument must not be a RegExp')
        }

        if (start === undefined) { start = 0 }
        return this.indexOf(search, start) !== -1
    }
}

