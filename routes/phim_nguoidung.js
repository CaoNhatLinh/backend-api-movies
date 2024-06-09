const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const maNguoiDung = req.query.maNguoiDung;

  if (!maNguoiDung) {
    return res.status(400).json({ error: 'Thiếu MaNguoiDung' });
  }

  // Truy vấn cơ sở dữ liệu với maNguoiDung
  db.query('SELECT * FROM defaultdb.phim_nguoiDung WHERE MaNguoiDung = ?', [maNguoiDung], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Kiểm tra nếu không có bản ghi nào được tìm thấy
    if (results.length === 0) {
      return res.status(404).json({ 
        error: `Không tìm thấy bản ghi nào cho MaNguoiDung đã cho: ${maNguoiDung}` 
      });
    }

    // Trả về kết quả nếu có bản ghi được tìm thấy
    res.json(results);
  });
});
// Lấy thông tin chi tiết của một bản ghi theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM phim_nguoiDung WHERE maPhim_NguoiDung = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ error: 'Không tìm thấy bản ghi' });
      }
    }
  });
});

// Thêm một bản ghi mới vào bảng phim_nguoiDung
router.post('/', (req, res) => {
  const phimNguoiDung = req.body;
  db.query('INSERT INTO phim_nguoiDung SET ?', phimNguoiDung, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId, ...phimNguoiDung });
    }
  });
});

// Cập nhật thông tin của một bản ghi
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE phim_nguoiDung SET ? WHERE maPhim_NguoiDung = ?', [newData, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id, ...newData });
    }
  });
});

// Xóa một bản ghi khỏi bảng phim_nguoiDung
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM phim_nguoiDung WHERE maPhim_NguoiDung = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Bản ghi đã được xóa' });
    }
  });
});

module.exports = router;
