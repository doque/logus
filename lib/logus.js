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

log = function(level, data, stream) {
  var message = [];

  message.push(time());
  message.push('[' + level.toUpperCase() + ']');
  message.push(format.apply(null, data));
  message.push("\n");

  stream.write(message.join(' '));
},

watch = function(path, callback) {
  var watcher = fs.watch(path, function(event) {
    console.log(event);
    if (event == 'rename') {
      if (watcher) {
        watcher.close();
      }
      callback();
    }
  });
};

module.exports = function(logpath) {
  var stream = fs.createWriteStream(logpath, {flags: "a+"});

  var renameAction = function() {
    stream = fs.createWriteStream(logpath, {flags: "a+"});
    watch(logpath, renameAction);
  };

  watch(logpath, renameAction);

  return {
    critical: function() {
      log('critical', arguments, stream);
    },
    error: function() {
      log('error', arguments, stream);
    },
    warning: function() {
      log('warning', arguments, stream);
    },
    notice: function() {
      log('notice', arguments, stream);
    },
    info: function() {
      log('info', arguments, stream);
    },
    debug: function() {
      log('debug', arguments, stream);
    }
  };
};