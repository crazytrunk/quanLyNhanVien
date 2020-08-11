function DanhSachNhanVien() {
    this.mangNhanVien = [];
    this.themNhanVien = function (nhanVien) {
        this.mangNhanVien.push(nhanVien);
    }
    this.xoaNhanVien = function (maNV) {
        // var viTri = -1;
        // 

        // this.mangNhanVien.forEach(function (item,index) {
        //     if (item.maNv === maNV) {
        //       viTri = index;
        //     }
        // });
        var viTri = this.timViTri(maNV);
        if (viTri !== -1) {
            this.mangNhanVien.splice(viTri, 1);
        }
    }
    this.timViTri = function (maNV) {
        //  *  Tìm vị trí
        //  * var viTri = -1;// vị trí chưa tìm thấy
        //  * 0. duyệt mảng  mangNhanVien
        //  * 1. Nếu nhanvien.maNV === maNVXoa
        //  * 2.==> tìm được vi trí
        //  * 3. Nếu như  viTri # -1 ==> xóa NV
        //  * 4.arr.splice(viTri,1);
        //  */
        // return thay vi  var viTri = 
        return this.mangNhanVien.findIndex(function (item) {
            return item.maNV === maNV;
        })
    }
    this.layThongTinNhanVien = function (maNV) {
        // var viTri = this.timViTri(maNV);
        // if (viTri !== -1) {
        //  return this.mangNhanVien[viTri];
        // }
        //hàm find tìm thẳng object cần tìm
        return this.mangNhanVien.find(function (item) {
            return item.maNV === maNV;
        })
    }
}
//js prototype
DanhSachNhanVien.prototype.capNhatNhanVien = function (nhanVien) {
    var viTri = this.timViTri(nhanVien.maNV);

    if (viTri !== -1) {
        this.mangNhanVien[viTri] = nhanVien;
    }
}
DanhSachNhanVien.prototype.timKiemNhanVien = function (chuoiTimKiem) {
    // var mangTimKiem = [];
    // this.mangNhanVien.forEach(function (item) {
    //     if (item.tenNv.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) !== -1) {
    //         mangTimKiem.push(item);
    //     }
    // });

    // return mangTimKiem;
    /**
     * tạo ra mảng tìm kiếm rỗng
     * 0. Duyệt mảng NV
     * 1.so sánh  tên NV  trong từng phần tử của mảng trùng với 
     * 2.mangTimKiem.push(nv);
     * 3 return mangTimKiem
     */

    /**
     * hàm filter JS
     */
    return this.mangNhanVien.filter(function(item){
        return item.tenNv.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) !== -1
    })
}