document.addEventListener("DOMContentLoaded", () => {
  const selectors = {
    memoForm: document.getElementById('memo-Form'),
    title: document.getElementById('title'),
    content: document.getElementById('content'),
    saveBtn: document.getElementById('saveBtn'),
    memoList: document.querySelector('.memo-list')
  };

  selectors.saveBtn.addEventListener('click', async function (event) {
    // event.preventDefault() : form에서 button 눌렀을때 동작을 중단시킴
    event.preventDefault();

    const title = selectors.title.value;
    const content = selectors.content.value;

    if(!title) {
      alert('제목을 입력하세요.');
    } else if(!content) {
      alert('내용을 입력하세요.');
      return;
    }

    // 시간 추가
    const timestamp = new Date().toLocaleString();

    // 새로운 메모 객체 생성
    const newMemo = {
      title: title,
      content: content,
      timestamp: timestamp
    };

    try {
      // 엔드포인트
      const response = await fetch('http://localhost:3000/api/memos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMemo),
      });

      if (!response.ok) {
        throw new Error('네트워트 응답이 정상이 아닙니다.');
      }

      //  fetch로 받은 HTTP 응답의 본문을 JSON 형태로 해석
      const result = await response.json();
      console.log('Memo added:', result);

      // creaetMemo : 새로운 메모 생성하고 화면에 표시
      createMemo(result.title, result.content, result.timestamp);

      // 로컬 스토리지에 저장
      saveMemoToLocalStorage(result.title, result.content, result.timestamp);

      // 입력 폼 초기화
      selectors.title.value = '';
      selectors.content.value = '';
    } catch (error) {
      console.error('Error adding memo:', error);
      alert('메모를 추가하는 중에 오류가 발생했습니다.');
    }
  });

  // 메모 작성하면 저장되는 memo-item div 생성
  function createMemo(title, content, timestamp) {
    const memo = document.createElement('div');
    memo.classList.add('memo-item');
    // 동적으로 생성
    memo.innerHTML = `<h2>${title}</h2><p>${content}</p><p>${timestamp}</p>`;
    selectors.memoList.appendChild(memo);
  }

  // 로컬 스토리지에서 이전에 저장된 메모 목록을 불러옴
  function saveMemoToLocalStorage(title, content, timestamp) {
    const memos = JSON.parse(localStorage.getItem('memos')) 

    // push() : 새로운 메모를 memos에 추가 
    // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
    memos.push({ title: title, content: content, timestamp: timestamp });
    localStorage.setItem('memos', JSON.stringify(memos));

    loadMemosFromLocalStorage();
  }

  // 로컬 스토리지에서 메모를 불러와 화면에 표시하는 함수
  function loadMemosFromLocalStorage() {
    // 이전에 저장된 메모 목록을 불러오고, 없으면 빈 배열 생성
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
     // 메모 목록을 초기화
    selectors.memoList.innerHTML = '';
    // 배열 순회하면서 memo에 대해 createMemo 함수를 호출 
    memos.forEach((memo) => createMemo(memo.title, memo.content, memo.timestamp));
  }

  // 새로운 메모를 저장하기 전에 이전 메모를 초기화
  localStorage.removeItem('memos');
  loadMemosFromLocalStorage();
});