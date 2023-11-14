document.addEventListener("DOMContentLoaded", () => {
  const selectors = {
    memoForm: document.getElementById('memo-Form'),
    title: document.getElementById('title'),
    content: document.getElementById('content'),
    saveBtn: document.getElementById('saveBtn'),
    memoList: document.querySelector('.memo-list')
  };

  selectors.saveBtn.addEventListener('click', function(event) {
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

    // creaetMemo : 새로운 메모 생성하고 화면에 표시
    createMemo(title, content, timestamp);
    // 로컬 스토리지에 저장
    saveMemoToLocalStorage(title, content, timestamp);

      selectors.title.value = ''; // title 초기화
      selectors.content.value = ''; // content 초기화

  });
  // 메모 작성하면 저장되는 memo-item div 생성
  function createMemo(title, content, timestamp) {
    const memo = document.createElement('div');
    memo.classList.add('memo-item');
    // 동적으로 생성
    memo.innerHTML = `<h2>${title}</h2><p>${content}</p><P>${timestamp}</p>`;
    selectors.memoList.appendChild(memo);
  }

  // 로컬 스토리지에서 이전에 저장된 메모 목록을 불러오고, 
  // 이전에 저장된 메모가 없는 경우 빈 배열을 사용
  function saveMemoToLocalStorage(title, content, timestamp) {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
     
  // push() : 새로운 메모를 memos에 추가 
  // 배열을 JSON 문자열로 변환하여 로컬 스토리지에 저장
  // 오류
  memos.push({ title: title, content: content, timestamp:timestamp });
  localStorage.setItem('memos', JSON.stringify(memos));

  loadMemosFromLocalStorage();
}

function loadMemosFromLocalStorage() {
  const memos = JSON.parse(localStorage.getItem('memos')) || [];

  selectors.memoList.innerHTML = '';
  
  // 배열 순회하면서 memo에 대해 createMemo 함수를 호출 
  memos.forEach((memo) => createMemo(memo.title, memo.content, memo.timestamp));
}

// 새로운 메모를 저장하기 전에 이전 메모를 초기화
localStorage.removeItem('memos');
loadMemosFromLocalStorage();
});

