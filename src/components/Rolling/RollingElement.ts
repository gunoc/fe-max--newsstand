class RollingElement extends HTMLElement {
  connectedCallback(): void {
    this.className = 'rolling__section';
    this.render();
  }

  render() {
    this.innerHTML = `
        <a class="rolling__press">연합뉴스</a>
          <ul>
            <li class="rolling__title" data="1">
              내일 누리호 발사…날씨 '이상 무'
            </li>
            <li class="rolling__title" data="2">
              내일 누리호 발사…날씨 '이상 무'
            </li>
            <li class="rolling__title" data="3">
              내일 누리호 발사…날씨 '이상 무'
            </li>
            <li class="rolling__title" data="4">
              내일 누리호 발사…날씨 '이상 무'
            </li>
            <li class="rolling__title" data="5">
              내일 누리호 발사…날씨 '이상 무'
            </li>
          </ul>
    `;
  }
}

customElements.define('roll-element', RollingElement);
