const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Yêu cầu các route
const phimRoute = require('./routes/phim');
const nguoiDungRoute = require('./routes/nguoidung');
app.use('/api/phim', phimRoute);
app.use('/api/nguoidung', nguoiDungRoute);
// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
