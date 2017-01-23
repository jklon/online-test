'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('result', {
    templateUrl: 'online-test/result.template.html',
    controller: ['DiagnosticTest', '$scope',
      function ResultController(DiagnosticTest, $scope) {        
        this.diagnostic_test_result = DiagnosticTest.getData('diagnostic_test_result')
        this.color_labels = ["LightGoldenRodYellow", "Aquamarine", "DarkGrey", "DeepSkyBlue", "FloralWhite", "LavenderBlush"]
        console.log(this.diagnostic_test_result);     
      }
    ]
  })