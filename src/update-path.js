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
        var urlPattern = /^(?:\/|[a-z]+:\/\/)/;
        if(!urlPattern.test(node.attributes[i].value)){
          node.attributes[i].value = absolute(hostSite,node.attributes[i].value);
        }
      }
    }
  });
  // save file to outputPath
  // ...
  jsdom.writeFile(outputPath,window.document.documentElement.outerHTML);
  console.log('Done');
};

function absolute(base, relative) {
  var stack = base.split("/"),
      parts = relative.split("/");
  stack.pop(); // remove current file name (or empty string)
               // (omit if "base" is the current folder without trailing slash)
  for (var i=0; i<parts.length; i++) {
      if (parts[i] == ".")
          continue;
      if (parts[i] == "..")
          stack.pop();
      else
          stack.push(parts[i]);
  }
  return stack.join("/");
}

module.exports = { updateAbsolutePath };
