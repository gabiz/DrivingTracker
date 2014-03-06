var _ = require('underscore');
var express = require('express');
var parseCookie = express.cookieParser('rXrq6xCSJu');
var db = require('./database');

exports.setup = function(app) {
  var wss = app.get('wss');

  wss.on('connection', function(client) {
    client.send(JSON.stringify({msg: "Socket Opened"}));
    parseCookie(client.upgradeReq, null, function(err) {
        var sessionID = client.upgradeReq.signedCookies['connect.sid'];
        var store = app.get('store')
        store.get(sessionID, function(e, session) {
          client.user_id = session.user_id;
        });
    });
  });


  wss.sendEvent = function(data) {
    if(data && data.user && data.user.id) {
      var clients = _.filter(this.clients, function(c) {
        return c.user_id == data.user.id;
      });
      clients.forEach(function(client) {
        client.send(JSON.stringify(data));
      });
    }
  }


  app.post('/webhook/', function(req, res) {
    console.log('>>>>>>> Incoming Webhook: ' + JSON.stringify(req.body));
    if(req.body) {
      wss.sendEvent(req.body);
      db.saveLog(req.body);
      res.json({success: true});
    }
  });
}
