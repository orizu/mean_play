/*
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
*/

var app = angular.module('flapperNews', []);

app.controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.test = 'Hello world!';

    // $scope variable exposes controller variables and functions to templates
    $scope.posts = [
      { title: 'post 1', upvotes: 5 },
      { title: 'post 2', upvotes: 2 },
      { title: 'post 3', upvotes: 15 },
      { title: 'post 4', upvotes: 9 },
      { title: 'post 5', upvotes: 4 },
      // trailing comma removed by transpiler e.g Babel
      // https://github.com/airbnb/javascript#commas--dangling
    ];
    $scope.addPost = function () {
      if (!$scope.title || $scope.title === '') {
        console.log('Empty bruv!');
        return;
      }
      $scope.posts.push({ title: $scope.title, link: $scope.link, upvotes: 0 });
      $scope.title = '';
      $scope.link = '';
    };
    $scope.incrementUpvotes = function (post) { // parameter is current post by reference
      post.upvotes += 1;
    };
  }]);
