const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các phim yêu thích
router.get('/', (req, res) => {
  db.query('SELECT * FROM YeuThich', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Lấy danh sách phim yêu thích của người dùng theo ID người dùng
router.get('/:maNguoiDung', (req, res) => {
  const maNguoiDung = req.params.maNguoiDung;
  db.query('SELECT * FROM YeuThich WHERE MaNguoiDung = ?', [maNguoiDung], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Thêm phim yêu thích mới cho người dùng
router.post('/', (req, res) => {
  const yeuThich = req.body;
  db.query('INSERT INTO YeuThich SET ?', yeuThich, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ ...yeuThich });
    }
  });
});

// Xóa phim yêu thích của người dùng
router.delete('/:maNguoiDung/:maPhim', (req, res) => {
  const maNguoiDung = req.params.maNguoiDung;
  const maPhim = req.params.maPhim;
  db.query('DELETE FROM YeuThich WHERE MaNguoiDung = ? AND MaPhim = ?', [maNguoiDung, maPhim], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Phim yêu thích đã được xóa' });
    }
  });
});

module.exports = router;
