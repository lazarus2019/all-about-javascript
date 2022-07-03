// https://github.com/lazarus2019/In-JavaScript-we-trust

/*
    Tổng hợp những câu hỏi vận dụng về Javascript

    #Note: Một vài câu hỏi có thể sẽ có giải thích nhanh hoặc do lười không giải thích
    Giải thích chi tiết có tại: https://github.com/lazarus2019/In-JavaScript-we-trust
*/

//// 1. What's the output?
function a(x) {
    x++;
    return function () {
        console.log(++x);
    };
}

a(1)();
a(1)();
a(1)();

let x = a(1);
x();
x();
x();

/*
    A: 1, 2, 3 and 1, 2, 3
    B: 3, 3, 3 and 3, 4, 5
    C: 3, 3, 3 and 1, 2, 3
    D: 1, 2, 3 and 3, 3, 3
*/
//=> B, Tham chiếu nên các giá trị được giữ lại và tăng dần

//// 2. What's the output?
function Name(a, b) {
    this.a = a;
    this.b = b;
}

const me = Name("Vuong", "Nguyen");

console.log(!(a.length - window.a.length));

/*
    A: undefined
    B: NaN
    C: true
    D: false
*/
//=> C, Không dùng kw new => a và b được khởi tạo global, !0 = true

//// 3. What's the output?
const x = function (...x) {
    let k = (typeof x).length;
    let y = () => "freetut".length;
    let z = { y: y };

    return k - z.y();
};

console.log(Boolean(x()));

/*
    A: true
    B: 1
    C: -1
    D: false
*/
//=> A, x trong hàm là undefined (9 characters) - 'freetut' (7 characters) = -2, chuyển sang boolean là true

//// 4. What's the output?
(function js(x) {
    const y = (j) => j * x;

    console.log(y(s()));

    function s() {
        return j();
    }

    function j() {
        return x ** x;
    }
})(3);

/*
    A: undefined
    B: 18
    C: 81
    D: 12
*/
//=> C, 3^3*3 = 81

//// 5. What's the output?
var tip = 100;

(function () {
    console.log("I have $" + husband());

    function wife() {
        return tip * 2;
    }

    function husband() {
        return wife() / 2;
    }

    var tip = 10;
})();

/*
    A: "I have $10";
    B: "I have $100";
    C: "I have $50";
    D: "I have $NaN";
*/
//=> D, Phần khai báo tip trong hàm IIFE được đưa lên đầu, lúc này giá trị = undefined => tip * 2 = NaN

//// 6. What's the outpu
const js = { language: "loosely type", label: "difficult" };

const edu = { ...js, level: "PhD" };

const newbie = edu;

delete edu.language;

console.log(Object.keys(newbie).length);

/*
    A: 2;
    B: 3;
    C: 4;
    D: 5;
 */
//=> A, newbie tham chiếu đến edu

//// 7. What's the output?
var job = {
    frontend: "Vuejs or Reactjs",
    backend: "PHP and Laravel",
    city: "Auckland",
};

class Combine {
    static get() {
        return Object.assign(candidate, job);
    }

    static count() {
        return Object.keys(this.get()).length;
    }
}

console.log(Combine.count());

/*
    A: 5;
    B: 6;
    C: 7;
    D: 8;
*/
//=> A, Gộp 2 object => có 5 keys

//// 8. What's the output?
var x = 1;

(() => {
    x += 1;
    ++x;
})();
((y) => {
    x += y;
    x = x % y;
})(2);
(() => (x += x))();
(() => (x *= x))();

console.log(x);

/*
    A: 4;
    B: 50;
    C: 2;
    D: 10;
*/
//=> 5 % 2 = 1

//// 9. What's the output?
// $var = 10;

// $f = function ($let) use($var) {
//     return ++$let + $var;
// };

// $var = 15;
// echo $f(10);
//----//
var x = 10;

const f = (l) => ++l + x;

x = 15;
console.log(f(10));

/*
    A: 26 and 26;
    B: 21 and 21;
    C: 21 and 26;
    D: 26 and 21;
*/
//=> C, kiến thức này chưa học

//// 11. What's the output?
console.log("hello");

setTimeout(() => console.log("world"), 0);

console.log("hi");

/*
    A: "hello" -> "world" -> "hi"
    B: "hello" -> "hi" -> "world"
    C: "hi" -> "world" -> "hello"
    D: "hi" -> "hello" -> "world"
*/
//=> B, setTimeout được thực thi khi không queue trống

//// 12. What's the output?
String.prototype.lengthy = () => {
    console.log("hello");
};

let x = { name: "Vuong" };

delete x;

x.name.lengthy();

/*
    A: "Vuong";
    B: "hello";
    C: "undefined"
    D: "ReferenceError"
*/
//=> Câu lệnh delete chỉ xóa thuộc tính object chứ không xóa object

//// 13. What's the output?
let x = {};

x.__proto__.hi = 10;

Object.prototype.hi = ++x.hi;

console.log(x.hi + Object.keys(x).length);

/*
    A: 10
    B: 11
    C: 12
    D: NaN
*/
//=> C

//// 14. What's the output?
const array = (a) => {
    let length = a.length;
    delete a[length - 1];
    return a.length;
};

console.log(array([1, 2, 3, 4]));

const object = (obj) => {
    let key = Object.keys(obj);
    let length = key.length;
    delete obj[key[length - 1]];

    return Object.keys(obj).length;
};

console.log(object({ 1: 2, 2: 3, 3: 4, 4: 5 }));

const setPropNull = (obj) => {
    let key = Object.keys(obj);
    let length = key.length;
    obj[key[length - 1]] = null;

    return Object.keys(obj).length;
};

console.log(setPropNull({ 1: 2, 2: 3, 3: 4, 4: 5 }));

/*
    A: 333
    B: 444
    C: 434
    D: 343
*/
//=> C, delete chỉ xóa được thuộc tính của object, null cũng là 1 key của object

//// 15. What's the output?
var a = [1, 2, 3];
var b = [1, 2, 3];

var c = [1, 2, 3];
var d = c;

var e = [1, 2, 3];
var f = e.slice();

console.log(a === b);
console.log(c === d);
console.log(e === f);

/*
    A: true true true
    B: false false true
    C: true true false
    D: false true false
*/
//=> D, do các ô nhớ khác nhau, d và c tham chiếu cùng 1 ô nhớ

//// 16. What's the output?
var languages = {
    name: ["elixir", "golang", "js", "php", { name: "feature" }],
    feature: "awesome",
};

let flag = languages.hasOwnProperty(Object.values(languages)[0][4].name);

(() => {
    if (flag !== false) {
        console.log(
            Object.getOwnPropertyNames(languages)[0].length <<
            Object.keys(languages)[0].length
        );
    } else {
        console.log(
            Object.getOwnPropertyNames(languages)[1].length <<
            Object.keys(languages)[1].length
        );
    }
})();

/*
    A: 8
    B: NaN
    C: 64
    D: 12
*/
//=> C

//// 17. What's the output?
var player = {
    name: "Ronaldo",
    age: 34,
    getAge: function () {
        return ++this.age - this.name.length;
    },
};

function score(greeting, year) {
    console.log(
        greeting + " " + this.name + `! You were born in  ${year - this.getAge()}`
    );
}

window.window.window.score.call(window.window.window.player, "Kiora", 2019);

score.apply(player, ["Kiora", 2009]);

const helloRonaldo = window.score.bind(window.player, "Kiora", 2029);

helloRonaldo();

/*
    A: "Kiora Ronaldo! You were born in 1985", "Kiora Ronaldo! You were born in 1985", "Kiora Ronaldo! You were born in 1985"
    B: "Kiora Ronaldo! You were born in 1991", "Kiora Ronaldo! You were born in 1991", "Kiora Ronaldo! You were born in 1999"
    C: "Kiora Ronaldo! You were born in 1991", NaN, "Kiora Ronaldo! You were born in 1980"
    D: "Kiora Ronaldo! You were born in 1991", "Kiora Ronaldo! You were born in 1980", "Kiora Ronaldo! You were born in 1999"
*/
//=> D

//// 18. What's the output?
var ronaldo = { age: 34 };

var messi = { age: 32 };

function score(year, tr, t) {
    if (typeof tr === "function" && typeof t === "function") {
        console.log(`You score ${tr(year, t(this.age))} times`);
    }
}

const transform = (x, y) => x - y;

const title = (x) => ++x + x++;

const helloRonaldo = score.bind(ronaldo, 2029, transform, title);

helloRonaldo();

const helloMessi = score.bind(messi, 2029, transform, title);

helloMessi();

/*
    A: "You score 1989 times" and "You score 1963 times"
    B: "You score 1959 times" and "You score 1989 times"
    C: "You score 1989 times" and "You score 1953 times"
    D: "You score 1959 times" and "You score 1963 times"
*/
//=> D, ++x + x++ = ((x + 1) + x) + 1

//// 19. What's the output?
var person = {};

Object.defineProperties(person, {
    name: {
        value: "Vuong",
        enumerable: true,
    },
    job: {
        value: "developer",
        enumerable: true,
    },
    studying: {
        value: "PhD",
        enumerable: true,
    },
    money: {
        value: "NZD",
        enumerable: false,
    },
});

class Evaluate {
    static checkFlag(obj) {
        return Object.getOwnPropertyNames(obj) > Object.keys(obj)
            ? Object.getOwnPropertyNames(obj)
            : Object.keys(obj);
    }
}

const flag = Evaluate.checkFlag(person);

console.log(flag.length);

/*
    A: 1
    B: 2
    C: 3
    D: 4
*/
//=> D

// 20. What's the output?
const id = 10;

const getID = (...id) => {
    id(id);

    function id(id) {
        console.log(typeof id);
    }
};

getID(id);

/*
    A: ReferenceError
    B: 10
    C: undefined
    D: 'function'
*/
//=> D, tính chất closure nên phạm vi trong function id là độc lập

//// 21. What's the output?
var book1 = {
    name: "Name of the rose",
    getName: function () {
        console.log(this.name);
    },
};

var book2 = {
    name: { value: "Harry Potter" },
};

var bookCollection = Object.create(book1, book2);

bookCollection.getName();

/*
    A: 'Harry Potter'
    B: 'Name of the rose'
    C: ReferenceError
    D: Object object
*/
//=> A, hàm getName được kế thừa từ book1 và thuộc tính name của book2 được ưu tiên hơn vì là đối số thứ 2, sau book1

//// 22. What's the output?
(() => {
    const a = Object.create({});

    const b = Object.create(null);

    let f1 = a.hasOwnProperty("toString");

    let f2 = "toString" in b;

    let result =
        f1 === false && f2 === false
            ? console.log((typeof a.toString()).length)
            : console.log(b.toString());
})();

/*
    A: ReferenceError
    B: undefined
    C: 0
    D: 6
*/
//=> D

//// 23. What's the output?
let promise = new Promise((rs, rj) => {
    setTimeout(() => rs(4), 0);

    Promise.resolve(console.log(3));

    console.log(2);
});

promise
    .then((rs) => {
        console.log(rs ? rs ** rs : rs);
        return rs;
    })
    .then((rs) => console.log(rs == 256 ? rs : rs * rs));

/*
    A: 3, 2, 256, 256
    B: 3, 2, 256, 16
    C: 256, 16, 3, 2
    D: 16, 256, 3, 2
*/
//=> B