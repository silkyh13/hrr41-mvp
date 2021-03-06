const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database/index.js');
const models = require('./models/index.js');
const port = 1028;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist'));

app.get('/api/schedule', (req, res) => {
  models.get((err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.post('/api/schedule', (req, res) => {
  models.post(req.body.event_start, req.body.event_end, req.body.event_description, (err, results) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(results);
  });
});

app.delete('/api/schedule/:id', (req, res) => {
  models.delete(req.params.id, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(results);
    }
  });
});

app.put('/api/schedule/:id', (req, res) => {
  models.put(req.body, req.params.id, (err, results) => {
    if (err) {
      throw err;
    } else {
      res.end(JSON.stringify(results));
    }
  });
});
app.listen(port, () => {
  console.log(`Review server listening on port ${port}, ${new Date()}`);
});

module.exports.app = app;

