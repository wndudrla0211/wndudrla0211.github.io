function toggleNoteForm() {
    const form = document.getElementById('noteForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function submitNote() {
    const textarea = document.querySelector('.note-form textarea');
    const input = document.querySelector('.note-form input');
    const noteText = textarea.value;
    const userName = input.value || '익명';
    
    if (!noteText.trim()) {
        alert('댓글 내용을 입력해주세요.');
        return;
    }

    const note = {
        id: Date.now(),
        text: noteText,
        name: userName,
        date: new Date().toLocaleString('ko-KR')
    };

    let notes = JSON.parse(localStorage.getItem('gameNotes') || '[]');
    notes.unshift(note);
    localStorage.setItem('gameNotes', JSON.stringify(notes));

    displayNotes();
    
    textarea.value = '';
    input.value = '';
    toggleNoteForm();
}

function deleteNote(noteId) {
    if (!confirm('이 댓글을 삭제하시겠습니까?')) {
        return;
    }

    let notes = JSON.parse(localStorage.getItem('gameNotes') || '[]');
    notes = notes.filter(note => note.id !== noteId);
    localStorage.setItem('gameNotes', JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    const notesList = document.getElementById('notesList');
    const notes = JSON.parse(localStorage.getItem('gameNotes') || '[]');

    notesList.innerHTML = notes.map(note => `
        <div class="note-item">
            <button class="delete-btn" onclick="deleteNote(${note.id})">×</button>
            <div class="note-name">${note.name}</div>
            <div class="note-content">${note.text}</div>
            <div class="note-date">${note.date}</div>
        </div>
    `).join('');
}

// 페이지 로드 시 댓글 표시
document.addEventListener('DOMContentLoaded', function() {
    displayNotes();
}); 