var dssv = []
var LOCAL_STORAGE = 'local_storage'
var SinhVien = function (masv, tensv, emailsv, passsv, ngaySinhsv, khoasv, toansv, lysv, hoasv) {
    this.ma = masv
    this.ten = tensv
    this.email = emailsv
    this.pass = passsv
    this.ngaySinh = ngaySinhsv
    this.khoa = khoasv
    this.toan = toansv
    this.ly = lysv
    this.hoa = hoasv
    this.tinhDTB = function () {
        return (this.toan + this.ly + this.hoa) / 3
    }

}
function layThongTinSv() {
    var maValue = document.getElementById('txtMaSV').value
    var tenValue = document.getElementById('txtTenSV').value
    var emailValue = document.getElementById('txtEmail').value
    var passValue = document.getElementById('txtPass').value
    var ngaySinhValue = document.getElementById('txtNgaySinh').value
    var khoaValue = document.getElementById('khSV').value
    var toanValue = document.getElementById('txtDiemToan').value * 1
    var lyValue = document.getElementById('txtDiemLy').value * 1
    var hoaValue = document.getElementById('txtDiemHoa').value * 1
    var sinhVien = new SinhVien(maValue, tenValue, emailValue, passValue, ngaySinhValue, khoaValue, toanValue, lyValue, hoaValue)
    return sinhVien
}
function renderTableSv(dssv) {
    var noiDung = ''
    for (var i = 0; i < dssv.length; i++) {
        var sv = dssv[i]
        noiDung += `<tr>
            <td>${sv.ma}</td>
            <td>${sv.ten}</td>
            <td>${sv.email}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.khoa}</td>
            <td>${sv.tinhDTB()}</td>
            <td>
            <button onclick="suaSv('${sv.ma}')">sua</button>
            <button onclick="xoaSv('${sv.ma}')">xoa</button>
            </td>

        </tr>`
    }
    document.getElementById('tbodySinhVien').innerHTML = noiDung
}
function kiemTraMa(sv, dssv) {
    var newMa = sv.ma
    for (var i = 0; i < dssv.length; i++) {
        var currentMa = dssv[i].ma
        if (newMa.toString() === currentMa.toString()) {
            return false
        }
    }
    return true
}
function luuLocal(dssv) {
    var dssvJson = JSON.stringify(dssv)
    localStorage.setItem(LOCAL_STORAGE, dssvJson)
}
function layViTri(masv) {
    var ViTri = -1
    for (var i = 0; i < dssv.length; i++) {
        var sv = dssv[i]
        if (sv.ma.toString() === masv) {
            ViTri = i
            return ViTri
        }
    }
}

function themSinhVien() {
    var sv = layThongTinSv()
    var checkMa = kiemTraMa(sv, dssv)
    if (checkMa) {
        dssv.push(sv)
        renderTableSv(dssv)
        luuLocal(dssv)
    }
}

function suaSv(masv) {
    var viTri = layViTri(masv)
    console.log(viTri);
    if (viTri !== -1) {
        var sv = dssv[viTri]
        document.getElementById('txtMaSV').value = sv.ma
        document.getElementById('txtTenSV').value = sv.ten
        document.getElementById('txtEmail').value = sv.email
        document.getElementById('txtPass').value = sv.pass
        document.getElementById('txtNgaySinh').value = sv.ngaySinh
        document.getElementById('khSV').value = sv.khoa
        document.getElementById('txtDiemToan').value = sv.toan
        document.getElementById('txtDiemLy').value = sv.ly
        document.getElementById('txtDiemHoa').value = sv.hoa
    }
}
function xoaSv(masv) {
    var viTri = layViTri(masv)
    if (viTri !== -1) {
        dssv.splice(viTri, 1)
        renderTableSv(dssv)
        luuLocal(dssv)

    }
}
function capNhatSv() {
    var sv = layThongTinSv()
    var viTri = layViTri(sv.ma)
    if (viTri !== -1) {
        dssv[viTri] = sv
        luuLocal(dssv)
        renderTableSv(dssv)
    }
}
////////////////////////////////////////////////////////////////////
var dssvJson = localStorage.getItem(LOCAL_STORAGE)
var newDssv = JSON.parse(dssvJson)
if (newDssv !== null) {
    dssv = newDssv.map(function (item) {
        return new SinhVien(item.ma, item.ten, item.email, item.pass, item.ngaySinh, item.khoa, item.toan, item.ly, item.hoa)
    })
    renderTableSv(dssv)

}