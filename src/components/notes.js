class NoteList extends HTMLElement {
  constructor() {
    super();

    this._noteList = [];
    this._style = document.createElement('style');
    this._wrapper = document.createElement('div');
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
        padding: 0 40px 25px 0px;
        display: grid;
        justify-self: start;
        align-self: start;
        gap: 15px;
        grid-template-columns: 1fr;
      }

      .notes h2 {
        grid-column: 1 / -1;
        color: var(--whiteColor);
        font-family: var(--fontPar);
      }
    `;
  }

  render() {
    this.updateStyle();

    this._wrapper.className = 'notes';
    this._wrapper.innerHTML = `<h2>Catatanmu</h2>`;

    this._noteList.forEach((item) => {
      const note = document.createElement('note-item');
      note.setNote(item);
      this._wrapper.appendChild(note);
    });

    this.innerHTML = '';
    this.append(this._style, this._wrapper);
  }
}

customElements.define('note-list', NoteList);
