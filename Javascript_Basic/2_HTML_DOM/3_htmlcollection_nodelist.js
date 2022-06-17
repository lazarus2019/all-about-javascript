// https://www.w3schools.com/js/js_htmldom_nodelist.asp | https://learntechsystems.com/htmlcollection-vs-nodelist/

/*
    HTMLCOLLECTION - NODELIST

    #Giống:
            HTMLCollection và NodeList: là một danh sách giống mảng (collection) của đối tượng
            Có thuộc tính length để lấy độ dài nhưng thực sự KHÔNG PHẢI ARRAY
            Không có method của array như pop(), push(), shift(),..
            Sử dụng map() thì cần chuyển sang dạng array: Array.from(...)
    #Khác:
            HTMLCollection chỉ chứa các node Element
            HTMLCollection có thể truy cập theo tên, id, hoặc index (số chỉ mục)
            HTMLCollection là tập hợp ĐỘNG -> tự update khi thêm/xóa bất kỳ phần tử nào
            Methods: getElementsByClassName() and getElementsByTagName()
            Không có sẵn method forEach()

            NodeList có thể chứa bất kỳ loại node nào (text nodes, element nodes, document nodes, document fragment nodes, etc.)
            NodeList chỉ có thể truy cập bằng index
            NodeList là tập hợp TĨNH -> không update khi thêm/xóa phần tử
            Methods: querySelectorAll()
            Có sẵn method: forEach()
            Có sẵn attribute: keys, values và entries

    #Note: childNodes trả về Nodelist ĐỘNG (element nodes, text nodes, and comment nodes)
*/

/*
    Một vài (4) HTMLcollection được xây dựng sẵn:
    #Note: chỉ có thể đọc
*/ 

// document.forms: Trả về tập hợp tất cả form có trên trang web => HTMLCollection
document.forms
document.forms["form_id"] // Truy cập form bằng id
document.forms.form_id // Truy cập form bằng id
document.links.namedItem('form_id') // Truy cập form bằng id
document.forms[2] // Truy cập form theo index
document.forms.item(0) // Truy cập form theo index

document.forms.length // Số lượng forms có trên trang web

// document.links: Trả về tập hợp tất cả link (thẻ a và area có chứa thuộc tính href) có trên trang web => HTMLCollection
document.links
document.links["link_id"] // Truy cập link bằng id
document.links.form_id // Truy cập link bằng id
document.links.namedItem('link_id') // Truy cập link bằng id
document.links[2] // Truy cập link theo index
document.links.item(0) // Truy cập link theo index

document.links.length // Số lượng links có trên trang web
document.links.item(0).href // Đường dẫn của link

// document.scripts: Trả về tập hợp tất cả script có trên trang web => HTMLCollection
// *Tương tự forms và links

document.scripts.item(0).src // Đường dẫn của script

// document.images: Trả về tập hợp tất cả image có trên trang web => HTMLCollection
// *Tương tự forms và links

document.images.item(0).src // Đường dẫn của image