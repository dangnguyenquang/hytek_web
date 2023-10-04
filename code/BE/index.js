const express = require('express');
const app = express();
const port = 3000;
const db = require("./config/database");
const route = require("./routes/index");

app.use(express.json());

// Kết nối với database
db.connect();

// Route init
route(app);

// run server
app.listen(port, () => {
  console.log(`Máy chủ Node.js đang chạy tại http://localhost:${port}`);
});
