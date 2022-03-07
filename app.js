const express = require('express');
const app = express();
const fs=require("fs")
const replaceTemplate = require('./modules/replaceTemplate');


const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

const cards = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
const output = tempOverview.replace('{%PRODUCT_CARDS%}', cards);
// console.log(output);



app.use(express.json())
app.get('/',(req, res) => {
  res.status(200).send(output);
});
app.get('/overview', (req, res) => {
  res.status(200).send(output);
});

app.get('/product', (req, res) => {
  const productreq = dataObj[req.query.id];
  const product = replaceTemplate(tempProduct, productreq);
  res.status(200).send(product);
});

const port = 3000;
app.listen(port, function () {
  console.log('running');
});