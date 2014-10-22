var assert   = require('assert');
var request  = require('request');
var freeport = require('freeport');
var app      = require('../index');

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

    request(this.uri + '/search/track/id/164497989', function(err, resp, body) {
      if (err) {
        throw err;
      }

      assert.equal(resp.statusCode, 200);
      console.log(resp);
      done();
    });

  });

});
