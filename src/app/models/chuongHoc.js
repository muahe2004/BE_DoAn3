const connection = require("../../config/db/index");

class ChuongHoc {
    static create (dataChuongHoc, callback) {
        const maxID = 'select max(cast(substring(maChuongHoc, 3, 10) as unsigned)) as maxID from ChuongHoc';

        const query = 'insert into ChuongHoc set ?';

        connection.query(maxID, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            let maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            let newID = `CH${String(maxID).padStart(3, "0")}`;

            dataChuongHoc.maChuongHoc = newID;

            connection.query(query, dataChuongHoc, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            })
        })
    }

    static updateLesson (maChuongHoc, dataChuongHoc, callback) {
        const query = 'update ChuongHoc set ? where maChuongHoc = ?'

        connection.query(query, [dataChuongHoc, maChuongHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static deleteLesson (maChuongHoc, callback) {
        const query = 'delete from ChuongHoc where maChuongHoc = ?';

        connection.query(query, maChuongHoc, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static selection (maKhoaHoc, callback) {
        const query = 'select maChuongHoc, tenChuongHoc from ChuongHoc where maKhoaHoc = ?';

        connection.query(query, maKhoaHoc, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static selection_byLecture(maBaiHoc, callback) {
        const query = 
            `
                select ch.maChuongHoc, ch.tenChuongHoc from ChuongHoc ch where ch.maKhoaHoc = 
                    (
                        select ch2.maKhoaHoc 
                        from BaiHoc bh join ChuongHoc ch2 on bh.maChuongHoc = ch2.maChuongHoc
                        where bh.maBaiHoc = ?
                    )
            `;
        
        connection.query(query, maBaiHoc, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static lessonDetails (maChuongHoc, callback) {
        const query = 
        `select ch.maChuongHoc, ch.tenChuongHoc, kh.maKhoaHoc, kh.tenKhoaHoc 
        from ChuongHoc ch join KhoaHoc kh on ch.maKhoaHoc = kh.maKhoaHoc 
        where ch.maChuongHoc = ?`;

        connection.query(query, maChuongHoc, (err, results) => {
            if (err) {
                return callback(err, results);
            }
            callback(null, results[0]);
        });
    }
}

module.exports = ChuongHoc;