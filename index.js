const fs = require('fs');
const jsonfile = require('jsonfile');

const ogFolder = './og/';
const distFolder = './cln/';

console.log('here');

fs.readdir(ogFolder, (err, files) => {
  files.forEach(file => {
    processJSONFile(`${file}`);
  });
});

const processJSONFile = (filename) => jsonfile.readFile(`${ogFolder}${filename}`, (err, products) => writeJSONFile(`${distFolder}${filename}`, processData(products)));

const writeJSONFile = (filename, data) => {
  jsonfile.writeFile(filename, data, {spaces: 2}, (err) => {
    console.error(err)
  });
};

const processData = (products) => products.map(product => cleanData(product));

const cleanData = (product) => ({
  ...product,
  "Price": cleanPrice(product.Price)
});

const cleanPrice = (price) => {
  const regex = /\d+.\d+/g;
  return price.match(regex);
};
