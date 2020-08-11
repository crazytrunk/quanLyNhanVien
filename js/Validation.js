function Validation() {
    this.kiemTraRong = function (input, spanId, message) {
        if (input === "") {
            getEle(spanId).style.display = "block";
            getEle(spanId).innerHTML = message;
            return false;
        }
        getEle(spanId).style.display = "none";
        getEle(spanId).innerHTML = "";
        return true;
    };
    this.kiemTraChucVu = function (id, spanId, message) {
        if(getEle(id).selectedIndex !== 0){
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display = "block";
        getEle(spanId).innerHTML = message;
        return false;
    }
    this.kiemTraDoDaiKyTu = function(input, min, max,spanId, message){
        if(input.length > min && input.length < max){
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display ="block";
        getEle(spanId).innerHTML = message;
        return false;
    }
//slide trang 57 pattern Attribute (dành cho tiếng việt)
    this.kiemTraChuoi = function (input, spanId, message){
        var pattern = new RegExp(

            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      
              "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      
              "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
      
          );
          //pattern.test(input) # input.match
        if(pattern.test(input)){
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display ="block";
        getEle(spanId).innerHTML = message;
        return false;
    }
    this.kiemTraEmail = function(input, spanId, message){
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(input.match(mailformat)){
            getEle(spanId).style.display = "none";
            getEle(spanId).innerHTML = "";
            return true;
        }
        getEle(spanId).style.display ="block";
        getEle(spanId).innerHTML = message;
        return false;
    }
    this.kiemTraTrungMa = function(input, spanId,message, dsnv){
        var status =false;
        /**
         * duyet mang nhan vien
         * 1. status = false;
         * 2. so sanh maNv === nhanVien.maNV => nếu trùng nhau để status => false
         * 3.nếu status = true
         */
        // dsnv.forEach(function(item){
        //     if(item.maNv === input){
        //         status =true;
        //     }
        // });
        // thay foreach sẽ return true hoặc false;
        status = dsnv.some(function(item){
            return item.maNV === input;
        })
        if (status){
            getEle(spanId).style.display ="block";
            getEle(spanId).innerHTML = message;
            return false;
        }
        getEle(spanId).style.display ="none";
        getEle(spanId).innerHTML = "";
        return true;
    }
}