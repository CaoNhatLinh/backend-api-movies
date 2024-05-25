const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các thể loại
router.get('/', (req, res) => {
  db.query('SELECT * FROM TheLoai', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Lấy thông tin thể loại theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM TheLoai WHERE MaTheLoai = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result[0]);
    }
  });
});

// Thêm thể loại mới
router.post('/', (req, res) => {
  const theloai = req.body;
  db.query('INSERT INTO TheLoai SET ?', theloai, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId, ...theloai });
    }
  });
});

// Cập nhật thông tin thể loại
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE TheLoai SET ? WHERE MaTheLoai = ?', [newData, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, ...newData });
    }
  });
});

// Xóa thể loại
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM TheLoai WHERE MaTheLoai = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Thể loại đã được xóa' });
    }
  });
});

module.exports = router;
