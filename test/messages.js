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
    log.info('test', function() {
      data = fs.readFileSync(logpath);
      data.toString().length.should.equal(33);
      fs.unlinkSync(logpath);
      done();
    });
  });

  it('critical test', function(done) {
    log.critical('test', function() {
      data = fs.readFileSync(logpath);
      data.toString().length.should.equal(37);
      fs.unlinkSync(logpath);
      done();
    });
  });

  it('error test', function(done) {
    log.error('test', function() {
      data = fs.readFileSync(logpath);
      data.toString().length.should.equal(34);
      fs.unlinkSync(logpath);
      done();
    });
  });

  it('warning test', function(done) {
    log.warning('test', function() {
      data = fs.readFileSync(logpath);
      data.toString().length.should.equal(36);
      fs.unlinkSync(logpath);
      done();
    });
  });

  it('notice test', function(done) {
    log.critical('notice', function() {
      data = fs.readFileSync(logpath);
      data.toString().length.should.equal(39);
      fs.unlinkSync(logpath);
      done();
    });
  });

  it('debug test', function(done) {
    log.debug('test', function() {
      data = fs.readFileSync(logpath);
      data.toString().length.should.equal(34);
      fs.unlinkSync(logpath);
      done();
    });
  });

  it('100 messages test', function(done) {
    for (var i = 0; i < 100; i++) {
      log.info('test');
    }
    setTimeout(function() {
      data = fs.readFileSync(logpath);
      data.toString().length.should.equal(3300);
      fs.unlinkSync(logpath);
      done();
    }, 100);
  });

  after(function(done) {
    fs.unlink(logpath, function() {
      done();
    });
  });
});