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

    static create_KhoaHoc(dataKhoaHoc, callback) {
        // Truy vấn lấy ID lớn nhất hiện có
        const getMaxIdQuery = "SELECT MAX(CAST(SUBSTRING(MaKhoaHoc, 3, 10) AS UNSIGNED)) AS maxId FROM KhoaHoc";
    
        connection.query(getMaxIdQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }
    
            // Lấy mã ID lớn nhất, nếu không có thì bắt đầu từ 1
            let maxId = results[0].maxId ? results[0].maxId + 1 : 1;
            let newId = `KH${String(maxId).padStart(3, "0")}`; // Định dạng KH001, KH002,...
    
            // Gán mã mới vào dataKhoaHoc
            dataKhoaHoc.MaKhoaHoc = newId;
    
            // Chèn dữ liệu vào bảng
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
    
}

module.exports = KhoaHoc;