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
      JSON.parse(Buffer.concat(buffers)),
      function(error, schema) {
        // Write to standard input.
        process.stdout.write(require('lispy-json')(schema) + '\n') }) })
