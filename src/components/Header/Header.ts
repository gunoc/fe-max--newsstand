class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      weekday: 'long',
    };
    const formattedDate = date
      .toLocaleString('ko-KR', options)
      .replace(/\./g, '. ');

    this.innerHTML = `
        <div class="header__logo">
          <a href="">
            <img class="header__logo-img" src="./src/images/icon-newspaper.png" alt="로고" />
          </a>
          <a class="header__logo-link" href="">뉴스스탠드</a>
        </div>
        <span class="header__date">${formattedDate}</span>
    `;
  }
}

customElements.define('app-header', Header);
