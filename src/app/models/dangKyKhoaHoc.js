const connection = require("../../config/db");

class DangKyKhoaHoc {
    static create(dataDangKy, callback) {
        connection.query("SET @maDangKy = NULL", (err) => {
            if (err) return callback(err, null);

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

    // Lấy các khóa học đã đăng ký
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

    static benefit(distance, callback) {
        const query = 
            `
                select 
                    date_format(ngayDangKy, '%Y-%m') as thang,
                    sum(kh.giaBan) as doanhThu
                from DangKyKhoaHoc dk join KhoaHoc kh on kh.maKhoaHoc = dk.maKhoaHoc
                where ngayDangKy >= date_sub(curdate(), interval 12 month)
                    and ngayDangKy <= curdate()
                group by Thang 
                order by thang asc
                limit 12
            `;
        connection.query(query, [distance], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static most(callback) {
        const query = 
            `
                select kh.maKhoaHoc, kh.tenKhoaHoc, count(dk.maNguoiDung) as soHocVien
                from KhoaHoc kh join DangKyKhoaHoc dk on dk.maKhoaHoc = kh.maKhoaHoc
                group by kh.maKhoaHoc, kh.tenKhoaHoc
                order by soHocVien desc
                limit 5
            `;

        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static sumStudent(callback) {
        const query = 'select count(distinct maNguoiDung) as hocVien from DangKyKhoaHoc';

        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].hocVien);
        })
    }

    static sumBenefit(callback) {
        const query = 
            `
                select sum(kh.giaBan) as tongDoanhThu 
                from DangKyKhoaHoc dk join KhoaHoc kh on dk.maKhoaHoc = kh.maKhoaHoc`;
        
        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].tongDoanhThu)
        })
    }

    static checkStudent(maKhoaHoc, callback) {
        const query = `select maDangKy from DangKyKhoaHoc where maKhoaHoc = ? limit 1`;

        connection.query(query, [maKhoaHoc], (err, result) => {
            if(err) {
                return callback(err, null);
            }
            const checked = result.length > 0;
            return callback(null, checked);
        })
    }
}

module.exports = DangKyKhoaHoc;

