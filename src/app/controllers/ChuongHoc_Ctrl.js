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

    selection(req, res) {
        const maKhoaHoc = req.params.maKhoaHoc;

        if (!maKhoaHoc) {
            return res.status(400).json({ message: "Thiếu mã khóa học!" });
        }

        ChuongHoc.selection(maKhoaHoc, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy các chương học!", error: err})
            }
            return res.status(200).json(result)
        })
    }

    lessonDetails(req, res) {
        const maChuongHoc = req.params.maChuongHoc;

        if (!maChuongHoc) {
            res.status(400).json({ message: "Thiếu mã chương học!"});
        }

        ChuongHoc.lessonDetails(maChuongHoc, (err, result) => {
            if (err) {
                return res.status(500).json({message: "Lỗi khi lấy thông tin chương!", error: err})
            }
            return res.status(200).json(result);
        })
    }
}

module.exports = new Controller();
