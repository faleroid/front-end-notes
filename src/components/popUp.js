class PopUp extends HTMLElement{
    constructor(){
        super();

        this._style = document.createElement('style');
    }

    connectedCallback(){
        this.render();
    }

    updateStyle(){
        this._style.textContent = 
        `
        .popup {
            position: fixed;
            top: 30px;
            right: 30px;
            background-color: var(--yellowColor);
            color: #635502;
            padding: 12px 20px;
            border-radius: 8px;
            font-family: var(--fontPar);
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            opacity: 0;
            pointer-events: none;
            transform: translateY(-20px);
            transition: all 0.4s ease;
            z-index: 9999;
        }

        .popup.show {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }

        .hidden {
            display: none;
        }
        `;
    }

    render(){
        this.innerHTML =
        `
        <span id="popup" class="popup hidden">Catatan berhasil ditambahkan!</span>
        `;

        this.updateStyle();
        this.append(this._style);
    }
}

customElements.define('pop-up', PopUp);