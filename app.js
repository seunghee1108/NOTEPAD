const express = require('express');
const bodyParser = require('body-parser');
const memoRoutes = require('./routes/routes');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', memoRoutes);


app.listen(PORT, () => {
 console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});