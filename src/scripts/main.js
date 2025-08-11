import '../styles/style.css';
import {
  getAllNotes,
  createNote,
  getSingleNote,
  archiveNote,
  deleteNote,
} from '../handler/notesHandler.js';
import '../components/elements/myTitle.js';
import '../components/elements/myForm.js';
import '../components/elements/popUp.js';
import '../components/elements/noteItem.js';
import '../components/elements/notesList.js';
import '../components/elements/myFooter.js';
import '../components/elements/myHeader.js';
import '../components/elements/noteDetailModal.js';
import '../components/elements/loadingIndicator.js';
import { showPopup } from './showPopUp.js';
import {
  clearBodyWarning,
  clearTitleWarning,
  addBodyWarning,
  addTitleWarning,
  clearAllTrigger,
} from './formValidations.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loadingIndicator = document.querySelector('loading-indicator');
  const noteDetailModal = document.querySelector('note-detail-modal');
  const form = document.getElementById('noteForm');
  const noteList = document.querySelector('note-list');
  const noteTitle = document.getElementById('noteTitle');
  const descTitleValidation = document.getElementById('titleValidation');
  const noteBody = document.getElementById('noteBody');
  const bodyValidation = parseInt(noteBody.getAttribute('minlength'));
  const descBodyValidation = document.getElementById('bodyValidation');

  if (descTitleValidation && descBodyValidation) {
    descTitleValidation.classList.add('hidden');
    descBodyValidation.classList.add('hidden');
  }

  const showAllNotes = async () => {
    loadingIndicator.show();
    try {
      const response = await getAllNotes();
      noteList.setNoteList(response.data);
    } catch (error) {
      showPopup('Gagal menampilkan catatan', 'error');
      console.error(error);
    } finally {
      loadingIndicator.hide();
    }
  };

  await showAllNotes();

  noteDetailModal.addEventListener('archive-note-clicked', async (event) => {
    const { noteId } = event.detail;
    loadingIndicator.show();
    try {
      await archiveNote(noteId);
      showPopup('Catatan berhasil diarsipkan!', 'success');
      noteDetailModal.close();
      await showAllNotes();
    } catch (error) {
      showPopup('Gagal mengarsipkan catatan', 'error');
      console.error(error);
    } finally {
      loadingIndicator.hide();
    }
  });

  noteDetailModal.addEventListener('delete-note-clicked', async (event) => {
    const { noteId } = event.detail;
    loadingIndicator.show();
    try {
      await deleteNote(noteId);
      showPopup('Catatan berhasil dihapus!', 'success');
      noteDetailModal.close();
      await showAllNotes();
    } catch (error) {
      showPopup('Gagal menghapus catatan', 'error');
      console.error(error);
    } finally {
      loadingIndicator.hide();
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = noteTitle.value.trim();
    const body = noteBody.value.trim();
    if (!title || body.length < bodyValidation) {
      if (!title && body.length < bodyValidation) {
        noteTitle.classList.add('warning');
        descTitleValidation.classList.remove('hidden');
        noteBody.classList.add('warning');
        descBodyValidation.classList.remove('hidden');
        showPopup('Isi catatan terlebih dahulu', 'error');
        clearBodyWarning(3000);
        clearTitleWarning(3000);
      } else if (!title) {
        noteTitle.classList.add('warning');
        showPopup('Judul catatan belum diisi', 'error');
        clearTitleWarning(3000);
      } else {
        noteBody.classList.add('warning');
        descBodyValidation.classList.remove('hidden');
        showPopup('Isi catatan harus mengandung minimal 10 karakter', 'error');
        clearBodyWarning(3000);
      }
      return;
    }

    const newNote = { title, body };

    loadingIndicator.show();
    try {
      await createNote(newNote);
      await showAllNotes();
      showPopup('Horeee, Catatanmu berhasil disimpan!', 'success');
      clearAllTrigger();
      form.reset();
    } catch (error) {
      showPopup('Gagal menyimpan catatan ke server', 'error');
      console.error(error);
    } finally {
      loadingIndicator.hide();
    }
  });

  noteList.addEventListener('note-clicked', async (event) => {
    const { noteId } = event.detail;
    loadingIndicator.show();
    try {
      const response = await getSingleNote(noteId);
      if (response.data) {
        noteDetailModal.open(response.data);
      }
    } catch (error) {
      console.error('Gagal mengambil detail catatan:', error);
      showPopup('Gagal menampilkan detail', 'error');
    } finally {
      loadingIndicator.hide();
    }
  });

  noteTitle.addEventListener('focus', () => {
    if (!noteTitle.value.trim()) addTitleWarning();
  });

  noteTitle.addEventListener('input', () => {
    if (noteTitle.value.trim()) {
      clearTitleWarning(0);
      noteTitle.classList.add('passed');
    } else {
      noteTitle.classList.remove('passed');
      addTitleWarning();
    }
  });

  noteTitle.addEventListener('blur', () => {
    clearTitleWarning(3000);
  });

  noteBody.addEventListener('focus', () => {
    addBodyWarning();
  });

  noteBody.addEventListener('input', () => {
    const remainTime = document.querySelector('.remain-time');
    const body = noteBody.value.trim();
    if (body.length < bodyValidation) {
      addBodyWarning();
      if (remainTime) {
        remainTime.textContent = `(${Math.max(
          0,
          bodyValidation - body.length
        )} karakter lagi)`;
      }
      noteBody.classList.remove('passed');
    } else {
      clearBodyWarning(0);
      noteBody.classList.add('passed');
    }
  });

  noteBody.addEventListener('blur', () => {
    clearBodyWarning(3000);
  });
});
