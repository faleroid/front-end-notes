class MyTitle extends HTMLElement{

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
        h1{
            padding: 20px;
            color: var(--whiteColor);
            font-family: var(--fontHead);
            text-align: center;
            font-size: 50px;
            transform: rotate(-3deg);
        }

        p{
            text-align: center;
            color: var(--whiteColor);
            font-family: var(--fontPar);
        }
        `
    }

    render(){
        this.innerHTML = 
        `
        <h1>The <span class="redBold">#Dear</span>y</h1>
        <p>"The faintest ink is <span class="yellowBold">more powerful</span>  than the strongest memory."</p>
        `;
        
        this.updateStyle();
        this.append(this._style)
    }
}

customElements.define('main-title', MyTitle)