var nhanVien = {
    ten: 'anh',
    diaChi: 'hcm',
    ngheNghiep: 'xxx',

    chaoHoi: function() {
        console.log('hello');
    },
};
console.log(nhanVien.ten);
console.log(nhanVien.diaChi);
nhanVien.chaoHoi();
////lớp đối tượng
function LoaiMeo(_ten, _gioiTinh) {
    this.meo = _ten;
    this.gioiTinh = _gioiTinh;
}
var meo1 = new loaiMeo('miu', 'duc');
var meo2 = new loaiMeo('meo', 'cai');
var meo3 = new loaiMeo('oachoa', 'buedue')
console.log(meo1);
console.log(meo2);
console.log(meo3);