import '../components/myTitle.js';
import '../components/myForm.js';
import '../components/popUp.js';
import '../components/noteItem.js';
import '../components/notes.js';
import {notesData} from '../utils/notesData.js';
import { showPopup } from './showPopUp.js';
import { clearBodyWarning, clearTitleWarning, addBodyWarning, addTitleWarning } from './formValidations.js';

let notes = [...notesData];
const notesSelector = document.querySelector('note-list');
notesSelector.setNoteList(notesData);

const form = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteBody');
const noteList = document.querySelector('note-list');
const bodyValidation = parseInt(noteBody.getAttribute('minlength'));
const descBodyValidation = document.getElementById('bodyValidation');
const descTitleValidation = document.getElementById('titleValidation');

descTitleValidation.classList.add('hidden');
descBodyValidation.classList.add('hidden');

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

noteTitle.addEventListener('blur', () => {
  clearTitleWarning(3000);
});

noteBody.addEventListener('focus', ()=>{
  addBodyWarning();
})

noteBody.addEventListener('input', () => {
  const body = noteBody.value.trim();
  if (body.length < bodyValidation) {
    addBodyWarning();
    noteBody.classList.remove('passed');
  } else {
    clearBodyWarning(0);
    noteBody.classList.add('passed');
  }
});

noteBody.addEventListener('blur', () => {
  clearBodyWarning(3000);
});


//form validation
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const body = noteBody.value.trim();

  if (!title || body.length < bodyValidation){
     if(!title && body.length < bodyValidation){
        noteTitle.classList.add('warning');
        descTitleValidation.classList.remove('hidden');
        noteBody.classList.add('warning');
        descBodyValidation.classList.remove('hidden');
        showPopup('Kok kosong icibos?', 'error');

        clearBodyWarning(3000);
        clearTitleWarning(3000);
        return;
     }else if (!title){
        noteTitle.classList.add('warning');
        showPopup('Woilah cik, judulnya ketinggalan', 'error');

        clearTitleWarning(3000);
        return;
    } else{
        noteBody.classList.add('warning');
        descBodyValidation.classList.remove('hidden');
        showPopup('Bete gw, isi catatan harus punya minimal 10 karakter!', 'error');

        clearBodyWarning(3000);
        return;
    }
  }

  const newNote = {
    id: `note-${Date.now()}`,
    title,
    body,
    createdAt: new Date().toISOString(),
    archived: false,
  };

  notes.unshift(newNote);
  noteList.setNoteList(notes);

  showPopup('Horeee, Catatanmu berhasil disimpan!', 'success');
  form.reset();
});




