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
// Lấy tên người dùng 
router.get('/', (req, res) => {
  db.query('SELECT TenDangNhap FROM NguoiDung;', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});
// Lấy mật khẩu người dùng 
router.get('/', (req, res) => {
  db.query('SELECT MatKhau FROM NguoiDung;', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});
// Lấy Email người dùng 
router.get('/', (req, res) => {
  db.query('SELECT Email FROM NguoiDung;', [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]);
  });
});

// Lấy thông tin người dùng dựa trên tên đăng nhập và mật khẩu
router.post('/login', (req, res) => {
  const { emailOrUsername, password } = req.body;
  db.query('SELECT * FROM NguoiDung WHERE (TenDangNhap = ? OR Email = ?) AND MatKhau = ?', [emailOrUsername, emailOrUsername, password], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // Nếu tìm thấy người dùng với tên đăng nhập hoặc email và mật khẩu đúng
      res.json({ message: 'Đăng nhập thành công', user: result[0] });
    } else {
      // Nếu không tìm thấy người dùng hoặc thông tin đăng nhập không chính xác
      res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
  });
});
module.exports = router;
