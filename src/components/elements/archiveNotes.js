import './noteItem.js';

class ArchiveNotes extends HTMLElement {
  constructor() {
    super();

    this._archivedNotes = [];
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  /**
   * @param {Array} notes
   */

  setArchivedNotes(notes) {
    this._archivedNotes = notes;

    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .archive-note-list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-areas: 
        'textNotes textNotes textNotes textNotes'
        ;
        gap: 15px;
        padding-top: 1rem;
      }

      .archive-header {
        grid-area: textNotes;
        font-family: var(--fontPar);
        font-size: 22px;
        color: var(--whiteColor, white);
        padding-bottom: 5px;
      }

      note-item{
        background-color: #191919;
        border-radius: 5px;
        height: 100%;
        max-width: 100%;
      }

      @media (max-width: 992px) {
        .archive-note-list {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 575px) {
        .archive-note-list {
          grid-template-columns: 1fr;
          grid-template-areas: 'textNotes';
        }

        .archive-header{
          font-size: 20px;
        }
      }
    `;
  }

  render() {
    this.innerHTML = '';

    this.updateStyle();
    this.appendChild(this._style);

    const container = document.createElement('div');
    container.classList.add('archive-note-list');

    const header = document.createElement('h2');
    header.classList.add('archive-header');
    header.textContent = `Catatan Arsip (${this._archivedNotes.length})`;
    container.appendChild(header);

    if (this._archivedNotes.length > 0) {
      this._archivedNotes.forEach((note) => {
        const noteItem = document.createElement('note-item');
        noteItem.setNote(note);
        container.appendChild(noteItem);
      });
    }

    this.appendChild(container);
  }
}

customElements.define('archive-notes', ArchiveNotes);
