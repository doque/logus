var fs = require('fs'),
    logus = require('../lib/logus');

describe('Testing logus watch', function() {
  var log;
  var logpath = __dirname + '/tmp/watch.log';

  before(function(done) {
    log = logus(logpath);
    done();
  });

  it('test.log should exists', function(done) {
    fs.exists(logpath, function(exists) {
      exists.should.be.true;
      done();
    });
  });

  it('test.log should exists after remove', function(done) {
    fs.unlink(logpath, function() {
      fs.exists(logpath, function(exists) {
        exists.should.be.true;
        done();
      });
    });
  });

  it('test.log should exists after remove and timeout', function(done) {
    fs.unlink(logpath, function() {
      setTimeout(function() {
        fs.exists(logpath, function(exists) {
          exists.should.be.true;
          done();
        });
      }, 100);
    });
  });

  after(function(done) {
    log.close();
    fs.unlink(logpath, function() {
        done();
    });
  });
});