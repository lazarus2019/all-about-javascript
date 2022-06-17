// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math

/*
    MATH OBJECT

    - Math.round()
    - Math.abs()
    - Math.floor()
    - Math.ceil()
    - Math.random()
    - Math.min()
    - Math.max() 
 */

// Math.round: Làm tròn số thập phân (>= 0.5 => + 1; < 0.5 => 0)
Math.round(1.5) // 2
Math.round(-1.49) // -1

// Math.abs: Chuyển số về dạng giá trị tuyệt đối
Math.abs(-1000) // 1000
Math.abs(500) // 500

// Math.floor: Làm tròn số xuống => 0 (<1)
Math.floor(2.5) // 2
Math.floor(1.9) // 1

// Math.ceil: Làm tròn số lên => + 1 (>0)
Math.ceil(2.01) // 3
Math.ceil(3.99) // 4

// Math.random: Tạo ra 1 số ngẫu nhiên trong  0 -> 1
Math.random() * 10 // (0 - 10)
(Math.random() * 100) + 1 // (1 - 101)

// Math.min: Tìm số nhỏ nhất trong dãy số truyền vào
Math.min(100, -1, 0, -10, 90) // -10

// Math.max: Tìm số lớn nhất trong dãy số truyền vào
Math.max(100, -1, 0, -10, 90) // 100

// 8 thuộc tính Math tượng trung cho hằng số toán học

Math.E        // returns Euler's number
Math.PI       // returns PI
Math.SQRT2    // returns the square root of 2
Math.SQRT1_2  // returns the square root of 1/2
Math.LN2      // returns the natural logarithm of 2
Math.LN10     // returns the natural logarithm of 10
Math.LOG2E    // returns base 2 logarithm of E
Math.LOG10E   // returns base 10 logarithm of E