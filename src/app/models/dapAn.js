const connection = require('../../config/db');

class DapAn {

    static index(maCauHoi, callback) {
        const query = 'select * from DapAn where maCauHoi = ?';
        connection.query(query, [maCauHoi], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static create(dataDapAn, callback) {
        const query = 'insert into DapAn set ?';
        connection.query(query, [dataDapAn], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static update(maDapAn, dataDapAn, callback) {
        const query = 'update DapAn set ? where maDapAn = ?';
        connection.query(query, [dataDapAn, maDapAn], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static delete(maDapAn, callback) {
        const query = 'delete from DapAn where maDapAn = ?';
        connection.query(query, [maDapAn], (err, results) => {
            if(err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
}

module.exports = DapAn;