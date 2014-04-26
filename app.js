var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MemoryStore = express.session.MemoryStore;
var store = new MemoryStore();

var nconf = require('nconf');

var routes = require('./routes');
var api = require('./routes/api');
var oauth = require('./routes/oauth');

var app = express();

app.set('store', store);

nconf.env().argv();
nconf.file('./config.json');

nconf.set('AUTOMATIC_SCOPES', 'scope:trip:summary scope:location scope:vehicle scope:notification:hard_accel scope:notification:hard_brake scope:notification:speeding scope:mil:on scope:mil:off');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('rq6xCSJu'));
app.use(express.session({store: store, secret: 'rXrq6xCSJu'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

if (app.get('env') !== 'development') {
    app.all('*', routes.force_https);
}

app.get('/', routes.index);
app.get('/logs/', routes.logs);
app.get('/logs/api/', api.logs);
app.get('/logs/reverse', api.reverseLogs);
app.get('/logs/last', api.lastLog);
app.get('/logs/reset', api.resetLog);

app.get('/authorize/', oauth.authorize);
app.get('/logout/', oauth.logout);
app.get('/redirect', oauth.redirect);


app.get('/emotiv', api.getEmotiv);
app.post('/emotiv', api.postEmotiv);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.send({
        message: err.message,
        error: {}
    });
});


module.exports = app;
