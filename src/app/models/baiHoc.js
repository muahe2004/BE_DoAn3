const connection = require('../../config/db');
const crypto = require('crypto');

class BaiHoc {

    static getAll_BaiHoc(maChuongHoc, callback) {
        const query = 'select * from BaiHoc where maChuongHoc = ?';
        connection.query(query, [maChuongHoc], (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
    }

    static create_BaiHoc(dataBaiHoc, callback) {
        const maxID = 'select max(cast(substring(maBaiHoc, 3, 10) as unsigned)) as maxID from BaiHoc';

        const query = 'insert into BaiHoc set ?';

        connection.query(maxID, (err, results) => {
            if (err) {
                return callback(err, null);
            }

            let maxID = results[0].maxID ? results[0].maxID + 1 : 1;
            let newID = `BH${String(maxID).padStart(3, "0")}`;

            dataBaiHoc.maBaiHoc = newID;

            connection.query(query, dataBaiHoc, (err, results) => {
                if (err) {
                    return callback(err, null);
                }
                callback(null, results);
            })
        })
    }

    static update_BaiHoc(maBaiHoc, dataBaiHoc, callback) {
        const query = 'update BaiHoc set ? where maBaiHoc = ?';
        connection.query(query, [dataBaiHoc, maBaiHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static delete_BaiHoc(maBaiHoc, callback) {
        const query = 'delete from BaiHoc where maBaiHoc = ?';
        connection.query(query, [maBaiHoc], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }
   
    static search(maBaiHoc, callback) {
        const query = 
            `
                select bh.maBaiHoc, bh.tenBaiHoc, bh.moTaBaiHoc, bh.video, ch.maChuongHoc, ch.tenChuongHoc, kh.maKhoaHoc
                from BaiHoc bh inner join ChuongHoc ch on bh.maChuongHoc = ch.maChuongHoc
                    inner join KhoaHoc kh on kh.maKhoaHoc = ch.maKhoaHoc
                where maBaiHoc = ?;
            `;
        connection.query(query, maBaiHoc, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results[0]);
        })
    }
    
    static get_first_lecture(maKhoaHoc, callback) {
        
        const query = 
            `
                select bh.*
                from BaiHoc bh 
                    join ChuongHoc ch on bh.maChuongHoc = ch.maChuongHoc
                    join KhoaHoc kh on ch.maKhoaHoc = kh.maKhoaHoc
                where kh.maKhoaHoc = ?
                order by ch.maChuongHoc, bh.maBaiHoc
                limit 1;
            `;

        connection.query(query, maKhoaHoc, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        })
    };

    static get_Learning_Lecture(info, callback) {
        const query = 
            `
                select bh.maBaiHoc, bh.tenBaiHoc, bh.moTaBaiHoc, bh.video, bh.maChuongHoc, td.maTienDo, td.daHoanThanh 
                from BaiHoc bh join TienDoHoc td on td.maBaiHoc = bh.maBaiHoc where maChuongHoc = ? and maNguoiDung = ?;
            `;
        
        connection.query(query, info, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        })
    }

    static set_Learned(info, callback) {
        const query = `update TienDoHoc set daHoanThanh = 1 where maBaiHoc = ? and maNguoiDung = ?`;

        connection.query(query, info, (err, result) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, result);
        })
    }

    static insert_TienDo(data, callback) {
        const { maNguoiDung, baiHocList } = data;

        if (!maNguoiDung || !Array.isArray(baiHocList) || baiHocList.length === 0) {
            return callback(new Error("Dữ liệu không hợp lệ"));
        }

        // Bước 1: Tạo mã tiến độ ngẫu nhiên cho mỗi bài học
        const generateRandomString = (length = 24) => {
            return crypto.randomBytes(length).toString('hex').slice(0, length);
        };

        // Bước 2: Tạo dữ liệu thêm
        const values = baiHocList.map((maBaiHoc) => {
            const newMaTienDo = generateRandomString();  
            return [newMaTienDo, maNguoiDung, maBaiHoc];  
        });

        const insertQuery = "insert into TienDoHoc (MaTienDo, MaNguoiDung, MaBaiHoc) VALUES ?";

        connection.query(insertQuery, [values], (err2, result2) => {
            if (err2) return callback(err2);
            callback(null, result2);
        });
    }
}

module.exports = BaiHoc;