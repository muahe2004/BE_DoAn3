const connection = require("../../config/db");

class HoaDon {
    static create(dataHoaDon, callback) {

        const getMaxIDQuery = 'select max(cast(substring(maHoaDon, 3, 10) AS UNSIGNED)) as maxID from HoaDon';
        const insertQuery = 'insert into HoaDon set ?';
        
        connection.query(getMaxIDQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }
    
            const maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            const newID = `BILL${String(maxID).padStart(3, '0')}`;
    
            dataHoaDon.maHoaDon = newID;
    
            connection.query(insertQuery, dataHoaDon, (err, insertResult) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, insertResult);
            });
        });
    }

    static get_by_ID(maHoaDon, callback) {
        const query = "select * from HoaDon where maHoaDon = ?";
        connection.query(query, [maHoaDon], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results)
        })
    }

    static get_by_User(page, pageSize, count, maNguoiDung, callback) {
        const offset = (page - 1) * pageSize;

        const query = `
            select * from HoaDon 
            where maNguoiDung = ? 
            order by createdAt desc
            limit ? offset ?
        `;

        if (count) {
            const countQuery = `select count(*) as total from HoaDon where maNguoiDung = ?`;

            connection.query(countQuery, [maNguoiDung], (err, countResult) => {
                if (err) return callback(err, null);

                const totalItems = countResult[0].total;
                const totalPages = Math.ceil(totalItems / pageSize);

                connection.query(query, [maNguoiDung, pageSize, offset], (err, dataResult) => {
                    if (err) return callback(err, null);

                    callback(null, {
                        invoicesData: dataResult,
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
            connection.query(query, [maNguoiDung, pageSize, offset], (err, dataResult) => {
                if (err) return callback(err, null);

                callback(null, {
                    invoicesData: dataResult,
                    pagination: {
                        currentPage: page,
                        pageSize
                    }
                });
            });
        }
    }
}

module.exports = HoaDon;