import '../components/myTitle.js';
import '../components/myForm.js';
import '../components/popUp.js';
import '../components/noteItem.js';
import '../components/notes.js';
import {notesData} from '../utils/notesData.js';
import { showPopup } from './showPopUp.js';
import { saveNotesToStorage, loadNotesFromStorage } from './webStorage.js';

const notesSelector = document.querySelector('note-list');
notesSelector.setNoteList(notesData);

const form = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteBody = document.getElementById('noteBody');
const noteList = document.querySelector('note-list');

let notes = [...notesData];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = noteTitle.value.trim();
  const body = noteBody.value.trim();

  const prerequiteBodyChar = 10;

  if (!title || body.length < prerequiteBodyChar){
    showPopup('Bete gw, isi catatan harus punya minimal 10 karakter!', 'error');
    form.reset();

    return;
  }

  const newNote = {
    id: `note-${Date.now()}`,
    title,
    body,
    createdAt: new Date().toISOString(),
    archived: false,
  };

  notes.unshift(newNote);
  saveNotesToStorage(newNote);
  noteList.setNoteList(notes);

  showPopup('Horeee, Catatanmu berhasil disimpan!', 'success');
  form.reset();
});




