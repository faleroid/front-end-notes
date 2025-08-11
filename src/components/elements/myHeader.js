class MyHeader extends HTMLElement {
  constructor() {
    super();

    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
       .navbar-container{
            padding: 20px;
            background-color: #191919;
            border-bottom: 1px solid black;
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-areas: 
            'textMain textArchive . . . . . .'
            ;
            padding: 20px 90px;
        }

        .navbar-container a{
            border: none;
            outline: none;
            color: grey;
        }

        .navbar-container a.main{
            grid-area: textMain;
            font-family: var(--fontPar);
            text-decoration: none;
            font-size: 14px;
            text-align: center;
            justify-self: start;
        }

        .navbar-container a.archive{
            font-size: 14px;
            font-family: var(--fontPar);
            text-decoration: none;
            grid-area: textArchive;
            justify-self: start;
        }

        .navbar-container a.main:hover,  .navbar-container a.archive:hover{
            color: var(--yellowColor);
        }
        `;
  }

  render() {
    this.innerHTML = `
        <div class="navbar-container">
            <a class="main" href="/index.html">Beranda</a>
            <a class="archive" href="/archiveNotes.html">Arsip Kamu</a>
        </div>
        `;

    this.updateStyle();
    this.append(this._style);
  }
}

customElements.define('my-header', MyHeader);
