const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { getFile } = require('./get-file');

const updateAbsolutePath = async (hostSite, filePath, outputPath) => {
  const htmlFile = await getFile(filePath);
  const {
    window: { document }
  } = new JSDOM(htmlFile);

  document.querySelectorAll('*').forEach(node => {
    if (node.hasAttributes()) {
      const length = node.attributes.length;
      for (var i = 0; i < length; i++) {
        const { name, value } = node.attributes[i];
        // do stuff...
      }
    }
  });
  // save file to outputPath
  // ...
  console.log('Done');
};

module.exports = { updateAbsolutePath };
