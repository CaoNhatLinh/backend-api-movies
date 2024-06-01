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
// Lấy mật khẩu người dùng
router.get('/password', (req, res) => {
  const { emailOrUsername } = req.query;
  db.query('SELECT MatKhau FROM NguoiDung WHERE TenDangNhap = ? OR Email = ?', [emailOrUsername, emailOrUsername], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({ password: result[0].MatKhau });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  });
});
// Lấy thông tin người dùng dựa trên tên đăng nhập hoặc email
router.get('/info', (req, res) => {
  const { emailOrUsername } = req.query;
  db.query('SELECT * FROM NguoiDung WHERE TenDangNhap = ? OR Email = ?', [emailOrUsername, emailOrUsername], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json({ user: result[0] });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
  });
});



// Lấy thông tin người dùng dựa trên tên đăng nhập và mật khẩu
router.post('/', (req, res) => {
  const { emailOrUsername, password } = req.body;
  // Truy vấn cơ sở dữ liệu để lấy người dùng có tên đăng nhập hoặc email tương ứng
  db.query('SELECT * FROM NguoiDung WHERE (TenDangNhap = ? OR Email = ?)', [emailOrUsername, emailOrUsername], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // Nếu có người dùng tồn tại với tên đăng nhập hoặc email tương ứng
      const user = result[0];
      // Kiểm tra xem mật khẩu nhập vào có khớp với mật khẩu trong cơ sở dữ liệu hay không
      if (user.MatKhau === password) {
        res.json({ message: 'Đăng nhập thành công', user });
      } else {
        res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      }
    } else {
      res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }
  });
});


module.exports = router;
