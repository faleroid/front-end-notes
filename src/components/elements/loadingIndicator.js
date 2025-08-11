class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  show() {
    this.shadowRoot.querySelector('.overlay').classList.remove('hidden');
  }

  hide() {
    this.shadowRoot.querySelector('.overlay').classList.add('hidden');
  }

  render() {
    const linkElem = document.createElement('link');
    linkElem.setAttribute('rel', 'stylesheet');
    linkElem.setAttribute('href', 'src/styles/loadingIndicator.css');

    const htmlTemplate = document.createElement('template');
    htmlTemplate.innerHTML = `
      <div class="overlay hidden">
        <div class="spinner"></div>
      </div>
    `;

    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(linkElem);
    this.shadowRoot.appendChild(htmlTemplate.content.cloneNode(true));
  }
}

customElements.define('loading-indicator', LoadingIndicator);
