var fs = require('fs'),
    logus = require('../lib/logus');

describe('Testing logus message', function() {
  var log;
  var logpath = __dirname + '/tmp/message.log';

  before(function(done) {
    log = logus(logpath);
    done();
  });

  it('info test', function(done) {
    log.info('test');
    fs.readFile(logpath, function(err, data) {
      data.toString().length.should.equal(33);
      fs.unlink(logpath, function() {
        done();
      });
    });
  });

  it('critical test', function(done) {
    log.critical('test');
    fs.readFile(logpath, function(err, data) {
      data.toString().length.should.equal(37);
      fs.unlink(logpath, function() {
        done();
      });
    });
  });

  it('error test', function(done) {
    log.error('test');
    fs.readFile(logpath, function(err, data) {
      data.toString().length.should.equal(34);
      fs.unlink(logpath, function() {
        done();
      });
    });
  });

  it('warning test', function(done) {
    log.warning('test');
    fs.readFile(logpath, function(err, data) {
      data.toString().length.should.equal(36);
      fs.unlink(logpath, function() {
        done();
      });
    });
  });

  it('notice test', function(done) {
    log.notice('test');
    fs.readFile(logpath, function(err, data) {
      data.toString().length.should.equal(35);
      fs.unlink(logpath, function() {
        done();
      });
    });
  });

  it('debug test', function(done) {
    log.debug('test');
    fs.readFile(logpath, function(err, data) {
      data.toString().length.should.equal(34);
      fs.unlink(logpath, function() {
        done();
      });
    });
  });

  it('info double arguments test', function(done) {
    log.info('test', 'test2');
    fs.readFile(logpath, function(err, data) {
      data.toString().length.should.equal(39);
      fs.unlink(logpath, function() {
        done();
      });
    });
  });


  after(function(done) {
    log.close();
    fs.unlink(logpath, function() {
      done();
    });
  });
});