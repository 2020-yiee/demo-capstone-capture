const puppeteer = require('puppeteer');

const { getFile } = require('../src/get-file');

const SELECTOR = 'a[id="cta_button_header"]';
const INPUT_FILE_PATH = 'assets/hotjar.html';

const calculatePosition = async (selector, filePath) => {
  const htmlFile = await getFile(filePath);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setJavaScriptEnabled(true);
  await page.setViewport({
    width: 1280,
    height: 800,
    scaleFactor: 2
  });

  await page.setContent(htmlFile, {
    timeout: 60 * 1000,
    waitUntil: 'networkidle2'
  });

  const { x, y } = await page.evaluate(selector => {
    const node = document.querySelector(selector);
    const { x, y } = node.getBoundingClientRect();
    return { x, y };
  }, selector);

  await page.close();
  await browser.close();

  return { x, y };
};

(async () => {
  const position = await calculatePosition(SELECTOR, INPUT_FILE_PATH);
  console.log(position);
})();
