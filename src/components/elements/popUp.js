class PopUp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
     .popup {
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 12px 20px;
        border-radius: 5px;
        font-family: var(--fontPoppins, sans-serif);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transform: translateY(-20px);
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 9999;
      }
      .popup.show {
        opacity: 1 !important;
        pointer-events: auto !important;
        transform: translateY(0) !important;
      }
      .success {
        background-color: #ffd700 !important;
        color: #635502 !important;
      }
      .error {
        background-color: #f50000 !important;
        color: #fff !important;
      }

      @media (max-width: 575px){
        .popup{
          top: 20px;
          left: 35px;
          font-size: 14px;
          display: flex;
          justify-content: center;
      }
      `;
  }

  render() {
    this.updateStyle();
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(this._style);
    this.shadowRoot.innerHTML += `
      <span id="popup" class="popup"></span>
    `;
  }
}

customElements.define('pop-up', PopUp);
