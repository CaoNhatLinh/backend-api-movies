const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Yêu cầu các route
const phimRoute = require('./routes/phim');
const nguoiDungRoute = require('./routes/nguoidung');
const tapPhimRoute = require('./routes/tapphim');
const quocgiaRoute = require('./routes/quocgia');
const binhLuanRoute = require('./routes/binhluan');
const danhGiaRoute = require('./routes/danhgia');
const phimTheLoaiRoute = require('./routes/phim_theloai');
const yeuThichRoute = require('./routes/yeuthich');
const theLoaiRoute = require('./routes/theloai');
const phim_nguoiDungRoute = require('./routes/phim_nguoidung');


app.use('/api/phim', phimRoute);
app.use('/api/nguoidung', nguoiDungRoute);
app.use('/api/tapPhim', tapPhimRoute);
app.use('/api/quocgia', quocgiaRoute);
app.use('/api/binhluan', binhLuanRoute);
app.use('/api/danhgia', danhGiaRoute);
app.use('/api/phim_theloai', phimTheLoaiRoute);
app.use('/api/yeuthich', yeuThichRoute);
app.use('/api/theloai', theLoaiRoute);
app.use('/api/phim_nguoidung', phim_nguoiDungRoute);
// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
