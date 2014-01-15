var config = require('./config')
  , routes = require('./routes')
  , http = require('http')
  , _ = require('underscore')
  , express = require('express')
  , app = express()
  , WebSocketServer = require('ws').Server
  , parseCookie = express.cookieParser('rXrq6xCSJu');

config(app);

routes(app);

var port = process.env.PORT || 8081;
var server = http.createServer(app);
server.listen(port, function(){
  console.error('\x1b[32m' + app.set('domain') + '\x1b[0m running on port %d', port);
});

var wss = new WebSocketServer({server: server});
app.set('wss', wss);
app.set('wsClients', {});

wss.on('connection', function(ws) {
  ws.send(JSON.stringify({msg: "Socket Opened"}));
  parseCookie(ws.upgradeReq, null, function(err) {
      var sessionID = ws.upgradeReq.signedCookies['connect.sid'];
      var store = app.get('store')
      store.get(sessionID, function(e, session) {
        ws.user_id = session.user_id;
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
      })
    }
}
