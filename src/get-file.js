const fs = require('fs');

const getFile = filePath =>
  new Promise((resolve, reject) =>
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject('Cannot read file');
      }
      resolve(data);
    })
  );

module.exports = { getFile };
