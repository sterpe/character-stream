'use strict';

var sprintf = require('sprintf-js').sprintf;
var mississippi = require('mississippi');

var e = 'CharacterStream encoded chunk as %s, was %s.';

module.exports = function CharacterStream(encoding) {
  return mississippi.through(function (chunk, enc, cb) {
    var chunkWasBuffer = enc === 'buffer';
    var s = chunk;
    var i = 0;

    if (chunkWasBuffer) {
      s = chunk.toString(encoding);
    } else if (enc !== encoding) {
      console.warn(sprintf(e, encoding, enc));
    }

    for (; i < s.length; ++i) {
      chunk = chunkWasBuffer ? new Buffer(s[i], encoding) : s[i];
      this.push(chunk);
    }

    cb();
  });
};