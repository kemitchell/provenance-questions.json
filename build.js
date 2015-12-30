var data = require('country-data').countries.all
var lispy = require('lispy-json')

process.stdin.resume()

var buffers = [ ]

process.stdin
  .on('data', function(buffer) {
    buffers.push(buffer) })
  .on('end', function() {
    process.stdout.write(
      lispy(
        JSON.parse(
          Buffer.concat(buffers)
            .toString()
            .replace(
              '"$COUNTRIES"',
              JSON.stringify(
                Object.keys(data)
                  .map(function(key) {
                    return data[key].name })))))) })
