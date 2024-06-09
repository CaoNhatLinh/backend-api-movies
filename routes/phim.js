const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các phim
router.get('/', (req, res) => {
  db.query('SELECT * FROM Phim ORDER BY NgayThem DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// banner
router.get('/banner', (req, res) => {
  db.query('SELECT * FROM defaultdb.Phim WHERE Banner IS NOT NULL ORDER BY NgayThem DESC LIMIT 5', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
// phim mới
router.get('/phimmoi', (req, res) => {
  db.query('SELECT * FROM defaultdb.Phim ORDER BY NgayThem DESC LIMIT 10', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
//top phim Trung quốc
router.get('/china/top', (req, res) => {
  const sql = `
    SELECT Phim.*
    FROM defaultdb.Phim
    WHERE Phim.QuocGia like '%China%'
    ORDER BY Phim.NgayThem DESC
    LIMIT 10;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
//top list phim Trung quốc
router.get('/china', (req, res) => {
  const sql = `
    SELECT Phim.*
    FROM defaultdb.Phim
    WHERE Phim.QuocGia like '%China%'
    ORDER BY Phim.NgayThem DESC
    ;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
//top phim Hàn
router.get('/korea/top', (req, res) => {
  const sql = `
    SELECT Phim.*
    FROM defaultdb.Phim
    WHERE Phim.QuocGia like '%Korea%'
    ORDER BY Phim.NgayThem DESC
    LIMIT 10;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
//list phim Hàn
router.get('/korea', (req, res) => {
  const sql = `
    SELECT Phim.*
    FROM defaultdb.Phim
    WHERE Phim.QuocGia like '%Korea%'
    ORDER BY Phim.NgayThem DESC
   ;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
//Top anime
router.get('/anime/top', (req, res) => {
  const sql = `
    SELECT Phim.*
   FROM defaultdb.Phim
    JOIN defaultdb.Phim_TheLoai ON Phim.MaPhim = Phim_TheLoai.MaPhim
    JOIN defaultdb.TheLoai ON TheLoai.MaTheLoai = Phim_TheLoai.MaTheLoai
    WHERE TheLoai.TenTheLoai = 'Anime'
    ORDER BY Phim.NgayThem DESC
    LIMIT 10;
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
//list anime
router.get('/anime', (req, res) => {
  const sql = `
    SELECT Phim.*
    FROM defaultdb.Phim
    JOIN defaultdb.Phim_TheLoai ON Phim.MaPhim = Phim_TheLoai.MaPhim
    JOIN defaultdb.TheLoai ON TheLoai.MaTheLoai = Phim_TheLoai.MaTheLoai
    WHERE TheLoai.TenTheLoai = 'Anime'
    ORDER BY Phim.NgayThem DESC

  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
//Top phim lãng mãn
router.get('/love/top', (req, res) => {
  const sql = `
    SELECT Phim.*
    FROM defaultdb.Phim
    JOIN defaultdb.Phim_TheLoai ON Phim.MaPhim = Phim_TheLoai.MaPhim
    JOIN defaultdb.TheLoai ON TheLoai.MaTheLoai = Phim_TheLoai.MaTheLoai
    WHERE TheLoai.TenTheLoai = 'Lãng mãn' or TheLoai.TenTheLoai = 'Tình cảm'
    ORDER BY Phim.NgayThem DESC
    LIMIT 10
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
//list phim lãng mãn
router.get('/love', (req, res) => {
  const sql = `
    SELECT Phim.*
    FROM defaultdb.Phim
    JOIN defaultdb.Phim_TheLoai ON Phim.MaPhim = Phim_TheLoai.MaPhim
    JOIN defaultdb.TheLoai ON TheLoai.MaTheLoai = Phim_TheLoai.MaTheLoai
    WHERE TheLoai.TenTheLoai = 'Lãng mãn' or TheLoai.TenTheLoai = 'Tình cảm'
    ORDER BY Phim.NgayThem DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
});
// Lấy thông tin phim theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM Phim WHERE MaPhim = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Thêm phim mới
router.post('/', (req, res) => {
  const phim = req.body;
  db.query('INSERT INTO Phim SET ?', phim, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, ...phim });
  });
});

// Cập nhật thông tin phim
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE Phim SET ? WHERE MaPhim = ?', [newData, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...newData });
  });
});

// Xóa phim
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Phim WHERE MaPhim = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Phim deleted' });
  });
});

// Định nghĩa route tìm kiếm phim
router.get('/search', (req, res) => {
  const name =  req.query.name; // Lấy tên phim từ query parameter
  db.query('SELECT * FROM Phim WHERE TieuDe LIKE ?', [`%${name}%`], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});

router.get('/search1/:title', (req, res) => {
  const title = req.params.title; // Lấy tiêu đề phim từ path variable
  const query = 'SELECT * FROM Phim WHERE TieuDe LIKE ?';
  const values = [`%${title}%`]; // Định dạng giá trị cho SQL query

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});


router.get('/:phimId/danhgia', (req, res) => {
  const phimId = req.params.phimId;
  db.query('SELECT * FROM DanhGia WHERE MaPhim = ?', [phimId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
router.get('/:phimId/theloai', (req, res) => {
  const phimId = req.params.phimId;
  const sql = `SELECT TheLoai.MaTheLoai, TheLoai.TenTheLoai 
               FROM Phim_TheLoai 
               JOIN TheLoai ON Phim_TheLoai.MaTheLoai = TheLoai.MaTheLoai 
               WHERE Phim_TheLoai.MaPhim = ?`;
  db.query(sql, [phimId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});
router.post('/:phimId/danhgia', (req, res) => {
  const phimId = req.params.phimId;
  const danhGia = req.body; 
  db.query('INSERT INTO DanhGia (MaPhim, MaNguoiDung, DanhGia, NgayDanhGia) VALUES (?, ?, ?, NOW())', 
           [phimId, danhGia.maNguoiDung, danhGia.danhGia], (err, result) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.status(201).json({ message: 'Đánh giá đã được gửi thành công' }); 
    }
  });
});
router.put('/:phimId/danhgia/:userId', (req, res) => {
  const phimId = req.params.phimId;
  const userId = req.params.userId;
  const newDanhGia = req.body.danhGia; 

  db.query('UPDATE DanhGia SET DanhGia = ?, NgayDanhGia = NOW() WHERE MaPhim = ? AND MaNguoiDung = ?', 
           [newDanhGia, phimId, userId], (err, result) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Review not found for this user and movie' });
      } else {
        res.status(200).json({ message: 'Review updated successfully' }); 
      }
    }
  });
});
router.get('/:phimId/comments', (req, res) => {
  const phimId = req.params.phimId;
  db.query('SELECT * FROM BinhLuan WHERE MaPhim = ?', [phimId], (err, results) => {
    if (err) {
      console.error(err); 
      res.status(500).json({ error: 'Database query failed' }); 
    } else {
      res.json(results); 
    }
  });
}); 
router.post('/:phimId/comments', (req, res) => {
  const phimId = req.params.phimId;
  const { maNguoiDung, noiDung } = req.body; 
  db.query('INSERT INTO BinhLuan (MaPhim, MaNguoiDung, NoiDung) VALUES (?, ?, ?)', [phimId, maNguoiDung, noiDung], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.status(201).json({ message: 'Bình luận đã được thêm thành công' });
    }
  });
});
router.get('/:phimId/danhgia/:userId', (req, res) => {
  const phimId = req.params.phimId;
  const userId = req.params.userId;

  db.query('SELECT * FROM DanhGia WHERE MaPhim = ? AND MaNguoiDung = ?', [phimId, userId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Database query failed' });
    } else {
      if (result.length > 0) {
        res.json({ hasRated: true, rating: result[0].DanhGia });
      } else {
        res.json({ hasRated: false });
      }
    }
  });
});


module.exports = router;