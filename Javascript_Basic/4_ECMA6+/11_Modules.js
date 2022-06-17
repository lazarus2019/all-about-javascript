// https://www.youtube.com/watch?v=uXTKldAHx_U

/*
    Modules: Import / Export

    Khái niệm: Một module là một tập hợp, một gói, một packet, chứa data - ví dụ các biến lưu giữ state,..., các hàm (function hoặc method) lấy dữ liệu, thao tác, thay đổi giá trị, các biến state đó nhằm phục vụ một chức năng nhất định. Để dễ hình dung thì các library, npm package ta dùng hằng ngày nhìn chung chính là các module.

    Cơ bản một web app tổng thể sẽ có nhiều thành phần, nhiều chức năng kết hợp lại với nhau. Mỗi chức năng, thành phần riêng biệt đó thường sẽ được xem là mỗi module khác nhau.

    Tính chất: có tính stateful - nghĩa là nó lưu giữ, duy trì một số data, object instance,... xuyên suốt quá trình khởi tạo và sử dụng module đó. Kèm theo đó là các function, method dùng để access, update các data, object instance (hay còn có thể gọi là state information) kia.

    Đặc điểm:
        - Độc lập/khép kín: Phải tách rời các thành phần phụ thuộc
        - Cụ thể: Module phải có khả năng thực hiện 1 hoặc nhiều nhiệm vụ riêng biệt
        - Tái sử dụng: Dễ dàng tích hợp với nhiều chương trình khác để thực hiện nhiệm vụ của nó
        - Đối tượng: Hàm, đối tượng(object), biến, lớp

    Bằng cách tách các chức năng liên quan thành 1 file riêng để dễ dàng quản lý, sửa đổi hoặc tái sử dụng nhiều lần
    => Chương trình chính sẽ gọn gàng, tối giản hơn vì chỉ cần gọi các phần phụ thuộc khi cần thiết

    Lợi ích:
        - Dễ bảo trì
        - Phân chia không gian tên: các namespace không bị ảnh hưởng tới nhau
        - Tái sử dụng

    Keywords:
        - Export: Xuất đối tượng muốn truy cập ở những file khác
            + Cú pháp export:
                = Để ở cuối file: export {fncName, fncName2, variable1, variable2}
                = Để trước phần định nghĩa đối tượng: export const a = 10 | export function fncName(){}
        - Default: Đặt chức năng mặc định cho đối tượng được xuất (duy nhất 1 keyword default)
            + Cú pháp export: Đặt ngay sau keyword export
            + Cú pháp import: Gọi chức năng mặc định theo tên không cần dấu {}
        - Import: Tải đối tượng từ module khác để sử dụng (sử dụng tên của đối tượng bên trong dấu {}) (import { capitalize, fncName } from './main.js';)
        - As: Dùng để định nghĩa lại tên đối tượng trong phần import (import { capitalize as newName } from './main.js';)
        - *: Tải tất cả các đối tượng công khai từ một module khác (import * as main.jsfunctions from './main.js';)

    Chú ý:
        - Thêm file module trong html <script type="module" src="./duong_dan_file"></script>
        - module import liên kết không thể thay đổi giá trị của biến, hàm, class
        - module export có thể thay đổi các giá trị biến, hàm, class
*/

//// Từ khóa export
function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

function roundToDecimalPlace(number, decimalPlaces = 2) {
    const round = getPower(decimalPlaces);
    return Math.round(number * round) / round;
}

// Export hàng loạt các đối tượng (đặt ở cuối file)
export { capitalize, roundToDecimalPlace };

// Export cho từng đối tượng
export function getPower(decimalPlaces) {
    return 10 ** decimalPlaces;
}

//// Từ khóa Default: Đặt mặc định cho đối tượng có thể sẽ sử dụng nhiều lần
// Set default vào ngay đối tượng
export default function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1);
}

// Set default vào cuối file
export default { capitalize }

//// Từ khóa import
// [Đặt trong dấu {}] Sử dụng tên của đối tượng để lấy ra các đối tượng/chức năng cần thiết
import { capitalize, roundToDecimalPlace } from './main.js';

// Định nghĩa lại tên đối tượng bằng từ khóa AS
import { capitalize as newFuncName, roundToDecimalPlace as newFuncName2 } from './main.js';

// Định nghĩa tất cả đối tượng bằng *
import * as allStuffs from './main.js'

// Định nghĩa đối tượng default từ export (không cần sử dụng ngoặc {})
import defaultValue from './main.js'