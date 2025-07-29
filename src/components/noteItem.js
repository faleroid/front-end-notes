class NoteItem extends HTMLElement {
  constructor() {
    super();

    this._notes = {
      id: 0,
      title: 'NEED_TITLE',
      body: 'NEED_BODY_PAYLOAD',
      createdAt: new Date().toISOString(),
    };

    this._style = document.createElement('style');
    this._container = document.createElement('div');
  }

  setNote(value) {
    this._notes = {
      id: value.id,
      title: value.title,
      body: value.body,
      createdAt: value.createdAt,
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

      .note-item time{
        font-family: var(--fontPar);
        display: flex;
        justify-content: space-between;
      }

      .note-item time p{
        font-size: 11px;
        color: gray;
      }

      .note-item:hover {
        border: 1px solid var(--yellowColor);
      }

      .note-item:hover h3,
      .note-item:hover p,
      .note-item:hover time{
        color: var(--yellowColor);
      }
    `;
  }

  render() {
    this.setAttribute('data-id', this._notes.id);
    this.updateStyle();

    const date = new Date(this._notes.createdAt);
    const formattedDate = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    const formattedTime = date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
    });

    this._container.className = 'note-item';
    this._container.innerHTML = `
      <h3>${this._notes.title}</h3>
      <p>${this._notes.body}</p>
      <time><p>${formattedDate}</p> <p>${formattedTime}</p></time>
    `;

    this.innerHTML = '';
    this.append(this._style, this._container);
  }
}

customElements.define('note-item', NoteItem);
