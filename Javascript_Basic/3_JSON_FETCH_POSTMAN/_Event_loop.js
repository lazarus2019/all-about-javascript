// https://www.youtube.com/watch?v=64ASqMjj9_o | https://dynonguyen.com/event-loop-bat-dong-bo-trong-javascript/

/*
    V8 là 1 Javascript engine được phát triển cho trình duyệt Chrome giúp máy tính thực thi các đoạn code JS

    Heap & Stack: Vùng nhớ được tạo ra và lưu trữ ở RAM

    Heap: Chịu trách nhiệm lưu trữ, cấp phát dữ liệu, con trỏ,...Dung lượng heap lớn - không cố định
    Call stack (Stack):
        - Chức năng: cấp phát bộ nhớ cho các hàm, biến cục bộ
        - Cơ chế hoạt động: Last In First Out - LIFO (Vào sau ra trước)
        - Đặc điểm: Bộ nhớ cố định - không lớn, nếu vượt quá bộ nhớ => tràn bộ nhớ (stack overflow), ví dụ khi gọi hàm đệ quy

    Vì JS đơn luồng-thread nên chỉ xử lý 1 tác vụ 1 lần => có thể dẫn đến blocking
    Blocking: Trạng thái không thể thực hiện bất kỳ thao tác nào trên trình duyệt(click, bôi đen, gõ input,...) do stack dẫn còn chạy hàm nào đó (hoặc các tác vụ mất nhiều thgian như request, call APIs,...)

    => Sự ra đời của Event Loop giúp JS làm được nhiều tác vụ cùng lúc như multi-thread
    Web APIs: 
        - Khái niệm: là 1 runtime của javascript để giúp hoạt động bất đồng bộ như multi-thread
        - Đối tượng sử dụng: Hàm / tác vụ liên quan đến Events (click, change, listener,..), AJAX (call APIs), Timing (setTimeout, setInterval)

    Macrotask: setTimeout, setInterval, DOM events (click, scroll,...)

    Microtask: Liên quan tới Promise, async, await

    Callback queue: 
        - Khái niệm: là hàng đợi các callback do Web APIs trả về.
        - Cơ chế hoạt động: First In First Out - FIFO (Vào trước ra trước)
        - Microtask -> Macrotask -> render queue

    Event loop:
        - Khái niệm: là 1 vòng lặp vô tận, nó luôn chờ để quan sát Call stack và callback queue
        - Cơ chế hoạt động: Đẩy callback từ callback queue sang call stack khi call stack TRỐNG (tất cả hàm được pop ra)

    ##Cơ chế hoạt động bất đồng bộ:
        - Thưc hiện các đoạn code trong hàm main => đẩy lần lượt các hàm vào bên trong call stack - LIFO
            + Trong đó, các hàm tác vụ sử dụng WEB APIs => đẩy từ call stack sang WEB APIs
            + Các hàm / tác vụ còn lại sẽ được thực thi đến khi nào xong thì pop ra cho hàm dưới được thực thi
        - Các tác vụ sau khi hoàn tất tại WEB APIs => trả về 1 callback và đẩy vào Callback queue
        - Bất kể khi nào Call stack trống thì Event Loop đẩy callback trong Callback queue vào Call stack để thực thi
*/

document.querySelector('button').addEventListener('click', () => {
    setTimeout(function timer() {
        console.log('You clicked the button!');
    }, 2000);
})

console.log("Hi!");

setTimeout(function timeout() {
    console.log("Event Loop");
}, 4000);

setTimeout(function timeout2() {
    console.log("Bat dong bo");
}, 0);

console.log("Dyno");

// result: Hi, Dyno, Bat Dong Bo, Event Loop
// Khi thực hiện click button thì nếu timer của event click xong trước thì in ra 'You clicked the button!' rồi sau đó in 'Event Loop'