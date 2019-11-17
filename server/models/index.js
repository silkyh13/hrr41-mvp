var db = require('../database');

var models = {
  get: function(callback) {
    var queryString = 'select * from schedule';
    db.query(queryString, function (error, results, fields) {
      if (error) {
        callback(error);
      }
      callback(error, results);
    });
  },
  post: function(start, end, event, callback) {
    var queryString = 'INSERT into schedule (event_start, event_end, event_description) VALUES (?,?,?)';
    var post = [start, end, event];
    db.query(queryString, post, function(error, results) {
      if (error) {
        callback(error);
      }
      callback(error, results);
    });
  },
  delete: function(id, callback) {
    var queryString = 'DELETE FROM schedule WHERE id=?;';
    var value = [id];
    db.query(queryString, value, function(error, results) {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

};


module.exports = models;