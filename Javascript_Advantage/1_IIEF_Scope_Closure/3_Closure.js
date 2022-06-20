// https://topdev.vn/blog/javascript-closures-la-gi || https://viblo.asia/p/tim-hieu-closures-trong-javascript-don-gian-nhat-Ljy5Vp2zZra

/*
    Closure - Là 1 hàm được tạo bên trong một hàm khác

    Tính chất:
        - Tham chiếu đến các biến độc lập (Free variables) của hàm bên ngoài
        - Nhớ môi trường được tạo ra
        - Truy xuất được các biến cục bộ của mình và bên ngoài phạm vi của nó
        - Mỗi closure sẽ tạo ra những phạm vi (scope) khác nhau

    Free variable: Biến không được khai báo local hay được truyền qua tham số (parameter)

    ##Ứng dụng
    - Viết code ngắn gọn hơn
    - Biển diễn, ứng dụng tính Private trong OOP

    ##Lưu ý
    - Biến được tham chiếu (refer) trong closure sẽ không được xóa khỏi bộ nhớ khi hàm cha thực thi xong
    - Trường hợp function closure được khai báo trước biến cần tham chiếu thì vẫn truy xuất được biến đó (CHỈ TRONG FUNCTION CHA)
    - Con trỏ this trong closure: chạy chế độ strict mode => this == undefined, không thì là đối tượng window

    ##Closure và Prototype (so sánh tốc độ)
        - Định nghĩa đối tượng: Closure
        - Khả năng tiết kiệm bộ nhớ và khởi tạo đối tượng mới: Prototype
        - Truy cập hàm (getter, setter): Prototype

    ##Note: SỰ CỐ KHI DÙNG CLOSURE VỚI VÒNG LẶP FOR
*/

function createCounter() {
    // Free variable
    let counter = 0

    function increase() {
        // Hàm increase sẽ tạo ra một tham chiếu của biến counter ra bên ngoài
        return ++counter
    }

    return increase // Closure
}

const counter1 = createCounter()
// counter1 hiện là đại diện cho hàm increase được createCounter return bên trong

console.log(counter1()) // 1
console.log(counter1()) // 2
console.log(counter1()) // 3
console.log(counter1()) // 4

const counter2 = createCounter()
console.log(counter2()) // 1
console.log(counter2()) // 2
console.log(counter2()) // 3
console.log(counter2()) // 4
//=> Có thể thấy, phạm vi và biến của counter2 không liên quan đến counter1

// Ví dụ 1
function createStorage(key) {
    // Biến store không được return => biến private
    const store = JSON.parse(localStorage.getItem(key)) ?? {} // Nếu trước ?? là null hoặc undefined thì lấy giá trị phía sau ??

    // Hàm này là private
    const save = () => {
        localStorage.setItem(key, JSON.stringify(store))
    }

    const storage = {
        get(key) {
            return store[key]
        },
        set(key, value) {
            store[key] = value
            save()
        },
        remove(key) {
            delete store[key]
            save()
        }
        // Cả 3 functions trên đều có thể truy cập biến store bên ngoài phạm vi cha
        // 3 functions được public ra ngoài
    }

    return storage // Closure
}

// Profile.js
const profileSetting = createStorage('profile_setting')
console.log(profileSetting.get('fullname')) // undefined

profileSetting.set('fullName', 'Krix Dan')
console.log(profileSetting.get('fullname')) // 'Krix Dan'

profileSetting.remove('fullName')
console.log(profileSetting.get('fullname')) // undefined

//// Con trỏ this trong closure
// Chế độ bình thường
function sayHi() {
    return function () {
        console.log(this);
    };
}

var msg = sayHi();
msg(); // window object

// Chế độ strict mode
'use strict';
function sayHi() {
    return function () {
        console.log(this);
    };
}

var msg = sayHi();
msg(); // Undefined

//// Closure trong class JS
class Student {
    constructor(name) {
        this.name = name;
    }

    showName() {
        // Bản chất của closure là không lấy được this của đối tượng class
        // Nên muốn truy cập các thuộc tính của class thì => Đặt một cái tên khác cho this
        let obj = this;
        return function () {
            console.log("Xin chào, tôi là " + obj.name);
        };
    }
}

var student1 = new Student("Cường");
var cuong = student1.showName();

cuong(); // 'Xin chào, tôi là Cường'

//// So sánh Closure và Prototype
// Sử dụng Closure
function ObjId() {
    var id = 1;
    return {
        getId: function () {
            return id;
        },
        setId: function (_id) {
            id = _id;
        }
    }
}

var myObject = ObjId();
console.log(myObject.getId());  // => 1
myObject.setId(10);
console.log(myObject.getId());  // => 10

// Sử dụng prototype
function ObjId() {
    this.id = 1;
}

ObjId.prototype.getId = function () {
    return this.id;
};

ObjId.prototype.setId = function (_id) {
    this.id = _id;
};

var myObject = new ObjId();
console.log(myObject.getId());  // => 1
myObject.setId(10);
console.log(myObject.getId());  // => 10

//=> Kết quả của closure và prototype trả về đều như nhau

//// SỰ CỐ KHI DÙNG CLOSURE VỚI VÒNG LẶP FOR
// Chứng minh setTimeout cũng là một closure
function wait(message) {

    setTimeout(function timer() {
        console.log(message);
    }, 1000);

}

wait("Hello, closure!");
/*
    setTimeout là 1 closure:
        - Hàm timer chạy sau khi hàm wait thực thi 1s
        - Tham số message vẫn tồn tại đến khi hàm timer chạy console
*/

// Closure và vòng lặp
for (var i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}
/*
    KQ: in số 6 5 lần và mỗi lần cách nhau 1s
    6
    6
    6
    6
    6
*/
//=> Biến i của setTimeout nhận được khác với i mà timer nhận được, why?
/*
    Giải thích: Đầu tiên, 6 đến từ đâu ? Nó là kết quả khi vòng lặp gặp điều kiện không thỏa mãn i <= 5, tức i = 6, khi đó nó kết thúc và hàm setTimeout mới bắt đầu được chạy. Và cho dùng bạn có thay i*1000 bằng 0, hàm setTimeout vẫn sẽ chạy sau vòng lặp hoàn thành. Vậy làm thế nào để in đúng như mình muốn ?
*/

// Có thể sửa lại thành các cách sau nhóm vào một IIFE
for (var i=1; i<=5; i++) {
	(function(){
		var j = i;
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})();
}
// Hoặc
for (var i=1; i<=5; i++) {
	(function(j){
		setTimeout( function timer(){
			console.log( j );
		}, j*1000 );
	})( i );
}
// Hoặc sử dụng let thay vì var
for (let i=1; i<=5; i++) {
	setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}