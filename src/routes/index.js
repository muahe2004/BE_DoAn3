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
const paymentMomo = require('./paymentMomo');
const aiChat = require('./aiChatGemini');
const bill = require("./hoaDon");
const cloud = require("./cloudinary");

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
    app.use('/', paymentMomo);
    app.use('/', aiChat);
    app.use('/', bill);
    app.use('/', cloud);
}

module.exports = route;