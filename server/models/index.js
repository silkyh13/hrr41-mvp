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
  },
  put: function (data, id, callback) {
    var queryString = `update schedule set event_start = '${data.event_start}', event_end = '${data.event_end}' where id = ${id}`;
    db.query(queryString, function(error, results) {
      if (error) {
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }

};

// update schedule set event_start = "2020-06-14 08:59:45", event_end = "2020-07-28 18:43:00", event_description = "testing" where id = 38;

module.exports = models;