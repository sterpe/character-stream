const sprintf = require('sprintf-js').sprintf
const mississippi = require('mississippi')

const e = 'CharacterStream encoded chunk as %s, was %s.'

module.exports = function CharacterStream (encoding) {
  return mississippi.through(function (chunk, enc, cb) {
    const chunkWasBuffer = enc === 'buffer'
    let s = chunk
    let i = 0

    if (chunkWasBuffer) {
      s = chunk.toString(encoding)
    } else if (enc !== encoding) {
      console.warn(sprintf(e, encoding, enc))
    }

    for (; i < s.length; ++i) {
      chunk = chunkWasBuffer
        ? new Buffer(s[i], encoding)
        : s[i]
      this.push(chunk)
    }

    cb()
  })
}
