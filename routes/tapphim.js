const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM TapPhim', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Lấy thông tin tập phim theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM TapPhim WHERE MaPhim = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Thêm tập phim mới
router.post('/', (req, res) => {
  const tapphim = req.body;
  db.query('INSERT INTO TapPhim SET ?', tapphim, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, ...tapphim });
  });
});

// Cập nhật thông tin phim
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE TapPhim SET ? WHERE MaTapPhim = ?', [newData, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...newData });
  });
});

// Xóa phim
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM TapPhim WHERE MaTapPhim = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Tập Phim deleted' });
  });
});

module.exports = router;
