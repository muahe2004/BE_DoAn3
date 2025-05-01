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

        if (!dataDapAn || Object.keys(dataDapAn).length === 0) {
            return callback(new Error("Dữ liệu không hợp lệ!"), null);
        }
    
        const getMaxIDQuery = 'SELECT MAX(CAST(SUBSTRING(maDapAn, 3, 10) AS UNSIGNED)) AS maxID FROM DapAn';
        const insertQuery = 'INSERT INTO DapAn SET ?';
    
        connection.query(getMaxIDQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }
    
            const maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            const newID = `DA${String(maxID).padStart(3, '0')}`;
    
            dataDapAn.maDapAn = newID;
    
            connection.query(insertQuery, dataDapAn, (err, insertResult) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, insertResult);
            });
        });
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