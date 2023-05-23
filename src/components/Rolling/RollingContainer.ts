class RollingContainer extends HTMLElement {
  connectedCallback(): void {
    this.className = 'rolling';
    this.render();
  }

  render() {
    this.innerHTML = `
    <roll-element></roll-element>
    <roll-element></roll-element>
    `;
  }
}
customElements.define('app-rolling', RollingContainer);
