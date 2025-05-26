const connection = require('../../config/db');

class NguoiDung {

    static index(page, pageSize, count, callback) {

        const offset = (page - 1) * pageSize;

        const query = 
            `
                select maNguoiDung, tenNguoiDung, email, soDu, anhDaiDien, loaiNguoiDung
                from NguoiDung 
                limit ? offset ?
            `;
        
        if (count) {
            const countQuery = `select count(*) as total from NguoiDung`;

            connection.query(countQuery, (err, countResult) => {
                if (err) return callback(err, null);

                const totalItems = countResult[0].total;
                const totalPages = Math.ceil(totalItems / pageSize);

                connection.query(query, [pageSize, offset], (err, dataResult) => {
                    if (err) return callback(err, null);

                    callback(null, {
                        usersData: dataResult,
                        pagination: {
                            totalItems,
                            totalPages,
                            currentPage: page,
                            pageSize
                        }
                    });
                });
            });

        } else {
            connection.query(query, [pageSize, offset], (err, dataResult) => {
                if (err) return callback(err, null);

                callback(null, {
                    usersData: dataResult,
                    pagination: {
                        currentPage: page,
                        pageSize
                    }
                });
            });
        }
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
        const query = 'select maNguoiDung, tenNguoiDung, email, anhDaiDien, soDienThoai, github from NguoiDung where email = ?';

        connection.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
    
    static deposit(amount, maNguoiDUng, callback) {
        const query = 'update nguoiDung set soDu = soDu + ? where maNguoiDUng = ?';
    
        connection.query(query, [amount, maNguoiDUng], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
    
}

module.exports = NguoiDung;