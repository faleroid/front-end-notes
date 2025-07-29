class NoteList extends HTMLElement {
  constructor() {
    super();

    this._noteList = [];
    this._showAll = false;

    this._style = document.createElement('style');
    this._wrapper = document.createElement('div');
    this._button = document.createElement('button');
    this._header = document.createElement('h2');

    this._button.addEventListener('click', () => {
      this._showAll = !this._showAll;
      this.render();
    });
  }

  setNoteList(value) {
    this._noteList = value;
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .notes {
        grid-area: notes;
        display: grid;
        gap: 15px;
        grid-template-columns: 1fr 1fr 1fr 1fr;
      }

      .notes-header {
        grid-area: notes-header;
        grid-column: 1 / -1;
        color: var(--whiteColor);
        font-family: var(--fontPar);
      }

      .show-more-btn {
        grid-area: btn-more;
        margin-top: 10px;
        padding: 8px 16px;
        border: 1.5px solid black;
        background-color: var(--primaryColor, var(--blackColor));
        color: white;
        border-radius: 5px;
        cursor: pointer;
        font-family: var(--fontPar);
        justify-self: start;
      }

      @media (min-width: 768px) and (max-width: 991px){
        .notes{
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 575px){
        .notes{
          grid-template-columns: 1fr;
        }
      }
    `;
  }

  render() {
    this.updateStyle();

    this._wrapper.className = 'notes';
    this._wrapper.innerHTML = '';

    const notesToRender = this._showAll ? this._noteList : this._noteList.slice(0, 4);
    notesToRender.forEach((item) => {
      const note = document.createElement('note-item');
      note.setNote(item);
      this._wrapper.appendChild(note);
    });

    this._header.className = 'notes-header';
    this._header.textContent = `Catatanmu (${this._noteList.length})`;

    // Update button
    this._button.className = 'show-more-btn';
    this._button.textContent = this._showAll ? 'Tampilkan Lebih Sedikit' : 'Lihat Semua Catatan';

    this.innerHTML = '';
    this.append(this._style, this._header, this._wrapper, this._button);
  }
}

customElements.define('note-list', NoteList);
