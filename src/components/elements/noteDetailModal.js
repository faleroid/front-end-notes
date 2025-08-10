class NoteDetailModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._note = null;
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.getElementById('actionBtn').addEventListener('click', () => this.handleActionClick());
    this.shadowRoot.getElementById('closeModalBtn').addEventListener('click', () => this.close());
    this.shadowRoot.getElementById('modal-container').addEventListener('click', (event) => {
      if (event.target === this.shadowRoot.getElementById('modal-container')) {
        this.close();
      }
    });
  }

  open(note) {
    this._note = note;
    this.updateContent();
    this.shadowRoot.querySelector('.modal-overlay').classList.remove('hidden');
  }

  close() {
    this.shadowRoot.querySelector('.modal-overlay').classList.add('hidden');
  }

  updateContent() {
    const noteDate = new Date(this._note.createdAt).toLocaleString('id-ID', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    this.shadowRoot.getElementById('modalTitle').textContent = this._note.title;
    this.shadowRoot.getElementById('modalBody').textContent = this._note.body;
    this.shadowRoot.getElementById('modalDate').textContent = noteDate;

    const actionBtn = this.shadowRoot.getElementById('actionBtn');
    if (this._note.archived) {
      actionBtn.textContent = 'Batal Arsip';
    } else {
      actionBtn.textContent = 'Arsipkan';
    }
  }

  handleActionClick() {
    const eventName = this._note.archived ? 'unarchive-note-clicked' : 'archive-note-clicked';
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: { noteId: this._note.id },
      bubbles: true,
      composed: true,
    }));
  }

  updateStyle() {
    this._style.textContent = `
        .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        }

        .modal-content {
        box-sizing: border-box;
        padding: 20px 85px;
        font-family: var(--fontPar, sans-serif);
        background-color: #191919;
        color: white;
        border-radius: 15px;
        width: 90%;
        max-width: 800px;
        height: 90vh;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto 1fr auto auto;
        grid-template-areas: "modalTitle modalDate" "modalBody modalBody" ". actionBtn" ". closeModalBtn";
        gap: 10px;
        }

        #modalTitle {
        grid-area: modalTitle;
        font-size: 2rem;
        align-self: center;
        border-bottom: 2px solid var(--redColor, #CC0000);
        padding-bottom: 7px;
        width: fit-content;
        }

        #modalDate {
        grid-area: modalDate;
        justify-self: end;
        align-self: center;
        color: gray;
        font-size: 12px;
        }

        #modalBody {
        grid-area: modalBody;
        text-align: left;
        overflow-y: auto;
        white-space: pre-wrap;
        }

        #actionBtn {
        grid-area: actionBtn;
        justify-self: end;
        background-color: #191919;
        color: var(--yellowColor);
        border: 1px solid var(--yellowColor);
        }

        #closeModalBtn {
        grid-area: closeModalBtn;
        justify-self: end;
        background-color: var(--yellowColor)
        }

        button {
        width: fit-content;
        padding: 10px 12px;
        font-size: 14px;
        border-radius: 7px;
        border: none;
        cursor: pointer;
        }

        .hidden {
        display: none;
        }
    `;
  }

  render() {
    this.updateStyle();
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this._style);
    this.shadowRoot.innerHTML += `
      <div id="modal-container" class="modal-overlay hidden">
        <div class="modal-content">
          <h2 id="modalTitle"></h2>
          <p id="modalBody"></p>
          <p id="modalDate"></p>
          <button id="actionBtn"></button>
          <button id="closeModalBtn">Kembali</button>
        </div>
      </div>
    `;
  }
}

customElements.define('note-detail-modal', NoteDetailModal);