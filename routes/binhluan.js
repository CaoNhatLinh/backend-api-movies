const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các bình luận
router.get('/', (req, res) => {
  db.query('SELECT * FROM BinhLuan', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Lấy thông tin bình luận theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM BinhLuan WHERE MaBinhLuan = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: 'Không tìm thấy bình luận' });
      }
    }
  });
});

// Thêm bình luận mới
router.post('/', (req, res) => {
  const binhluan = req.body;
  db.query('INSERT INTO BinhLuan SET ?', binhluan, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId, ...binhluan });
    }
  });
});

// Cập nhật thông tin bình luận
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE BinhLuan SET ? WHERE MaBinhLuan = ?', [newData, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, ...newData });
    }
  });
});

// Xóa bình luận
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM BinhLuan WHERE MaBinhLuan = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Bình luận đã được xóa' });
    }
  });
});

module.exports = router;
