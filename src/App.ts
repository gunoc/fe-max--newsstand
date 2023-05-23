class App extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<app-header></app-header>`;
  }
}

customElements.define('my-app', App);
