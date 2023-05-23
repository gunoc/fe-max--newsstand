class App extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <app-header></app-header>
    <app-rolling></app-rolling>
    `;
  }
}

customElements.define('my-app', App);
