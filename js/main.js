var dsnv = new DanhSachNhanVien();
var validation = new Validation();
//f5 là chạy nên để ra ngoài
getLocalStorage();
function getEle(id) {
    return document.getElementById(id);
}
getEle("btnThem").addEventListener("click", function () {
    getEle("btnCapNhat").style.display = "none";
    getEle("btnThemNV").style.display = "block";
    getEle("msnv").removeAttribute("disabled");

    //viet 1 ham reset dat value = "";

})
getEle("btnThemNV").addEventListener("click", function () {
    var maNV = getEle("msnv").value;
    var tenNv = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    var isValid = true;
    // ở đây phải & và dấu = vì toán tử so sánh true false 
    //nếu ở đây mà đặt  = thì chỉ quan tâm đến cái cuối cùng đc gán k 
    //quan tâm đến cái nào ở trước
    isValid &= validation.kiemTraRong(maNV, "tbMaNV", "(*) Mã NV không được bỏ trống") && validation.kiemTraDoDaiKyTu(maNV, 3, 11, "tbMaNV", "(*) Độ dài ký tự từ 4 -> 10") && validation.kiemTraTrungMa(maNV, "tbMaNV", "(*) Mã NV đã tồn tại", dsnv.mangNhanVien);
    isValid &= validation.kiemTraRong(tenNv, "tbTen", "(*) Tên NV không được bỏ trống") && validation.kiemTraChuoi(tenNv, "tbTen", "(*) Tên NV không được dùng số");
    isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Email không được bỏ trống") && validation.kiemTraEmail(email, "tbEmail", "(*)Email không hợp lệ");
    isValid &= validation.kiemTraRong(password, "tbMatKhau", "(*) MK không được bỏ trống");
    isValid &= validation.kiemTraRong(date, "tbNgay", "(*) Ngày không được bỏ trống");
    isValid &= validation.kiemTraChucVu("chucvu", "tbChucVu", "(*) chức vụ không được bỏ trống");
    if (isValid) {


        var nhanVien = new NhanVien(maNV, tenNv, email, password, date, chucVu);
        console.log(nhanVien);
        dsnv.themNhanVien(nhanVien);
        console.log(dsnv.mangNhanVien);
        setLocalStorage();
        taoBang();
    }
})
// function taoBang(){
//     var tBody = getEle("tableDanhSach");
//     tBody.innerHTML ="";
//     for(var i = 0;i < dsnv.mangNhanVien.length; i++){
//         var tagTr = document.createElement("tr");

//         var tdMa = document.createElement("td");
//         var tdTen = document.createElement("td");
//         var tdEmail = document.createElement("td");
//         var tdDate = document.createElement("td");
//         var tdChucVu = document.createElement("td");
//         tdMa.innerHTML = dsnv.mangNhanVien[i].maNv;
//         //console.log(dsnv.mangNhanVien[i].maNv);        
//         tdTen.innerHTML = dsnv.mangNhanVien[i].tenNv;
//         tdEmail.innerHTML = dsnv.mangNhanVien[i].email;
//         tdDate.innerHTML = dsnv.mangNhanVien[i].date;
//         tdChucVu.innerHTML = dsnv.mangNhanVien[i].chucVu;

//         tagTr.appendChild(tdMa);
//         tagTr.appendChild(tdTen);
//         tagTr.appendChild(tdEmail);
//         tagTr.appendChild(tdDate);
//         tagTr.appendChild(tdChucVu);

//         tBody.appendChild(tagTr);       
//     }
// }
//mang = dsnv.mangNhanvien (default Params =>ES6)
function taoBang(mang = dsnv.mangNhanVien) {
    var tBody = getEle("tableDanhSach");
    var contentHTML = "";
    mang.map(function (item) {
        contentHTML += `
        <tr>
            <td>${item.maNV}</td>
            <td>${item.tenNv}</td>
            <td>${item.email}</td>
            <td>${item.date}</td>
            <td>${item.chucVu}</td>
            <td>
            <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick ="suaNV('${item.maNV}')">Sửa</button>
            <button class="btn btn-danger" onclick ="xoaNV('${item.maNV}')">Xóa</button>
            </td>
        </tr>
        `;
    });
    tBody.innerHTML = contentHTML;
}
/**
 * function xoaNV()
 */
function xoaNV(maNV) {
    console.log(maNV)
    dsnv.xoaNhanVien(maNV);
    taoBang();
    setLocalStorage();
}
function suaNV(maNV) {
    getEle("btnCapNhat").style.display = "block";
    getEle("btnThemNV").style.display = "none";
    var nhanVien = dsnv.layThongTinNhanVien(maNV);
    getEle("msnv").value = nhanVien.maNV;
    getEle("msnv").setAttribute("disabled",true);
    getEle("name").value = nhanVien.tenNV;
    getEle("email").value = nhanVien.email;
    getEle("password").value = nhanVien.password;
    getEle("datepicker").value = nhanVien.date;
    getEle("chucvu").value = nhanVien.chucVu;
}
/**
 * cập nhật function
 */
getEle("btnCapNhat").addEventListener("click",function(){
    //lấy value từ user nhập vào
    var maNV = getEle("msnv").value;
    var tenNV = getEle("name").value;
    var email = getEle("email").value;
    var password = getEle("password").value;
    var date = getEle("datepicker").value;
    var chucVu = getEle("chucvu").value;

    var nhanVien = new NhanVien(maNV,tenNV,email,password,date,chucVu);
    dsnv.capNhatNhanVien(nhanVien);
    taoBang();
    setLocalStorage();
    //đóng sau khi cập nhật
    getEle("btnDong").click() ;
    // gọi hàm validate tại đây kiểm tra việc chưa điền giống hàm thêm
})
/**
 * search  ( tìm kiếm tên)
 * keyup gõ sẽ hiển thị ngay
 */
getEle("searchName").addEventListener("keyup",function(){
    var chuoiTimKiem = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNhanVien(chuoiTimKiem);
    taoBang(mangTimKiem);
})
//lưu dữ liệu ở trình duyệt f5 k bị mất(local storage HTML5)
function setLocalStorage() {
    /**
     * setlocalstoreage : lưu giá trị muốn lưu xuống local
     * lưu xuống phải chuyển value sang chuỗi 
     */
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNhanVien));
}
function getLocalStorage() {
    /**
     * Lấy giá trị được lưu local storage lên dùng
     * chuyển qua JSON để dùng
     */
    if (localStorage.getItem("DSNV")) {
        dsnv.mangNhanVien = JSON.parse(localStorage.getItem("DSNV"));
        taoBang();
    }

}
/**
 * some=> boolean true || false
 * forEach => duyệt mảng
 * map => duyệ mảng, trả về mảng mới
 * find => trả về object tìm thấy trong mảng
 * findIndex => trả về số chỉ mục tìm thấy trong mảng
 * filter => trả về marbg sau khi lọc tương ứng với điều kiện tìm kiếm
 *  push=> thêm vào mảng
 * splice => xóa phần tử trong mảng
 */