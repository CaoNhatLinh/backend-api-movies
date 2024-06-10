const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả các đánh giá
router.get('/', (req, res) => {
  db.query('SELECT * FROM DanhGia', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Lấy thông tin đánh giá theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM DanhGia WHERE MaDanhGia = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: 'Không tìm thấy đánh giá' });
      }
    }
  });
});

// Thêm đánh giá mới
// router.post('/ThemDanhGia', (req, res) => {
//   const danhgia = req.body;
//   db.query('INSERT INTO DanhGia SET ?', danhgia, (err, result) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//     } else {
//       res.status(201).json({ id: result.insertId, ...danhgia });
//     }
//   });
// });
router.post('/', (req, res) => {
  const {Manguoidung,MapPhim, Danhgia,NgayDanhGia } = req.body;
  db.query('INSERT INTO DanhGia(MaNguoiDung,MaPhim,DanhGia,Date) VALUES (?,?,?,?)', [Manguoidung,MapPhim,Danhgia,NgayDanhGia], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId, ...danhgia });
    }
  });
});

// Cập nhật thông tin đánh giá
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE DanhGia SET ? WHERE MaDanhGia = ?', [newData, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, ...newData });
    }
  });
});

// Xóa đánh giá
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM DanhGia WHERE MaDanhGia = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Đánh giá đã được xóa' });
    }
  });
});

module.exports = router;
