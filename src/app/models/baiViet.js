const connection = require('../../config/db');
const crypto = require('crypto');

class BaiHoc {
    static create_BaiViet(dataBaiViet, callback) {
        const maxIDQuery = 'select max(cast(substring(maBaiViet, 3, 10) as unsigned)) as maxID from BaiViet';
        const insertQuery = 'insert into BaiViet set ?';

        connection.query(maxIDQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            let maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            let newID = `BV${String(maxID).padStart(4, "0")}`; 

            dataBaiViet.maBaiViet = newID;

            connection.query(insertQuery, dataBaiViet, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }

    static get_BaiViet_byID(maBaiViet, callback) {
        const query = 'select * from BaiViet where ?';

        connection.query(maBaiViet, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        })
    }
}

module.exports = BaiHoc;