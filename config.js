var express = require('express')
  , MemoryStore = express.session.MemoryStore
  , store = new MemoryStore();

try {
  var keys = require('./keys');
} catch(e) {
}

module.exports = function(app){

  app.set('store', store);

  var automaticAPI = {
      automaticClientId: process.env.AUTOMATIC_CLIENT_ID || keys.automaticClientId
    , automaticClientSecret: process.env.AUTOMATIC_CLIENT_SECRET || keys.automaticClientSecret
    , automaticAuthorizeUrl: process.env.AUTOMATIC_AUTHORIZE_URL || keys.automaticAuthorizeUrl
    , automaticAuthTokenUrl: process.env.AUTOMATIC_AUTH_TOKEN_URL || keys.automaticAuthTokenUrl
    , automaticScopes: process.env.AUTOMATIC_SCOPES || keys.automaticScopes
  }
  app.set('automaticAPI', automaticAPI);

  app.configure(function(){
    this
      .use(express.cookieParser('rXrq6xCSJu'))
      .use(express.bodyParser())
      .use(express.session({store: store, secret: 'rXrq6xCSJu'}))
      .set('public', __dirname + '/public')
      .enable('error templates')
      .use(express.static(__dirname + '/public'))
  });

  // Dev
  app.configure('development', function(){
    this
      .use(express.logger('\x1b[90m:remote-addr -\x1b[0m \x1b[33m:method\x1b[0m' +
         '\x1b[32m:url\x1b[0m :status \x1b[90m:response-time ms\x1b[0m'))
      .use(express.errorHandler({dumpExceptions: true, showStack: true}))
      .enable('dev')
      .set('domain', 'localhost');
  });

  // Prod
  app.configure('staging', function(){
    this
      .use(express.logger({buffer: 10000}))
      .use(express.errorHandler())
      .enable('prod')
      .set('domain', 'automaticator-stage.herokuapp.com');

    app.all('*',function(req, res, next) {
      if(req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://' + req.headers.host + req.path);
      } else {
        next();
      }
    });
  });

  // Prod
  app.configure('production', function(){
    this
      .use(express.logger({buffer: 10000}))
      .use(express.errorHandler())
      .enable('prod')
      .set('domain', 'automaticator.herokuapp.com');

    app.all('*',function(req, res, next) {
      if(req.headers['x-forwarded-proto'] != 'https') {
        res.redirect('https://' + req.headers.host + req.path);
      } else {
        next();
      }
    });
  });
}
