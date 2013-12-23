var request = require('request')
  , qs = require('querystring')
  , async = require('async');

module.exports = function routes(app){

  var automaticAPI = app.get('automaticAPI');

  app.get('/', function(req, res) {
    if(req.session && req.session.access_token) {
      res.sendfile(__dirname + '/public/map.html');
    } else {
      res.sendfile(__dirname + '/public/signin.html');
    }
  });


  app.post('/simulate/', function(req, res) {
    if(req.session && req.session.access_token) {
      var events = [
        ['ignition:on', 100],
        ['region:changed', 2000],
        ['mil:on', 2000],
        ['mil:off', 2000],
        ['notification:hard_accel', 3000],
        ['notification:speeding', 2000],
        ['notification:hard_brake', 2000],
        ['ignition:off', 3000],
        ['trip:finished', 2000],
        ['parking:changed', 1000]
      ]

      async.eachSeries(events, function(item, cb) {
        setTimeout(function() {
          request.get({
            uri: 'https://api.automatic.com/v1/test/' + item[0],
            headers: {Authorization: 'token ' + req.session.access_token}
          });
          cb();
        }, item[1]);
      });

    }
  });


  app.get('/logout/', function(req, res) {
    req.session.destroy();
    res.redirect('/');
  });


  app.get('/redirect/', function(req, res) {
    if(req.query.code) {
      request.post({
        uri: automaticAPI.automaticAuthTokenUrl,
        form: {
            client_id: automaticAPI.automaticClientId
          , client_secret: automaticAPI.automaticClientSecret
          , code: req.query.code
          , grant_type: 'authorization_code'
        }
      }, saveAuthToken)
    } else {
      res.json({error: 'No code provided', response: body});
    }

    function saveAuthToken(e, r, body) {
      var access_token = JSON.parse(body || '{}')
      if (access_token.access_token) {
        req.session.access_token = access_token.access_token;
        req.session.user_id = access_token.user.id;
        req.session.scopes = access_token.scopes;
        res.redirect('/');
      } else {
        res.json({error: 'No access token', response: body});
      }
    }
  });


  app.post('/webhook/', function(req, res) {
    if(req.body) {
      var wss = app.get('wss');
      wss.sendEvent(req.body);
      res.json({success: true});
    }
  });

}