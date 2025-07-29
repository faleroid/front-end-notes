import '../components/myTitle.js';
import '../components/myForm.js';
import '../components/popUp.js';
import '../components/noteItem.js';
import '../components/notes.js';
import {notesData} from '../utils/notesData.js';

const form = document.querySelector('my-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    showPopup('Yeay, Catatan berhasil ditambahkan!')
    form.reset();
})

const notesSelector = document.querySelector('note-list');
notesSelector.setNoteList(notesData);

// Pop Up
const popup = document.querySelector('#popup');

function showPopup(message) {
  popup.textContent = message;
  popup.classList.remove('hidden');
  popup.classList.add('show');

  setTimeout(() => {
    popup.classList.remove('show');
    popup.classList.add('hidden');
  }, 5000);
}







