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
  db.getReverseAutomaticLogs(function(e, docs) {
    res.json(docs[0]);
  });
}

exports.getEmotiv = function(req, res) {
  db.getEmotivLogs(function(e, docs) {
    res.json(docs[0]);
  });
}

exports.postEmotiv = function(req, res) {
  db.postLog("emotiv", req.body);
  res.send(200, "OK")
}

exports.postAutomatic = function(req, res) {
  db.postLog("automatic", req.body);
  res.send(200, "OK")
}

exports.anyLast = function(req, res) {
  db.getReverseAnyLogs(function(e, docs) {
    res.json(docs[0]);
  });
}

