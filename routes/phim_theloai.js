const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các thể loại của phim
router.get('/', (req, res) => {
  db.query('SELECT * FROM Phim_TheLoai', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Lấy thông tin thể loại của phim theo ID phim
router.get('/:maPhim', (req, res) => {
  const maPhim = req.params.maPhim;
  db.query('SELECT * FROM Phim_TheLoai WHERE MaPhim = ?', [maPhim], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Thêm thể loại mới cho phim
router.post('/', (req, res) => {
  const phimTheLoai = req.body;
  db.query('INSERT INTO Phim_TheLoai SET ?', phimTheLoai, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ ...phimTheLoai });
    }
  });
});

// Cập nhật thể loại của phim
router.put('/:maPhim/:maTheLoai', (req, res) => {
  const maPhim = req.params.maPhim;
  const maTheLoai = req.params.maTheLoai;
  const newData = req.body;
  db.query('UPDATE Phim_TheLoai SET ? WHERE MaPhim = ? AND MaTheLoai = ?', [newData, maPhim, maTheLoai], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ maPhim, maTheLoai, ...newData });
    }
  });
});

// Xóa thể loại của phim
router.delete('/:maPhim/:maTheLoai', (req, res) => {
  const maPhim = req.params.maPhim;
  const maTheLoai = req.params.maTheLoai;
  db.query('DELETE FROM Phim_TheLoai WHERE MaPhim = ? AND MaTheLoai = ?', [maPhim, maTheLoai], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Thể loại của phim đã được xóa' });
    }
  });
});

module.exports = router;
