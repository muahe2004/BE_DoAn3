// Kết nối cơ sở dữ liệu
const connection = require('../../config/db');

class KhoaHoc {

    static getAll_KhoaHoc(callback) {
        connection.query('select * from KhoaHoc', (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
    }

    static home_feeCourses(callback) {
        const query = 
            `
                select kh.maKhoaHoc, kh.tenKhoaHoc, kh.moTaKhoaHoc, kh.hinhAnh, kh.doKho, kh.giaBan, COUNT(dk.maDangKy) as soLuongDangKy
                from KhoaHoc kh join DangKyKhoaHoc dk on dk.maKhoaHoc = kh.maKhoaHoc
                where giaBan > 0
                group by kh.maKhoaHoc, kh.tenKhoaHoc, kh.moTaKhoaHoc, kh.hinhAnh, kh.doKho, kh.giaBan
                order by soLuongDangKy desc
                limit 4;
            `;

        connection.query(query, (err, result) => {
            if(err) {
                callback(err, null);
            }
            callback(null, result);
        })
    }

    static create_KhoaHoc(dataKhoaHoc, callback) {
        const getMaxIdQuery = "SELECT MAX(CAST(SUBSTRING(MaKhoaHoc, 3, 10) AS UNSIGNED)) AS maxId FROM KhoaHoc";
    
        connection.query(getMaxIdQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }
    
            let maxId = results[0].maxId ? results[0].maxId + 1 : 1;
            let newId = `KH${String(maxId).padStart(3, "0")}`; 
    
            dataKhoaHoc.MaKhoaHoc = newId;
    
            const query = "INSERT INTO KhoaHoc SET ?";
            connection.query(query, dataKhoaHoc, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    

    static update_KhoaHoc(maKhoaHoc, dataKhoaHoc, callback) {
        const query = 'update KhoaHoc set ? where maKhoaHoc = ?';
        connection.query(query, [dataKhoaHoc, maKhoaHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static delete_KhoaHoc(maKhoaHoc, callback) {
        const query = 'delete from KhoaHoc where maKhoaHoc = ?';
        connection.query(query, [maKhoaHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static get_course_byID(maKhoaHoc, callback) {
        const query = 'select * from KhoaHoc where maKhoaHoc = ?';
        connection.query(query, [maKhoaHoc], (err, results) => {
            if(err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
    
    static search_KhoaHoc(tenKhoaHoc, callback) {
        const query = 'select * from KhoaHoc where lower(tenKhoaHoc) like lower(?)';

        const searchValue = `%${tenKhoaHoc}%`; 
    
        connection.query(query, [searchValue], (err, results) => {
            if (err) {
                return callback(err, null); 
            }
            callback(null, results);
        });
    }

    static selection_KhoaHoc(callback) {
        const query = 'select maKhoaHoc, tenKhoaHoc from KhoaHoc';

        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
    
    // Thống kê số lượng học viên của các khóa học
    static count_Student(callback) {
        const query = 
            `
                select kh.maKhoaHoc, kh.tenKhoaHoc, count(dk.maDangKy) as soLuongHocVien
                from KhoaHoc kh join DangKyKhoaHoc dk on kh.maKhoaHoc = dk.maKhoaHoc
                group by kh.maKhoaHoc, kh.tenKhoaHoc
                having count(dk.maDangKy) > 0
                order by soLuongHocVien desc
            `;

        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    // Doanh thu
    static Revenue(callback) {
        const query = 
            `
                select kh.maKhoaHoc, kh.tenKhoaHoc, count(dk.maDangKy) * kh.giaBan as doanhThu
                from KhoaHoc kh join DangKyKhoaHoc dk on kh.maKhoaHoc = dk.maKhoaHoc
                group by kh.maKhoaHoc, kh.tenKhoaHoc
                having count(dk.maDangKy) > 0
                order by doanhThu desc;
            `;

        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    // Tổng số chương, bài học của khóa học
    static count_Les_Lec(maKhoaHoc ,callback) {
        const query = 
            `
                select kh.maKhoaHoc, kh.tenKhoaHoc, count(distinct ch.maChuongHoc) as tongSoChuong, count(bh.maBaiHoc) as tongSoBaiHoc
                from KhoaHoc kh left join ChuongHoc ch on kh.maKhoaHoc = ch.maKhoaHoc
                left join BaiHoc bh on ch.maChuongHoc = bh.maChuongHoc
                where kh.maKhoaHoc = ?
                group by kh.maKhoaHoc, kh.tenKhoaHoc
                order by tongSoChuong desc, tongSoBaiHoc desc;
            `;
        connection.query(query, [maKhoaHoc], (err, results) => {
            if(err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
}

module.exports = KhoaHoc;