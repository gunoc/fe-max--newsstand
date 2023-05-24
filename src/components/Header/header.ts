import { createElement } from "../../utils/createDOM";

export function createHeader() {
  const header = createElement({
    tagName: "header",
    attributes: {
      className: "header",
    },
  });

  const headerLogo = createHeaderLogo();
  const headerDate = createHeaderDate();

  headerLogo.addEventListener("click", () => {
    location.reload();
  });

  header.append(headerLogo, headerDate);

  return header;
}

function createHeaderLogo() {
  const headerLogo = createElement({
    tagName: "div",
    attributes: {
      className: "header__logo",
    },
  });
  const logoImg = createHeaderLogoImg();
  const logoTitle = createHeaderLogoTitle();
  headerLogo.append(logoImg, logoTitle);

  return headerLogo;
}

function createHeaderLogoImg() {
  const headerLogoImg = createElement({
    tagName: "img",
    attributes: {
      className: "header__logo--img",
      src: "./src/images/icon-newspaper.png",
      alt: "로고",
    },
  });
  return headerLogoImg;
}

function createHeaderLogoTitle() {
  const headerLogoTitle = createElement({
    tagName: "span",
    attributes: {
      className: "header__logo-title",
      innerHTML: "뉴스스탠드",
    },
  });
  return headerLogoTitle;
}

function createHeaderDate() {
  const systemDate = createSystemDate();
  const headerDate = createElement({
    tagName: "span",
    attributes: {
      className: "header__date",
      innerHTML: systemDate,
    },
  });
  return headerDate;
}

function createSystemDate(): string {
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "long",
  };
  const formattedDate = date.toLocaleString("ko-KR", options).replace(/\./g, ". ");

  return formattedDate;
}
