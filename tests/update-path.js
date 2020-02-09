const { updateAbsolutePath } = require('../src/update-path');

const HOST_SITE = 'https://www.hotjar.com/';
const INPUT_FILE_PATH = 'assets/hotjar.html';
const OUTPUT_FILE_PATH = 'output/hotjar.html';

updateAbsolutePath(HOST_SITE, INPUT_FILE_PATH, OUTPUT_FILE_PATH);
