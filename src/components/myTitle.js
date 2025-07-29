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

        @media (max-width: 575px){
            p{
                font-size: 14px;
            }
        }
        `
    }

    render(){
        this.innerHTML = 
        `
        <h1>The <span class="redBold">#Dear</span>y</h1>
        <p>When The faintest ink is <span class="yellowBold">more powerful</span>  than the strongest memory.</p>
        `;
        
        this.updateStyle();
        this.append(this._style)
    }
}

customElements.define('main-title', MyTitle)