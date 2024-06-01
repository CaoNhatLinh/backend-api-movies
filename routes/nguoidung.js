const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Lấy danh sách tất cả người dùng
router.get('/', (req, res) => {
  db.query('SELECT * FROM NguoiDung', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Lấy thông tin người dùng theo ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM NguoiDung WHERE MaNguoiDung = ?', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Thêm người dùng mới
router.post('/', (req, res) => {
  const nguoidung = req.body;
  db.query('INSERT INTO NguoiDung SET ?', nguoidung, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, ...nguoidung });
  });
});

// Cập nhật thông tin người dùng
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;
  db.query('UPDATE NguoiDung SET ? WHERE MaNguoiDung = ?', [newData, id], (err, result) => {
    if (err) throw err;
    res.json({ id, ...newData });
  });
});

// Xóa người dùng
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM NguoiDung WHERE MaNguoiDung = ?', [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'NguoiDung deleted' });
  });
});
//triệu thêm
// Route để xử lý yêu cầu đăng nhập
router.post('/login', (req, res) => {
  const { emailOrUsername, password } = req.body;

  // Kiểm tra xem emailOrUsername và password có hợp lệ hay không
  db.query('SELECT * FROM NguoiDung WHERE (TenDangNhap = ? OR Email = ?) AND MatKhau = ?', [emailOrUsername, emailOrUsername, password], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Đã xảy ra lỗi khi đăng nhập" });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ message: "Thông tin đăng nhập không đúng" });
      return;
    }

    // Nếu thông tin đăng nhập hợp lệ, trả về thông tin người dùng
    res.json({ message: "Đăng nhập thành công", user: result[0] });
  });
});


module.exports = router;
