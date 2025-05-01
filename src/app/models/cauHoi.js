const connection = require('../../config/db');

class CauHoi {

    static index(maBaiHoc, callback) {
        const query = 'select * from CauHoi where maBaiHoc = ?';
        connection.query(query, [maBaiHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    } 

    static create_CauHoi(data_CauHoi, callback) {
        if (!data_CauHoi || Object.keys(data_CauHoi).length === 0) {
            return callback(new Error("Dữ liệu không hợp lệ!"), null);
        }
    
        const getMaxIDQuery = 'SELECT MAX(CAST(SUBSTRING(maCauHoi, 3, 10) AS UNSIGNED)) AS maxID FROM CauHoi';
        const insertQuery = 'INSERT INTO CauHoi SET ?';
    
        connection.query(getMaxIDQuery, (err, results) => {
            if (err) {
                return callback(err, null);
            }
    
            const maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            const newID = `CH${String(maxID).padStart(3, '0')}`;
    
            // Gán ID mới cho data
            data_CauHoi.maCauHoi = newID;
    
            // Thực hiện thêm câu hỏi
            connection.query(insertQuery, data_CauHoi, (err, insertResult) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, insertResult);
            });
        });
    }
    

    static update_CauHoi(maCauHoi, data_CauHoi, callback) {
        const query = 'update CauHoi set ? where maCauHoi = ?';
        connection.query(query, [data_CauHoi, maCauHoi], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static delete_CauHoi(maCauHoi, callback) {
        const query = 'delete from CauHoi where maCauHoi = ?';
        connection.query(query, [maCauHoi], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
}

module.exports = CauHoi;