logus
=====

[![Build Status](https://travis-ci.org/mmorozov/logus.png?branch=master)](https://travis-ci.org/mmorozov/logus)
[![devDependency Status](https://david-dm.org/mmorozov/logus/dev-status.png)](https://david-dm.org/mmorozov/logus#info=devDependencies)

[![NPM](https://nodei.co/npm/logus.png?stars=true)](https://nodei.co/npm/logus/)

_logus_ is a lightweight file logger library for [node.js](http://nodejs.org).

## Installation

$ npm install logus

## Example
```javascript
var logus = require('logus'),
    log   = logus('test.log');

log.info('info');
log.error('error');

log.info('logus', function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Finished!');
});

```

## License

The MIT License, See the included license.md file.