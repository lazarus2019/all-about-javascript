/*
    Var
    Let & Const

    Giống nhau: Sử dụng để định nghĩa biến
    
    Code blocks: if else, loop, {},...
    Điểm khác nhau:
        Scope(phạm vi truy cập vào biến, bên trong và ngoài block):
            - Var: Bất cứ đâu
            - Let, Const: Chỉ trong code block

        Hoisting(đưa lên trên đầu):
            - Var: Phần khai báo được JavaScript tự động đưa lên đầu
            - Let, Const: Không thể truy cập khi chưa định nghĩa

        Assignment(gán lại giá trị)
            - Const: Không thể gán lại giá trị
            - Var, Let: Có thể gán lại

    Khi nào thì sử dụng Var, Let, Const?
    - Code thuần: Var
    - Babel: Const, Let
        + Khi định nghĩa biến và không gán lại: Const
        + Khi định nghĩa biến và gán lại: Let

*/