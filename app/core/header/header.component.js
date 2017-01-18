'use strict';
angular.
  module('core').
  component('header', {
    templateUrl: 'core/header/header.template.html',
    controller: ['DiagnosticTest', '$scope',
      function HeaderController(DiagnosticTest, $scope) {
        this.question_status_data = DiagnosticTest.getData('question_status_data');
      }
    ]
  })