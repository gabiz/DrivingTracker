var db = require('../database');

exports.logs = function(req, res) {
  if(req.session.user_id) {
    db.getLogs(req.session.user_id, function(e, docs) {
      res.json(docs);
    });
  } else {
    res.json({error: 'Not logged in'});
  }
}

exports.reverseLogs = function(req, res) {
  db.getReverseAllLogs(function(e, docs) {
    res.json(docs);
  });
  // if(req.session.user_id) {
  // } else {
  //   res.json({error: 'Not logged in'});
  // }
}

exports.lastLog = function(req, res) {
  db.getReverseAllLogs(function(e, docs) {
    res.json(docs[0]);
  });
  // if(req.session.user_id) {
  //   db.getReverseLogs(req.session.user_id, function(e, docs) {
  //     res.json(docs[0]);
  //   });
  // } else {
  //   res.json({error: 'Not logged in'});
  // }
}