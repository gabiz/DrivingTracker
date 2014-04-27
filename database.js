var monk = monk = require('monk');
var db = monk(process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/automaticator');
var webhook_logs = db.get('automaticator');

webhook_logs.index({ '_id': -1 });

exports.getLogs = function(user_id, cb) {
  // webhook_logs.find({user: {id: user_id} }, cb);
  webhook_logs.find({ user: {id: user_id} ,kind: "automatic" }, {sort:[['_id',-1]]}, cb);
}

exports.getReverseAutomaticLogs = function(cb) {
  webhook_logs.find({ kind: "automatic" }, {limit:10,sort:[['_id',-1]]}, cb);
}

exports.saveLog = function(body) {
  body['kind'] = "automatic";
  webhook_logs.insert(body);
}

exports.getEmotivLogs = function(cb) {
  webhook_logs.find({ kind: "emotiv" }, {sort:[['_id',-1]]}, cb);
}

exports.postLog = function(kind, body) {
  body['kind'] = kind;
  webhook_logs.insert(body);
}

exports.getReverseAnyLogs = function(cb) {
  webhook_logs.find({}, {limit:10,sort:[['_id',-1]]}, cb);
}

