import { getArchivedNotes, getSingleNote, unarchiveNote } from '../handler/notesHandler.js';
import '../components/elements/myHeader.js';
import '../components/elements/myFooter.js';
import '../components/elements/popUp.js';
import '../components/elements/archiveNotes.js';
import '../components/elements/noteDetailModal.js';
import { showPopup } from '../scripts/showPopUp.js';

document.addEventListener('DOMContentLoaded', async () => {
  const archiveNotesListElement = document.querySelector('archive-notes');
  const noteDetailModal = document.querySelector('note-detail-modal');
  const myHeaderElement = document.querySelector('my-header');

  const showAllArchivedNotes = async () => {
    try {
      const response = await getArchivedNotes();
      if (response.data) {
        archiveNotesListElement.setArchivedNotes(response.data);
        if (myHeaderElement) {
          myHeaderElement.updateArchiveCount(response.data.length);
        }
      }
    } catch (error) {
      console.error('Gagal memuat catatan arsip:', error);
    }
  };

  await showAllArchivedNotes();

  archiveNotesListElement.addEventListener('note-clicked', async (event) => {
    const { noteId } = event.detail;
    try {
      const response = await getSingleNote(noteId);
      if (response.data) {
        noteDetailModal.open(response.data);
      }
    } catch (error) {
      showPopup('Gagal menampilkan detail', 'error');
    }
  });

  noteDetailModal.addEventListener('unarchive-note-clicked', async (event) => {
    const { noteId } = event.detail;
    try {
      await unarchiveNote(noteId);
      showPopup('Catatan berhasil dikembalikan!', 'success');
      noteDetailModal.close();
      await showAllArchivedNotes();
    } catch (error) {
      showPopup('Gagal mengembalikan catatan', 'error');
    }
  });
});