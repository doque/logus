var path    = require('path'),
    fs      = require('fs'),
    format  = require('util').format,

formatNumber = function(n) {
  return (n < 10) ? '0' + n : '' + n;
},

time = function() {
  var now = new Date();
  return format('%s-%s-%s %s:%s:%s',
    now.getFullYear(),
    formatNumber(now.getMonth() + 1),
    formatNumber(now.getDate()),
    formatNumber(now.getHours()),
    formatNumber(now.getMinutes()),
    formatNumber(now.getSeconds())
  );
},

write = function(level, text, logpath, cb) {
  var stream = fs.createWriteStream(logpath, {flags: "a+"}),
      message = [];

  message.push(time());
  message.push('[' + level.toUpperCase() + ']');
  message.push(text);
  message.push("\n");

  stream.write(message.join(' '));

  stream.end();

  stream.on('finish', function() {
    cb();
  });

  stream.on('error', function(err) {
    cb(err);
  });
};

module.exports = function(logpath) {
  var log = function(level, args) {
    var cb = typeof args[1] === "function" ? args[1] : function() {};
    write(level, args[0], logpath, cb);
  };

  return {
    critical: function() {
      log('critical', arguments);
    },
    error: function() {
      log('error', arguments);
    },
    warning: function() {
      log('warning', arguments);
    },
    notice: function() {
      log('notice', arguments);
    },
    info: function() {
      log('info', arguments);
    },
    debug: function() {
      log('debug', arguments);
    }
  };
};