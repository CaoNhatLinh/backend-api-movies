const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các quốc gia
router.get('/', (req, res) => {
  db.query('SELECT * FROM QuocGia', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Lấy thông tin quốc gia theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM QuocGia WHERE MaQuocGia = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: 'Không tìm thấy quốc gia' });
      }
    }
  });
});

// Thêm quốc gia mới
router.post('/', (req, res) => {
  const quocgia = req.body;
  db.query('INSERT INTO QuocGia SET ?', quocgia, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId, ...quocgia });
    }
  });
});

// Cập nhật thông tin quốc gia
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE QuocGia SET ? WHERE MaQuocGia = ?', [newData, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, ...newData });
    }
  });
});

// Xóa quốc gia
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM QuocGia WHERE MaQuocGia = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Quốc gia deleted' });
    }
  });
});

module.exports = router;
