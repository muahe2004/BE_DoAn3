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

    static get_by_User(maNguoiDung, callback) {
        const query = "select * from HoaDonNap where maNguoiDung = ?";
        connection.query(query, [maNguoiDung], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        }) 
    }
}




module.exports = HoaDonNap;