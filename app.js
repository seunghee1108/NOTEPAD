const express = require('express');
const app = express();
const path = require('path');
const jsonFolderPath = path.join(__dirname, 'data');
const jsonFilePath = path.join(jsonFolderPath, 'data.json');
const port = 3000;

const memoRouter = require('./router/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', memoRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 에러 핸들링 미들웨어
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
