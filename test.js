var questionnaire = require('./')
var tape = require('tape')
var values = require('object-values')
var variables = require('boolean-json-variables')

tape(function(test) {
  test.test('variables', function(test) {
    var variablesInPrompts = questionnaire.prompts
      .map(function(prompt) { return prompt.variable })
    values(questionnaire.conclusions).forEach(function(conclusion) {
      variables(conclusion.expression).forEach(function(variable) {
        test.assert(
          ( variablesInPrompts.indexOf(variable) >= 0 ),
          'variable "' + variable + '" is set by a prompt') }) })
    test.end() }) })
