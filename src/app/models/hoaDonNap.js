const connection = require("../../config/db");

class HoaDonNap {
    static create(dataHoaDonNap, callback) {
        const query = "insert into HoaDonNap set ?";
        connection.query(query, dataHoaDonNap, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return (null, results);
        })
    }

    static get_by_ID(maHoaDon, callback) {
        const query = "select * from HoaDonNap where maHoaDon = ?";
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
            select * from HoaDonNap 
            where maNguoiDung = ? 
            order by createdAt desc
            limit ? offset ?
        `;

        if (count) {
            const countQuery = `select count(*) as total from HoaDonNap where maNguoiDung = ?`;

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




module.exports = HoaDonNap;