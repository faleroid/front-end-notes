class NoteItem extends HTMLElement {
  constructor() {
    super();

    this._notes = {
      id: 0,
      title: 'NEED_TITLE',
      body: 'NEED_BODY_PAYLOAD',
    };

    this._style = document.createElement('style');
    this._container = document.createElement('div');
  }

  setNote(value) {
    this._notes = {
      id: value.id,
      title: value.title,
      body: value.body,
    };

    this.render();
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
      .note-item {
        grid-area: note-item;
        background-color: #191919;
        border: 1.5px solid black;
        border-radius: 5px;
      }

      .note-item h3 {
        padding: 10px 10px 0 10px;
        color: var(--whiteColor);
        font-family: var(--fontPar);
        font-size: 16px;
        margin: 0;
      }

      .note-item p {
        color: rgb(170, 170, 170);
        font-family: var(--fontPar);
        font-size: 14px;
        text-align: left;
        padding: 10px;
        margin: 0;
      }

      .note-item:hover{
        border: 1px solid var(--yellowColor);
        p, h3 {
         color: var(--yellowColor);
          }
        }
    `;
  }

  render() {
    this.setAttribute('data-id', this._notes.id);
    this.updateStyle();

    this._container.className = 'note-item';
    this._container.innerHTML = `
      <h3>${this._notes.title}</h3>
      <p>${this._notes.body}</p>
    `;

    this.innerHTML = '';
    this.append(this._style, this._container);
  }
}

customElements.define('note-item', NoteItem);
