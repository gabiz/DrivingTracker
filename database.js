var monk = monk = require('monk');
var db = monk(process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/automaticator');
var webhook_logs = db.get('automaticator');

exports.getLogs = function(user_id, cb) {
  webhook_logs.find({user: {id: user_id} }, cb);
}

exports.getReverseLogs = function(user_id, cb) {

  webhook_logs.find({user: {id: user_id} }, {sort:['_id',-1]}, cb);
}

exports.saveLog = function(body) {
  webhook_logs.insert(body);
}