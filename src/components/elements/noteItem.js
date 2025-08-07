class NoteItem extends HTMLElement {
  constructor() {
    super();

    this._notes = {
      id: 0,
      title: 'NEED_TITLE',
      body: 'NEED_BODY_PAYLOAD',
      createdAt: new Date().toISOString(),
      archived: false,
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
      archived: value.archived,
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
        max-width: 100%;
        height: 90%;
        display: grid;
        grid-template-rows: auto 1fr auto;
        overflow: hidden;
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

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
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

    .modal-overlay {
      position: fixed; 
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: tranparent; 
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .hidden {
      display: none;
    }

    .modal-content {
    box-sizing: border-box;
      padding: 20px 85px;
      font-family: var(--fontPar);
      background-color: #191919;
      color: white;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 100vh;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: 0.2fr 1fr 0.1fr;
      grid-template-areas:
      'modalTitle . modalDate'
      'modalBody modalBody modalBody'
      '. . closeModalBtn'
      ;
      gap: 10px;
    }

    #modalTitle{
      grid-area: modalTitle;
      font-size: 45px;
      align-self: center;
    }

    #modalBody{
      grid-area: modalBody;
      text-align: left;
    }

    #modalDate{
      grid-area: modalDate;
      justify-self: end;
      align-self: center;
      font-size: 14px;
      color: gray;
    }

    #closeModalBtn{
      grid-area: closeModalBtn;
      width: fit-content;
      padding: 10px 8px;
      font-size: 14px;
      background-color: var(--yellowColor);
      border-radius: 7px;
      border: none;
      cursor: pointer;
      justify-self: end; 
      align-self: center;
    }

    @media (max-width: 575px){
      .modal-content{
        padding: 30px;
        grid-template-rows: 0.001fr 0.01fr 1fr 0.1fr;
        grid-template-areas:
        'modalTitle modalTitle modalTitle'
        'modalDate modalDate .'
        'modalBody modalBody modalBody'
        '. . closeModalBtn'
        ;
      } 

      #modalTitle{
        font-size: 28px;
      }

      #modalDate{
        justify-self: start;
        font-size: 12px;
      }
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

    this._container.addEventListener('click', () => {
      const event = new CustomEvent('note-clicked', {
          detail: { noteId: this._notes.id },
          bubbles: true,
        });
      this.dispatchEvent(event);
    });

    this.innerHTML = '';
    this.append(this._style, this._container);
  }
}

customElements.define('note-item', NoteItem);
