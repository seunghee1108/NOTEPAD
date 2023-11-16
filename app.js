const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;


app.use(bodyParser.json());

app.use(express.static('public'));


app.post('/api/memos', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'data.json');

   
    const memos = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    const newMemo = req.body;
    memos.push(newMemo);

    
    fs.writeFileSync(dataPath, JSON.stringify(memos, null, 2), 'utf-8');

    res.status(201).json(newMemo); 
  } catch (error) {
    console.error('Error adding memo:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
