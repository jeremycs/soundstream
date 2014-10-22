var assert   = require('assert');
var request  = require('request');
var freeport = require('freeport');
var app      = require('../index');
var logger   = require('../common/logger');

describe('An HTTP Server', function () {

  before(function(done) {
    freeport(function(err, port) {
      this.uri = 'http://localhost:' + port;
      this.server = app.listen(port, done);
    }.bind(this));
  });

  after(function() {
    this.server.close();
  });

  it('should make a request', function(done) {

    request(this.uri, function(err, resp, body) {
      if (err) {
        throw err;
      }

      assert.equal(resp.statusCode, 200);
      assert.equal('app is running', resp.body);
      logger.info(resp);
      done();
    });

  });

});
