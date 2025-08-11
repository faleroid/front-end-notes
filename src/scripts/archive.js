import '../styles/archiveNotes.css';

import {
  getArchivedNotes,
  getSingleNote,
  unarchiveNote,
  deleteNote,
} from '../handler/notesHandler.js';
import '../components/elements/myHeader.js';
import '../components/elements/myFooter.js';
import '../components/elements/popUp.js';
import '../components/elements/archiveNotes.js';
import '../components/elements/noteDetailModal.js';
import { showPopup } from '../scripts/showPopUp.js';
import '../components/elements/loadingIndicator.js';

document.addEventListener('DOMContentLoaded', async () => {
  const loadingIndicator = document.querySelector('loading-indicator');
  const archiveNotesListElement = document.querySelector('archive-notes');
  const noteDetailModal = document.querySelector('note-detail-modal');

  const showAllArchivedNotes = async () => {
    loadingIndicator.show();
    try {
      const response = await getArchivedNotes();
      if (response.data) {
        archiveNotesListElement.setArchivedNotes(response.data);
      }
    } catch (error) {
      console.error('Gagal memuat catatan arsip:', error);
      showPopup('Gagal memuat catatan arsip', 'error');
    } finally {
      loadingIndicator.hide();
    }
  };

  await showAllArchivedNotes();

  archiveNotesListElement.addEventListener('note-clicked', async (event) => {
    const { noteId } = event.detail;
    loadingIndicator.show();
    try {
      const response = await getSingleNote(noteId);
      if (response.data) {
        noteDetailModal.open(response.data);
      }
    } catch (error) {
      showPopup('Gagal menampilkan detail', 'error');
      console.error(error);
    } finally {
      loadingIndicator.hide();
    }
  });

  noteDetailModal.addEventListener('unarchive-note-clicked', async (event) => {
    const { noteId } = event.detail;
    loadingIndicator.show();
    try {
      await unarchiveNote(noteId);
      showPopup('Catatan berhasil dikembalikan!', 'success');
      noteDetailModal.close();
      await showAllArchivedNotes();
    } catch (error) {
      showPopup('Gagal mengembalikan catatan', 'error');
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
      await showAllArchivedNotes();
    } catch (error) {
      showPopup('Gagal menghapus catatan', 'error');
      console.error(error);
    } finally {
      loadingIndicator.hide();
    }
  });
});
