/*
    Một vài (20) phương thức (methods) của object:
*/

//// 1. Object.assign: Sao chép thuộc tính có thể đếm được và sở hữu từ một đối tượng nguồn sang một đối tượng đích
// Cloning an object
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }

// Merging objects with same properties
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };

var obj = Object.assign({}, o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }

//// 2. Object.create: Tạo một đối tượng mới với các thuộc tính và đối tượng nguyên mẫu được chỉ định.
const a = {
    x: 1,
    add_numbers: function () {
        var added_number = this.x + this.y;
        console.log(added_number);
    }
};

const b = Object.create(a);

b.y = 2;

b.add_numbers(); // output: 3

//// 3. Object.keys: Trả về một mảng các tên thuộc tính riêng của đối tượng đã cho.
const object1 = {
    a: 1,
    b: 2,
    c: 3
};

console.log(Object.keys(object1));
// output: Array ["a", "b", "c"]

//// 4. Object.values: Trả về một mảng các giá trị.
const object1 = {
    a: 1,
    b: 2,
    c: 3
};

console.log(Object.values(object1));
// output: Array [1, 2, 3]

//// 5. Object.entries: Trả về một mảng với các mảng của các tên thuộc tính, giá trị.
const obj = { foo: 'bar', baz: 1988 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 1988] ]​

const object1 = {
    a: 'somestring',
    b: 42
};

for (let [key, value] of Object.entries(object1)) {
    console.log(key + ': ' + value);
}

// expected output:
// "a: somestring"
// "b: 42"

//// 6. Object.preventExtensions: Ngăn chặn mọi phần mở rộng của một đối tượng.
const object1 = {};

Object.preventExtensions(object1);

try {
    Object.defineProperty(object1, 'property1', {
        value: 42
    });
} catch (e) {
    console.log(e);
    // expected output: TypeError: Cannot define property property1, object is not extensible
}

//// 7. Object.defineProperty: Tạo mới, khai báo hay xác định thuộc tính của object
const object1 = {};

Object.defineProperty(object1, 'property1', {
    value: 42,
    writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42

//// 8. Object.defineProperties: Tạo mới hay khai báo nhiều thuộc tính của object
const object1 = {};

Object.defineProperties(object1, {
    property1: {
        value: 42,
        writable: true
    },
    property2: {}
});

console.log(object1.property1);
// expected output: 42


//// 9. Object.getOwnPropertyNames: Trả về một mảng của tất cả các thuộc tính (liệt kê hoặc không) được tìm thấy.
const object1 = {
    a: 1,
    b: 2,
    c: 3
};

console.log(Object.getOwnPropertyNames(object1));
// expected output: Array ["a", "b", "c"]

//// 10. Object.freeze: Ngăn chặn các thuộc tính hiện có bị loại bỏ.
const obj = {
    prop: 42
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// expected output: 42

//// 11. Object.isExtensible: Xác định nếu một đối tượng có thể mở rộng
const object1 = {};

console.log(Object.isExtensible(object1));
// expected output: true

Object.preventExtensions(object1);

console.log(Object.isExtensible(object1));
// expected output: false


//// 12. Object.is: Xác định xem hai giá trị có cùng giá trị hay không
// Case 1: Evaluation result is the same as using ===
Object.is(25, 25);                // true
Object.is('foo', 'foo');          // true
Object.is('foo', 'bar');          // false
Object.is(null, null);            // true
Object.is(undefined, undefined);  // true
Object.is(window, window);        // true
Object.is([], []);                // false
const foo = { a: 1 };
const bar = { a: 1 };
Object.is(foo, foo);              // true
Object.is(foo, bar);              // false

// Case 2: Signed zero
Object.is(0, -0);                 // false
Object.is(+0, -0);                // false
Object.is(-0, -0);                // true
Object.is(0n, -0n);               // true
https://www.youtube.com/watch?v=HhpbzPMCKDc&t=1011s
// Case 3: NaN
Object.is(NaN, 0 / 0);              // true
Object.is(NaN, Number.NaN)        // true


//--Các phương thức khác của object
//// Object.getOwnPropertyDescriptor: Trả về một mô tả thuộc tính cho thuộc tính được chỉ định của đối tượng được chỉ định.
//// Object.getOwnPropertyDescriptors: Trả về tất cả các mô tả thuộc tính riêng của một đối tượng nhất định.
//// Object.getOwnPropertySymbols: Trả về một mảng của tất cả các thuộc tính khóa ký hiệu riêng.
//// Object.getPrototypeOf: Trả về nguyên mẫu của đối tượng đã chỉ định.
//// Object.isFrozen: Xác định nếu một đối tượng đã bị đóng băng.
//// Object.isSealed: Xác định nếu một đối tượng được niêm phong.
//// Object.seal: Ngăn các thuộc tính mới được thêm vào và đánh dấu tất cả các thuộc tính hiện có là không thể cấu hình.
//// Object.setPrototypeOf: Đặt nguyên mẫu của một đối tượng được chỉ định cho một đối tượng khác.
