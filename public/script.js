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
      alert('제목을 입력하세요.')
    } else if(!content) {
      alert('내용을 입력하세요.')
      return;
    }

    // creatMemo
    createMemo(title, content);
    // 
    saveMemoToLocalStorage();
  });
  // div 생성
  function createMemo(title, content) {
    const memo = document.createElement('div');
    memo.classList.add('memo-item');
    // 동적으로 생성
    memo.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    selectors.memoList.appendChild(memo);
  }

  function saveMemoToLocalStorage() {
    console.log("Saving memo:", title, content);
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    
  memos.push({ title: selectors.title.value, content: selectors.content.value });
  localStorage.setItem('momos', JSON.stringify(memos));

  selectors.title.value = ''; // title 초기화
  selectors.content.value = ''; // content 초기화

  loadMemosFromLocalStorage();
}

function loadMemosFromLocalStorage() {
  const memos = JSON.parse(localStorage.getItem('memos')) || [];

  selectors.memoList.innerHTML = '';

  memos.forEach((memo) => createMemo(memo.title, memo.content));
}

// 새로운 메모를 저장하기 전에 이전 메모를 초기화
localStorage.removeItem('memos');
loadMemosFromLocalStorage();
});

