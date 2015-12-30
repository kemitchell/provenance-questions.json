var data = require('country-data').countries.all

// Read standard input.
var buffers = [ ]
process.stdin
  .resume()
  .on('data', function(buffer) {
    buffers.push(buffer) })
  .on('end', function() {
    // Write to standard input.
    process.stdout.write(
      require('lispy-json')(
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
                Object.keys(data)
                  .map(function(key) {
                    return data[key].name })))))) })
