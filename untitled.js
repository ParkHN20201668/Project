const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const notesFile = 'notes.txt';

function insertNote() {
    rl.question('메모를 입력하세요: ', (note) => {
        fs.appendFile(notesFile, note + '\n', (err) => {
            if (err) throw err;
            console.log('메모가 저장되었습니다.');
            showMenu();
        });
    });
}

function searchNote() {
    rl.question('검색할 키워드를 입력하세요: ', (keyword) => {
        fs.readFile(notesFile, 'utf8', (err, data) => {
            if (err) throw err;
            const notes = data.split('\n');
            const matchingNotes = notes.filter((note) => note.includes(keyword));
            if (matchingNotes.length > 0) {
                console.log('검색 결과:');
                matchingNotes.forEach((note) => {
                    console.log(note);
                });
            } else {
                console.log('검색 결과가 없습니다.');
            }
            showMenu();
        });
    });
}

function editNote() {
    rl.question('수정할 메모의 번호를 입력하세요: ', (noteNumber) => {
        fs.readFile(notesFile, 'utf8', (err, data) => {
            if (err) throw err;
            const notes = data.split('\n');
            if (noteNumber >= 1 && noteNumber <= notes.length) {
                rl.question('새로운 메모를 입력하세요: ', (newNote) => {
                    notes[noteNumber - 1] = newNote;
                    fs.writeFile(notesFile, notes.join('\n'), (err) => {
                        if (err) throw err;
                        console.log('메모가 수정되었습니다.');
                        showMenu();
                    });
                });
            } else {
                console.log('잘못된 메모 번호입니다.');
                showMenu();
            }
        });
    });
}

function deleteNote() {
    rl.question('삭제할 메모의 번호를 입력하세요: ', (noteNumber) => {
        fs.readFile(notesFile, 'utf8', (err, data) => {
            if (err) throw err;
            const notes = data.split('\n');
            if (noteNumber >= 1 && noteNumber <= notes.length) {
                notes.splice(noteNumber - 1, 1);
                fs.writeFile(notesFile, notes.join('\n'), (err) => {
                    if (err) throw err;
                    console.log('메모가 삭제되었습니다.');
                    showMenu();
                });
            } else {
                console.log('잘못된 메모 번호입니다.');
                showMenu();
            }
        });
    });
}

function displayNotes() {
    fs.readFile(notesFile, 'utf8', (err, data) => {
        if (err) throw err;
        const notes = data.split('\n');
        console.log('===== 전체 메모 내용 =====');
        notes.forEach((note, index) => {
            if (note.trim() !== '') {
                console.log(`${index + 1}. ${note}`);
            } //공백에도 번호가 붙어서 출력되는걸 방지
        });
        console.log('=======================');
        showMenu();
    });
}
//전체 메모 내역 확인

function showMenu() {
    console.log('===== 메모장 =====');
    console.log('1. 메모 삽입');
    console.log('2. 메모 검색');
    console.log('3. 메모 수정');
    console.log('4. 메모 삭제');
    console.log('5. 메모 확인');
    console.log('0. 종료');
    console.log('=================');
    rl.question('원하는 작업을 선택하세요: ', (choice) => {
        switch(choice) {
            case '1':
                insertNote();
                break;
            case '2':
                searchNote();
                break;
            case '3':
                editNote();
                break;
            case '4':
                deleteNote();
                break;
            case '5':
                displayNotes();
                break;
            case '0':
                rl.close();
                break;
            default:
                console.log('잘못된 선택입니다.');
                showMenu();
                break;
        }
    });
}

showMenu();