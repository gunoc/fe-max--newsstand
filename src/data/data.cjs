// const puppeteer = require('puppeteer');

// async function crawlNaverNewsstand() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   await page.goto('https://www.naver.com/');

//   // #newsstand 안의 모든 정보를 가져오는 코드 작성
//   const newsstandContent = await page.evaluate(() => {
//     const newsstandDiv = document.querySelector('#newsstand');
//     const content = newsstandDiv.innerText;
//     return content;
//   });

//   console.log('newsstand 내용:', newsstandContent);

//   // 크롤링 작업 완료 후 브라우저 종료
//   await browser.close();
// }

// crawlNaverNewsstand();

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.naver.com');

  const result = await page.evaluate(
    () =>
      new Promise((resolve) => {
        const observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            if (
              mutation.type === 'childList' &&
              mutation.addedNodes.length > 0
            ) {
              const targetNode = [...mutation.addedNodes].find(
                (node) =>
                  node.className ===
                  'ContentHeaderSubView-module__sub_news___DECMU',
              );
              if (targetNode) {
                observer.disconnect();
                resolve(targetNode.innerHTML);
              }
            }
          }
        });

        const config = { childList: true, subtree: true };
        const targetNode = document.querySelector('body');
        observer.observe(targetNode, config);
      }),
  );

  console.log(result);
  await browser.close();
})();
