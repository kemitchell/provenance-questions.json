var tape = require('tape')
var questionnaire = require('./')

var values = require('object-values')
var variables = require('boolean-json-variables')

var tv4 = require('tv4')
var http = require('http')

var draft04 = 'http://json-schema.org/draft-04/schema'

tape('provenance-questions', function(test) {
  test.test('variables', function(test) {
    var variablesInPrompts = questionnaire.prompts
      .map(function(prompt) { return prompt.variable })
    values(questionnaire.conclusions).forEach(function(conclusion) {
      variables(conclusion.expression).forEach(function(variable) {
        test.assert(
          ( variablesInPrompts.indexOf(variable) >= 0 ),
          'variable "' + variable + '" is set by a prompt') }) })

  tape.test('validates against schema', function(test) {
    http.get(draft04, function(response) {
      var buffers = [ ]
      response
        .on('data', function(buffer) {
          buffers.push(buffer) })
        .on('end', function() {
          tv4.addSchema(draft04, JSON.parse(Buffer.concat(buffers)))
          test.same(
            tv4.validateMultiple(require('./'), questionnaire).errors,
            [ /* no errors */ ],
            'validates without error')
          test.end() }) }) })

    test.end() }) })

