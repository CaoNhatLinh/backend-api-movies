const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các phim
router.get('/', (req, res) => {
  db.query('SELECT * FROM Phim', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

router.get('/banner', (req, res) => {
  db.query('SELECT * FROM defaultdb.Phim ORDER BY NgayThem DESC LIMIT 5', (err, results) => {
    if (err) throw err;
    res.json(results);
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

router.get('/search/:name', (req, res) => {
  const name = req.params.name;
  db.query('SELECT * FROM Phim WHERE TenPhim LIKE ?', [`%${name}%`], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});
// Endpoint tìm kiếm phim theo tiêu đề
router.get('/', (req, res) => {
  const name = req.params.name;
  db.query('SELECT * FROM Phim WHERE TieuDe LIKE ?', [`%${name}%`], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(result);
    }
  });
});
module.exports = router;
