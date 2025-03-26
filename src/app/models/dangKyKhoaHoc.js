const connection = require("../../config/db");

class DangKyKhoaHoc {
    static create(dataDangKy, callback) {
        const maxIDQuery = 'select max(cast(substring(maDangKy, 3, 10) as unsigned)) as maxID from DangKyKhoaHoc';

        connection.query(maxIDQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            let maxID =  results[0].maxID ? results[0].maxID + 1 : 1;
            let newID = `DK${String(maxID).padStart(3, "0")}`;

            dataDangKy.maDangKy = newID;

            const query = 'insert into DangKyKhoaHoc set ?';

            connection.query(query, dataDangKy, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            })
        })

        
    }
};

module.exports = DangKyKhoaHoc;