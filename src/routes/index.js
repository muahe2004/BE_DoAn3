const khoaHoc = require('./khoaHoc');
const baiHoc = require('./baiHoc');
const cauHoi = require('./cauHoi');
const dapAn = require('./dapAn');
const nguoiDung = require('./nguoiDung');
const upload = require('./upload');
const authRoutes = require('./authRoutes');
const chuongHoc = require('./chuongHoc');
const dangKyKhoaHoc = require('./dangKyKhoaHoc');
const authGoogle = require('./auThenGoogle');




function route(app) {

    app.use('/', khoaHoc);
    app.use('/', baiHoc);
    app.use('/', cauHoi);
    app.use('/', dapAn);
    app.use('/', nguoiDung);
    app.use('/', upload)
    app.use('/', authRoutes);
    app.use('/', chuongHoc); 
    app.use('/', dangKyKhoaHoc);
    app.use('/', authGoogle);

}

module.exports = route;