/*
    Local storage: localStorage

    Note: Giá trị của local storage được lưu dưới dạng string, nên nếu muốn chuyển JS types vào thì phải dùng JSON.stringify và lấy ra thì dùng JSON.parse

    Methods:
        - setItem(key, value): Gán giá trị cho key
        - getItem(key): Lấy giá trị từ key
        - removeItem(key): Xóa dữ liệu trong local storage theo key
        - clear(): Xóa toàn bộ dữ liệu storage
        - length(): Lấy ra số lượng local storage đã lưu
        - key(index): Lấy tên key đầu tiên trong local storage với index (Key của dữ liệu được thêm gần nhất tương ứng với index = 0)

    Bonus: Cách lấy kích thước hiện tại của local storage
*/

//// Kiểm tra trình duyệt hỗ trợ local storage
if (typeof (localStorage) !== "undefined") {
    console.info("Trình duyệt của bạn có hỗ trợ Local Storage");
} else {
    console.info("Trình duyệt của bạn không hỗ trợ Local Storage");
}

//// Gán key-value vào local storage
localStorage.setItem("domain", "viblo.asia");

// Một số cách khác
localStorage.domain = "viblo.asia";
localStorage["domain"] = "viblo.asia";

//// Lấy giá trị theo key
const user = localStorage.getItem('user');

// Một số cách khác
const user = localStorage.user;
const user = localStorage['user'];

//// Xóa key trong local storage
// Xóa theo key
localStorage.removeItem('user');

// Xóa tất cả trong local storage
localStorage.clear();

//// Kiểm tra số lượng đã lưu
const length = localStorage.length();

//// Lấy tên key theo index
const key = localStorage.key(0);

// [Bonus] Cách lấy kích thước hiện tại của local storage
var _lsTotal = 0,
    _xLen, _x;
for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) {
        continue;
    }
    _xLen = ((localStorage[_x].length + _x.length) * 2);
    _lsTotal += _xLen;
    console.log(_x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB")
};
console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");