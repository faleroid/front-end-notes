import { notesData } from '../utils/notesData.js';

function saveNotesToStorage(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
  return notes;
}

function loadNotesFromStorage() {
  const stored = localStorage.getItem('notes');

  return JSON.parse(stored);
}

export { saveNotesToStorage, loadNotesFromStorage };
