const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const port = 1028;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));


app.listen(port, () => {
  console.log(`Review server listening on port ${port}, ${new Date()}`);
});

module.exports.app = app;
