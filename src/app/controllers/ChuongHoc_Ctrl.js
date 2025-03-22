const ChuongHoc = require("../models/chuongHoc");


class Controller {
    create(req, res, next) {
        const dataChuongHoc = req.body;

        if (!dataChuongHoc || Object.keys(dataChuongHoc).length === 0) {
            return res.status(400).json({message: "Dữ liệu không hợp lệ!"});
        }

        ChuongHoc.create(dataChuongHoc, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi thêm chương học!", error: err})
            }
            return res.status(200).json({
                message: "Thêm chương học thành công!",
                data: {id: result.insertedId, ...dataChuongHoc}
            })
        })
    }
}

module.exports = new Controller();
