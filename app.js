const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

const jsonFilePath = path.join(__dirname, "data.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const memoRouter = require('./routes/routes');
app.use('/api', memoRouter);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});