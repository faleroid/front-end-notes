import {
  getAllNotes,
  createNote,
  getSingleNote,
} from '../handler/notesHandler.js'; 
import '../components/elements/myTitle.js';
import '../components/elements/myForm.js';
import '../components/elements/popUp.js';
import '../components/elements/noteItem.js';
import '../components/elements/notesList.js';
import '../components/elements/myFooter.js';
import '../components/attributes/footerColor.js';
import { showPopup } from './showPopUp.js';
import {
  clearBodyWarning,
  clearTitleWarning,
  addBodyWarning,
  addTitleWarning,
  clearAllTrigger,
} from './formValidations.js';
import { footerColor } from '../components/attributes/footerColor.js';

document.addEventListener('DOMContentLoaded', async () => {
  const noteDetailModal = document.getElementById('noteDetailModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  
  const form = document.getElementById('noteForm');
  const noteList = document.querySelector('note-list');

  const noteTitle = document.getElementById('noteTitle');
  const descTitleValidation = document.getElementById('titleValidation');

  const noteBody = document.getElementById('noteBody');
  const bodyValidation = parseInt(noteBody.getAttribute('minlength'));
  const descBodyValidation = document.getElementById('bodyValidation');

  descTitleValidation.classList.add('hidden');
  descBodyValidation.classList.add('hidden');

  footerColor('gray');

  try {
    const response = await getAllNotes(); 
    console.log(`LOG:`, response.data); 
    noteList.setNoteList(response.data); 
  } catch (error) {
    showPopup('Gagal menampilkan catatan', 'error');
    console.error(error);
  }


form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const body = noteBody.value.trim();
  if (!title || body.length < bodyValidation){
     if(!title && body.length < bodyValidation){
        noteTitle.classList.add('warning');
        descTitleValidation.classList.remove('hidden');
        noteBody.classList.add('warning');
        descBodyValidation.classList.remove('hidden');
        showPopup('Isi catatan terlebih dahulu', 'error');

        clearBodyWarning(3000);
        clearTitleWarning(3000);
        return;
     }else if (!title){
        noteTitle.classList.add('warning');
        showPopup('Judul catatan belum diisi', 'error');

        clearTitleWarning(3000);
        return;
    } else{
        noteBody.classList.add('warning');
        descBodyValidation.classList.remove('hidden');
        showPopup('Isi catatan harus mengandung minimal 10 karakter', 'error');

        clearBodyWarning(3000);
        return;
    }
  }

  const newNote = {
    title,
    body,
  };

  try {
    await createNote(newNote);
    const response = await getAllNotes();
    noteList.setNoteList(response.data);

    showPopup('Horeee, Catatanmu berhasil disimpan!', 'success');
    clearAllTrigger();
    form.reset();
  } catch (error) {
    showPopup('Gagal menyimpan catatan ke server', 'error');
    console.error(error);
  }
});

 noteList.addEventListener('note-clicked', async (event) => {
    const { noteId } = event.detail;
    closeModalBtn.classList.remove('hidden');

    try {
      const response = await getSingleNote(noteId);
      if (response.data) {
        showNoteDetail(response.data);
      }
    } catch (error) {
      console.error('Gagal mengambil detail catatan:', error);
      showPopup('Gagal menampilkan detail', 'error');
    }
  });

  const showNoteDetail = (note) => {
    document.getElementById('modalTitle').textContent = note.title;
    document.getElementById('modalBody').textContent = note.body;
    
    const noteDate = new Date(note.createdAt).toLocaleString('id-ID', {
      dateStyle: 'full',
      timeStyle: 'short',
    });
    document.getElementById('modalDate').textContent = `${noteDate}`;

    noteDetailModal.classList.remove('hidden');
  };

  closeModalBtn.addEventListener('click', () => {
    noteDetailModal.classList.add('hidden');
  });

  noteDetailModal.addEventListener('click', (event) => {
    if (event.target === noteDetailModal) {
      noteDetailModal.classList.add('hidden');
    }
  });

noteTitle.addEventListener('focus', () => {
  const title = noteTitle.value.trim();
  if (!title) {
    addTitleWarning();
  }
});

noteTitle.addEventListener('input', () => {
  const title = noteTitle.value.trim();
  if (title) {
    clearTitleWarning(0);
    noteTitle.classList.add('passed');
  } else{
    noteTitle.classList.remove('passed');
    addTitleWarning();
  }
  });

noteTitle.addEventListener('blur', ()=>{
  clearTitleWarning(3000);
});

noteBody.addEventListener('focus', ()=>{
  addBodyWarning();
})

noteBody.addEventListener('input', ()=>{
  const remainTime = document.querySelector('.remain-time');
  const body = noteBody.value.trim();
  if (body.length < bodyValidation) {
    addBodyWarning();
    remainTime.textContent = `(${Math.max(0, bodyValidation - body.length)} karakter lagi)`;
    noteBody.classList.remove('passed');
  } else {
    clearBodyWarning(0);
    noteBody.classList.add('passed');
  }
});

noteBody.addEventListener('blur', ()=>{
  clearBodyWarning(3000);
});
});