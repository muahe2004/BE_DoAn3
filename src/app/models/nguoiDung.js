const connection = require('../../config/db');

class NguoiDung {

    static index(callback) {
        const query = 'select * from NguoiDung';
        connection.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static findByUsername(username, callback) {
        const query = 'select * from NguoiDung where email = ?';
        
        connection.query(query, [username], (err, results) => {
            if(err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static create(dataNguoiDung, callback) {
        const maxIDQuery = 'SELECT MAX(CAST(SUBSTRING(maNguoiDung, 3, 10) AS UNSIGNED)) AS maxID FROM NguoiDung';
    
        connection.query(maxIDQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }
    
            let maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            let newID = `ND${String(maxID).padStart(3, "0")}`;
    
            dataNguoiDung.maNguoiDung = newID;
            dataNguoiDung.loaiNguoiDung = 'Học viên';
            dataNguoiDung.soDu = 0;
            dataNguoiDung.anhDaiDien = 'http://localhost:1000/uploads/defaultAvatar.png';
    
            const query = 'insert into NguoiDung set ?';
            connection.query(query, dataNguoiDung, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            });
        });
    }
    

    static update(maNguoiDung, data_NguoiDung, callback) {
        const query = 'update NguoiDung set ? where maNguoiDung = ?';
        connection.query(query, [data_NguoiDung, maNguoiDung], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static delete(maNguoiDung, callback) {
        const query = 'delete from NguoiDung where maNguoiDung = ?';
        connection.query(query, [maNguoiDung], (err, results) => {
            if(err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static search(input, callback) {
        const query = `
            select * from NguoiDung 
            where tenNguoiDung COLLATE utf8_general_ci like ? 
               or maNguoiDung like ?`;
        
        const searchValue = `%${input}%`; 
    
        connection.query(query, [searchValue, searchValue], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

    static findByEmail(email, callback) {
        const query = 'select tenNguoiDung, email, soDu, anhDaiDien from NguoiDung where email = ?';

        connection.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
    
}

module.exports = NguoiDung;