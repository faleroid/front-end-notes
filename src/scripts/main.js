import '../components/myTitle.js';
import '../components/myForm.js';
import '../components/popUp.js';
import '../components/noteItem.js';
import '../components/notes.js';
import '../components/myFooter.js';
import { notesData } from '../utils/notesData.js';
import { showPopup } from './showPopUp.js';
import { clearBodyWarning, clearTitleWarning, addBodyWarning, addTitleWarning, clearAllTrigger} from './formValidations.js';

document.addEventListener('DOMContentLoaded', () => {
  const myFooter = document.querySelector('my-footer');
  if (myFooter) {
    myFooter.setAttribute('footer-color', 'gray');
  }
});

let notes = [...notesData];
const noteList = document.querySelector('note-list');
noteList.setNoteList(notesData);

const form = document.getElementById('noteForm');

const noteTitle = document.getElementById('noteTitle');
const descTitleValidation = document.getElementById('titleValidation');

const noteBody = document.getElementById('noteBody');
const descBodyValidation = document.getElementById('bodyValidation');
const bodyValidation = parseInt(noteBody.getAttribute('minlength'));

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

//form validation
form.addEventListener('submit', (e)=>{
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
    id: `note-${Date.now()}`,
    title,
    body,
    createdAt: new Date().toISOString(),
    archived: false,
  };

  notes.unshift(newNote);
  noteList.setNoteList(notes);

  showPopup('Horeee, Catatanmu berhasil disimpan!', 'success');
  clearAllTrigger();

  form.reset();
});

