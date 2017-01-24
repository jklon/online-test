'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('result', {
    templateUrl: 'online-test/result.template.html',
    controller: ['DiagnosticTest', '$scope', '$location',
      function ResultController(DiagnosticTest, $scope, $location) {        
        this.diagnostic_test_result = DiagnosticTest.getData('diagnostic_test_result')
        this.color_labels = ["LightGoldenRodYellow", "Aquamarine", "DarkGrey", "DeepSkyBlue", "FloralWhite", "LavenderBlush"]
        console.log(this.diagnostic_test_result);     
        
        $(document).ready(function(){
          $("#sidebar-wrapper").html("").html('<button class="btn btn-default" id="test_retake_btn" type="button">Start Test</button>')
          $("#test_retake_btn").on("click", function(){
            console.log("clicked");
            DiagnosticTest.clearAllData();
            $scope.$apply(function(){
              $location.url('/online-test/');
            })
          })
        })
      }
    ]
  })