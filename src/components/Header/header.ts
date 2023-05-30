import { createComponent } from "../../utils/createDOM";

export function createHeader() {
  const headerLogo = createHeaderLogo();
  headerLogo.addEventListener("click", () => {
    location.reload();
  });

  const headerDate = createHeaderDate();
  const header = createComponent({
    tagName: "header",
    content: [headerLogo, headerDate],
    attributes: { className: "header" },
  });

  return header;
}

function createHeaderLogo() {
  const logoImg = createComponent({
    tagName: "img",
    attributes: {
      className: "header__logo--img",
      src: "./src/images/icon-newspaper.png",
      alt: "로고",
    },
  });

  const logoTitle = createComponent({
    tagName: "span",
    content: "뉴스스탠드",
    attributes: { className: "header__logo-title" },
  });

  return createComponent({
    tagName: "div",
    content: [logoImg, logoTitle],
    attributes: { className: "header__logo" },
  });
}

function createHeaderDate() {
  const systemDate = createSystemDate();
  return createComponent({
    tagName: "span",
    content: systemDate,
    attributes: { className: "header__date" },
  });
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
