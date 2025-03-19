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

    static create(dataNguoiDung, callback) {
        const query = 'insert into NguoiDung set ?';
        connection.query(query, [dataNguoiDung], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
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
    
}

module.exports = NguoiDung;