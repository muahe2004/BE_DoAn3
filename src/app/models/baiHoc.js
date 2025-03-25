// Kết nối cơ sở dữ liệu
const connection = require('../../config/db');

class BaiHoc {

    static getAll_BaiHoc(maChuongHoc, callback) {
        const query = 'select * from BaiHoc where maChuongHoc = ?';
        connection.query(query, [maChuongHoc], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
    }

    static create_BaiHoc(dataBaiHoc, callback) {
        const maxID = 'select max(cast(substring(maBaiHoc, 3, 10) as unsigned)) as maxID from BaiHoc';

        const query = 'insert into BaiHoc set ?';

        connection.query(maxID, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            let maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            let newID = `BH${String(maxID).padStart(3, "0")}`;

            dataBaiHoc.maBaiHoc = newID;

            connection.query(query, dataBaiHoc, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            })
        })
    }

    static update_BaiHoc(maBaiHoc, dataBaiHoc, callback) {
        const query = 'update BaiHoc set ? where maBaiHoc = ?';
        connection.query(query, [dataBaiHoc, maBaiHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static delete_BaiHoc(maBaiHoc, callback) {
        const query = 'delete from BaiHoc where maBaiHoc = ?';
        connection.query(query, [maBaiHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
   
    static search(maBaiHoc, callback) {
        const query = 'select * from BaiHoc where maBaiHoc = ?';
        connection.query(query, maBaiHoc, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results[0]);
        })
    }
    
    
}

module.exports = BaiHoc;