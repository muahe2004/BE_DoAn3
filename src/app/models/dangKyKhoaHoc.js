const connection = require("../../config/db");

class DangKyKhoaHoc {
    static create(dataDangKy, callback) {
        // Khởi tạo biến @maDangKy
        connection.query("SET @maDangKy = NULL", (err) => {
            if (err) return callback(err, null);

            // Gọi stored procedure
            connection.query(
                "CALL sp_DangKyKhoaHoc(?, ?, ?, ?, @maDangKy)",
                [
                    dataDangKy.maKhoaHoc,
                    dataDangKy.maNguoiDung,
                    dataDangKy.trangThai,
                    dataDangKy.giaBan,
                ],
                (err, results) => {
                    if (err) return callback(err, null);

                    // Lấy giá trị @maDangKy sau khi gọi procedure
                    connection.query("SELECT @maDangKy AS newID", (err, results) => {
                        if (err) return callback(err, null);

                        const newID = results[0].newID;
                        callback(null, { maDangKy: newID, ...dataDangKy });
                    });
                }
            );
        });
    }

    static get_By_UserID(maNguoiDung, callback) {
        const query = 
            `
                select kh.maKhoaHoc, kh.tenKhoaHoc, kh.hinhAnh, dk.trangThai
                from DangKyKhoaHoc dk join KhoaHoc kh on dk.maKhoaHoc = kh.maKhoaHoc
                where maNguoiDung = ?;
            `;

        connection.query(query, [maNguoiDung], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
}




module.exports = DangKyKhoaHoc;