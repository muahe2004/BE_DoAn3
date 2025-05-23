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
}




module.exports = HoaDonNap;