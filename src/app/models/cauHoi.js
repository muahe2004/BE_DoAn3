const connection = require('../../config/db');

class CauHoi {

    static index(maBaiHoc, callback) {
        const query = 'select * from CauHoi where maBaiHoc = ?';
        connection.query(query, [maBaiHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    } 

    static create_CauHoi(data_CauHoi, callback) {
        const query = 'insert into CauHoi set ?'
        connection.query(query, data_CauHoi, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        });
    }

    static update_CauHoi(maCauHoi, data_CauHoi, callback) {
        const query = 'update CauHoi set ? where maCauHoi = ?';
        connection.query(query, [data_CauHoi, maCauHoi], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static delete_CauHoi(maCauHoi, callback) {
        const query = 'delete from CauHoi where maCauHoi = ?';
        connection.query(query, [maCauHoi], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
}

module.exports = CauHoi;