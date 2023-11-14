document.addEventListener("DOMContentLoaded", () => {
  const selectors = {
    memoForm: document.getElementById('memo-Form'),
    title: document.getElementById('title'),
    content: document.getElementById('content'),
    saveBtn: document.getElementById('saveBtn'),
    memoList: document.querySelector('.memo-list')
  };

  selectors.saveBtn.addEventListener('click', function(event) {
    // preventDefault() : 
    event.preventDefault();
    
    const title = selectors.title.value;
    const content = selectors.content.value;

    if(!title) {
      alert('제목을 입력하세요.')
    } else if(!content) {
      alert('내용을 입력하세요.')
      return;
    }

    //
    createMemo(title, content);
    saveMemoToLocalStorage();
  });
  function createMemo(title, content) {
    const memo = document.createElement('div');
    memo.classList.add('memo-item');
    memo.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    selectors.memoList.appendChild(memo);
  }

  function saveMemoToLocalStorage() {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];
    
  memos.push({title, content});
  localStorage.setItem('momos', JSON.stringify(memos));

  selectors.title.value = ''; // 수정: title을 초기화
  selectors.content.value = ''

  createMemo(title, content);
  loadMemosFromLocalStorage();
  
  function loadMemosFromLocalStorage() {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];

  selectors.memoList.innerHTML = '';


     memos.forEach((memo) => createMemo(memo.title, memo.content));
  }
  }
});
