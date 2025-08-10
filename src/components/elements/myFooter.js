class MyFooter extends HTMLElement{
    static observedAttributes = ['footer-color'];
    constructor(){
        super();

        this._style = document.createElement('style');
    }

    connectedCallback(){
        this.render();
    }

    updateStyle(){
        this._footerColor = this.getAttribute('footer-color')
        this._style.textContent = 
        `
        ${this.localName} p{
            font-family: var(--fontPar);
            border-top: 1px solid black;
            padding: 20px;
            color: ${this._footerColor};
            font-size: 12px;
            text-align: center;
        }
        `
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this[`_${name}`] = newValue;

        this.render();
    }

    render(){
        this.innerHTML = `
            <p>Design By Pangpiwww</p>
        `;

        this.updateStyle();
        this.append(this._style);
    }
}

customElements.define('my-footer', MyFooter);