var express = require('express');
var logger  = require('./common/logger');
var path    = require('path');
var Search  = require('./controllers/search');

var app = express();

var search = new Search();
search.initialize();

app.get('/test', function (req, res) {
  res.send('app is running');
});

app.get('/search/track/id/:id', function (req, res) {
  var id = req.params.id;
  logger.info('searching for a track by id: ' + id);
  search.getTrackById(id, res);
});

app.get('/search/keyword/:keyword', function (req, res) {
  var keyword = req.params.keyword;
  logger.info('searching for a track by keyword: ' + keyword);
  search.getTrackByKeyword(keyword, res);
});

app.get('/', function(req,res) {
  res.sendFile(path.resolve('public/index.html'));
});

app.get('/style', function(req,res) {
  res.sendFile(path.resolve('public/style.css'));
});

module.exports = app;
