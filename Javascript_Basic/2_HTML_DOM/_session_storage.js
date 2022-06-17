/*
    Session storage: sessionStorage
    
    Methods (tương tự local storage):
        - setItem(key, value): Gán giá trị cho key
        - getItem(key): Lấy giá trị từ key
        - removeItem(key): Xóa dữ liệu theo key
        - clear(): Xóa toàn bộ dữ liệu storage
        - length(): Lấy ra số lượng session storage đã lưu
        - key(index): Lấy tên key đầu tiên với index (Key của dữ liệu được thêm gần nhất tương ứng với index = 0)

*/

//// Kiểm tra trình duyệt hỗ trợ local storage
if (typeof(sessionStorage) !== "undefined") {
    console.info("Trình duyệt của bạn có hỗ trợ Session Storage");
} else {
    console.info("Trình duyệt của bạn không hỗ trợ Session Storage");
}
//// Gán key-value vào local storage
sessionStorage.setItem('domain', 'viblo.asia');

// Một số cách khác
sessionStorage.domain = 'viblo.asia';
sessionStorage['domain'] = 'viblo.asia';

//// Lấy giá trị theo key
const domain = sessionStorage.getItem('domain');

// Một số cách khác
const domain = sessionStorage.domain;
const domain = sessionStorage['domain'];

//// Xóa key trong local storage
// Xóa theo key
sessionStorage.removeItem('domain');

// Xóa tất cả trong local storage
sessionStorage.clear();

//// Kiểm tra số lượng đã lưu
const length = sessionStorage.length();

//// Lấy tên key theo index
const key = sessionStorage.key(0); 
// Note: Key của dữ liệu được thêm gần nhất tương ứng với index = 0