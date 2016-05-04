var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');



var app = express();

app.use(stormpath.init(app, {
  website: true,
  web: {
    login: {
      nextUri: '/#/profile'
    },
    logout: {
    enabled: true,
    uri: '/logout',
    nextUri: '/#/goodbye'
  }
  }
}));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/movies', require('./routes/movies'));

app.all('/*', function(req, res, next) {
    res.render('index', { root: __dirname });
});

app.get('/profile', stormpath.groupsRequired(['free users', 'admins']), function (req, res) {
  res.send('If you can see this page, you must be in the `free users` and `admins` group!');
});

app.get('/admin', stormpath.groupsRequired(['admin']), function (req, res) {
  res.send('If you can see this page, you must be in the `admins` group!');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
