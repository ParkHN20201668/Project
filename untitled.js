
const memoInput = document.getElementById('memoInput');
const memoList = document.getElementById('memoList');

function insertNote() {
const memo = memoInput.value;
if (memo.trim() !== '') {
    memoList.innerHTML += `<li>${memo}</li>`;
    alert(`메모가 저장되었습니다:${memo}`);
    memoInput.value = '';
}
}

function searchNote() {
const keyword = memoInput.value;
if (keyword.trim() !== '') {
    const notes = memoList.getElementsByTagName('li');
    let foundNotes = [];
    for (let i = 0; i < notes.length; i++) {
    const note = notes[i].textContent;
    if (note.includes(keyword)) {
        foundNotes.push(note);a
    }
    }
    if (foundNotes.length > 0) {
    alert(`검색 결과:\n${foundNotes.join('\n')}`);
    } else {
    alert('검색 결과가 없습니다.');
    }
    memoInput.value = '';
}
}

function editNote() {
const noteNumber = memoInput.value;
const notes = memoList.getElementsByTagName('li');
if (noteNumber >= 1 && noteNumber <= notes.length) {
    const newNote = prompt('새로운 메모를 입력하세요:');
    if (newNote !== null) {
    notes[noteNumber - 1].textContent = newNote;
    alert('메모가 수정되었습니다.');
    }
    memoInput.value = '';
} else {
    alert('잘못된 메모 번호입니다.');
}
}

function deleteNote() {
const noteNumber = memoInput.value;
const notes = memoList.getElementsByTagName('li');
if (noteNumber >= 1 && noteNumber <= notes.length) {
    if (confirm('정말로 메모를 삭제하시겠습니까?')) {
    notes[noteNumber - 1].remove();
    alert('메모가 삭제되었습니다.');
    }
    memoInput.value = '';
} else {
    alert('잘못된 메모 번호입니다.');
}
}

function displayNotes() {
const notes = memoList.getElementsByTagName('li');
if (notes.length > 0) {
    let allNotes = [];
    for (let i = 0; i < notes.length; i++) {
    allNotes.push(notes[i].textContent);
    }
    alert(`전체 메모 내용:\n${allNotes.join('\n')}`);
} else {
    alert('메모가 없습니다.');
}
memoInput.value = '';
}

function deleteAllNotes() {
    if (confirm('정말로 모든 메모를 삭제하시겠습니까?')) {
        memoList.innerHTML = '';
        alert('모든 메모가 삭제되었습니다.');
    }
    memoInput.value = '';
}