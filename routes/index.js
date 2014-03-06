exports.index = function(req, res) {
  if(req.session && req.session.access_token) {
    res.sendfile('public/map.html');
  } else {
    res.sendfile('public/signin.html');
  }
}


exports.logs = function(req, res) {
  if(req.session && req.session.access_token) {
    res.sendfile('public/logs.html');
  } else {
    res.redirect('/');
  }
}


exports.force_https = function(req, res, next) {
  if(req.headers['x-forwarded-proto'] != 'https') {
    res.redirect('https://' + req.headers.host + req.path);
  } else {
    next();
  }
}