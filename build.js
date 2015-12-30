var data = require('country-data').countries.all

// Read standard input.
var buffers = [ ]
process.stdin
  .resume()
  .on('data', function(buffer) {
    buffers.push(buffer) })
  .on('end', function() {
    // Bundle embedded schemas.
    require('json-schema-ref-parser').bundle(
      // Parse the template.
      JSON.parse(
        Buffer.concat(buffers)
          .toString()
          // Replace placeholder for country names with JSON array.
          .replace(
            '"$COUNTRIES"',
            JSON.stringify(
              // Map country data in country-data, extracting only
              // country names.
              require('array-uniq')(
                Object.keys(data)
                  .map(function(key) {
                    return data[key].name }))))),
      function(error, schema) {
        // Write to standard input.
        process.stdout.write(
          require('lispy-json')(schema)) }) })
