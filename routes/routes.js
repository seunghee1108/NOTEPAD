const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// /memos 엔드포인트에 대한 POST 요청을 처리하는 라우터
router.post('/memos', (req, res) => {
  try {
    const dataPath = path.join(__dirname, '..', 'data', 'data.json');

    // 기존 메모 읽어오기
    const memos = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // 새로운 메모 추가
    const newMemo = req.body;
    memos.push(newMemo);

    // 업데이트된 메모를 파일에 저장
    fs.writeFileSync(dataPath, JSON.stringify(memos, null, 2), 'utf-8');

    // 성공적으로 추가된 메모를 응답으로 전송
    res.status(201).json(newMemo);
  } catch (error) {
    console.error('메모 추가 중 오류 발생:', error);
    res.status(500).send('내부 서버 오류');
  }
});

module.exports = router;
