const fs = require('fs');
const captureWebsite = require('capture-website');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const FILE_PATH = 'assets/hotjar.html';

const getFile = () =>
  new Promise((resolve, reject) =>
    fs.readFile(FILE_PATH, 'utf8', (error, data) => {
      if (error) {
        reject('Cannot read file');
      }
      resolve(data);
    })
  );

(async () => {
  const htmlFile = await getFile();

  const capture = () =>
    captureWebsite.file(htmlFile, './output/example.png', {
      inputType: 'html',
      fullPage: true,
      overwrite: true,
      timeout: 5 * 60
    });

  const updateAbsolutePath = (hostname, file) => {
    const {
      window: { document }
    } = new JSDOM(htmlFile);
    document.querySelectorAll('a[id="cta_button_header"]').forEach(node => {
      console.log(node.getBoundingClientRect());
    });

    return;
    document.querySelectorAll('*').forEach(node => {
      if (node.hasAttributes()) {
        const length = node.attributes.length;
        for (var i = 0; i < length; i++) {
          const { name, value } = node.attributes[i];
          // do stuff
        }
      }
    });
  };

  // updateAbsolutePath();
  await capture();
})();
