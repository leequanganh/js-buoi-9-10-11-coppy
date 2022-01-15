
var dssv = []
var LUU_LOCAL = 'luulocal'
var SinhVien = function (masv, tensv, emailsv, matKhausv, ngaySinhsv, khoaHocsv, toansv, lysv, hoasv) {
    this.ma = masv
    this.ten = tensv
    this.email = emailsv
    this.matKhau = matKhausv
    this.ngaySinh = ngaySinhsv
    this.khoaHoc = khoaHocsv
    this.toan = toansv
    this.ly = lysv
    this.hoa = hoasv
    this.tinhDtb = function () {
        return (this.toan + this.ly + this.hoa) / 3
    }

}
function renderTableSv(dssv) {
    var noiDung = ''
    for (var i = 0; i < dssv.length; i++) {
        var sv = dssv[i]
        noiDung += `
        <tr>
            <td>${sv.ma}</td>
            <td>${sv.ten}</td>
            <td>${sv.email}</td>
            <td>${sv.ngaySinh}</td>
            <td>${sv.khoaHoc}</td>
            <td>${sv.tinhDtb()}</td>
            <td><button onclick="suaSv('${sv.ma}')" >sua</button>
            <button onclick="xoaSv('${sv.ma}')" >xoa</button></td>
        </tr>
        `

    }
    document.getElementById('tbodySinhVien').innerHTML = noiDung
}
function luuLocalStorage(dssv) {
    var dssvJson = JSON.stringify(dssv)
    localStorage.setItem(LUU_LOCAL, dssvJson)
}
function checkMaSv(dssv, sv) {
    var newMa = sv.ma
    for (var i = 0; i < dssv.length; i++) {
        var currentMa = dssv[i].ma
        if (currentMa.toString() === newMa.toString()) {
            return false
        }
    }
    return true
}
function timVitri(masv) {
    var viTri = -1
    for (var i = 0; i < dssv.length; i++) {
        var sv = dssv[i]
        if (sv.ma.toString() === masv.toString()) {
            viTri = i
            return viTri
        }
    }

}
function thongTinSv() {
    var maValue = document.getElementById('txtMaSV').value
    var tenValue = document.getElementById('txtTenSV').value
    var emailValue = document.getElementById('txtEmail').value
    var passValue = document.getElementById('txtPass').value
    var ngaySinhValue = document.getElementById('txtNgaySinh').value
    var khoaValue = document.getElementById('khSV').value
    var toanValue = document.getElementById('txtDiemToan').value * 1
    var lyValue = document.getElementById('txtDiemLy').value * 1
    var hoaValue = document.getElementById('txtDiemHoa').value * 1
    var sv = new SinhVien(maValue, tenValue, emailValue, passValue, ngaySinhValue, khoaValue, toanValue, lyValue, hoaValue)
    return sv
}
function themSinhVien() {
    var sv = thongTinSv()
    var kiemTraMa = checkMaSv(dssv, sv)
    if (kiemTraMa) {
        dssv.push(sv)
        renderTableSv(dssv)
        luuLocalStorage(dssv)
    }
}
function suaSv(masv) {
    var viTri = timVitri(masv)
    if (viTri !== -1) {
        var currentSV = dssv[viTri]
        document.getElementById('txtMaSV').value = currentSV.ma
        document.getElementById('txtMaSV').disabled = true /// khoong cho sua ma sv 
        document.getElementById('txtTenSV').value = currentSV.ten
        document.getElementById('txtEmail').value = currentSV.email
        document.getElementById('txtPass').value = currentSV.matKhau
        document.getElementById('txtNgaySinh').value = currentSV.ngaySinh
        document.getElementById('khSV').value = currentSV.khoaHoc
        document.getElementById('txtDiemToan').value = currentSV.toan
        document.getElementById('txtDiemLy').value = currentSV.ly
        document.getElementById('txtDiemHoa').value = currentSV.hoa
    }

}
function capNhatSv() {
    var sv = thongTinSv()
    var viTri = timVitri(sv.ma)
    if (viTri !== -1) {
        dssv[viTri] = sv
        renderTableSv(dssv)
        luuLocalStorage()
    }
}
function xoaSv(masv) {
    var viTri = timVitri(masv)
    if (viTri !== -1) {
        dssv.splice(viTri, 1)
        renderTableSv(dssv)
        luuLocalStorage(dssv)
    }
}
var dssvJson = localStorage.getItem(LUU_LOCAL)
var newDssv = JSON.parse(dssvJson)
if (newDssv !== null) {
    dssv = newDssv.map(function (item) {
        return new SinhVien(item.ma, item.ten, item.email, item.matKhau, item.ngaySinh, item.khoaHoc, item.toan, item.ly, item.hoa)
    })
    renderTableSv(dssv)

}