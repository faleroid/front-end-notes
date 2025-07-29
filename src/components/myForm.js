class MyForm extends HTMLElement{
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
        form{
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 1fr;
            gap: 12px;
            justify-self: center;

            background-color: #191919;
            width: 95%;
            padding: 30px;
            border: 1.5px solid black;
            border-radius: 10px;
        }

        form .form-title{
            color: var(--whiteColor);
            font-family: var(--fontPar);
        }

        form label{
            font-family: var(--fontPar);
            font-size: 14px;
        }

        form input{
            height: 20px;
            padding: 10px;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
        }

        form input::placeholder{
            font-weight: 450;
            font-family: var(--fontPar);
        }

        textarea{
            max-width: 1060px;
            height: 180px;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            font-family: var(--fontPar);
        }

        .form-group{
            display: grid;
            grid-template-rows: auto;
            grid-template-columns: 1fr;
            gap: 5px;    

            font-family: var(--fontPar);
            color: var(--whiteColor)
        }

        form .btn{
            height: 40px;
            cursor: pointer;
            background-color: var(--yellowColor);
            border-radius: 10px;
            width: fit-content;
            padding: 8px;
            font-family: var(--fontPar);
            color: #453a00ff;
        }

        @media (max-width: 575px){
            form{
                width: 86%;
                padding: 20px;
            }
        }
        `
    }

    render(){
        this.innerHTML = 
        `
        <form>
            <span class="form-title"><h2>Yuk, Mau Nyatet Apa?</h2></span>
            <div class="form-group">
                <label for="noteTitle"><span class="redBold">*</span> Judul Catatan</label>
                <input type=text id="noteTitle" name="noteTitle" placeholder="Rangkuman Kuliah" required/>
            </div>
            <div class="form-group">
                <label for="noteBody"><span class="redBold">*</span> Isi Catatan</label>
                <textarea id="noteBody" name="noteBody" required></textarea>
            </div>
            <div class="form-group">
                <button type="submit" class="btn">Simpan</button>
            </div>
        </form>
        `;

        this.updateStyle();
        this.append(this._style);
    }
}

customElements.define('my-form', MyForm);