var db = require('../database');

var models = {
  get: function(callback) {
    var queryString = 'select * from schedule';
    db.query(queryString, function (error, results, fields) {
      callback(error, results);
    });
  },
  post: function(start, end, event, callback) {
    var queryString = 'INSERT into schedule (event_start, event_end, event_description) VALUES (?,?,?)';
    var post = [start, end, event];
    db.query(queryString, post, function(error, results) {
      callback(error, results);
    });
  },

};


module.exports = models;