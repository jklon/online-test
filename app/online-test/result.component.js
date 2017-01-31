'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('result', {
    templateUrl: 'online-test/result.template.html',
    controller: ['DiagnosticTest', '$scope', '$location',
      function ResultController(DiagnosticTest, $scope, $location) {        
        this.diagnostic_test_result = DiagnosticTest.getData('diagnostic_test_result')
        if (!this.diagnostic_test_result){
          $location.url("/online-test/")
        }
        this.color_labels = ["LightGoldenRodYellow", "Aquamarine", "DarkGrey", "DeepSkyBlue", "FloralWhite", "LavenderBlush"]
        console.log(this.diagnostic_test_result); 
        $scope.attemptNames = ["Unseen","Unattempted","Incorrect","Correct"];
        var result_json = this.diagnostic_test_result;
        //Difficulty Breakup Graph section
        // $scope.labels = ['Total', 'Easy', 'Medium', 'Tough'];
        // $scope.series = ['Correct', 'Total'];

        // $scope.data = [
        //   [10, 4, 2, 3],
        //   [20, 10, 5, 5]
        // ]; 
        // //Correct Pie chart
        //   $scope.attempt_labels = ["Answered Correctly", "Answered incorrectly","Unattempted"];
        //   $scope.attempt_data = [6, 3,1];
        // //Topicwise Analysis Graph section
        // $scope.topicwise_labels = ['Topic1', 'Topic2', 'Topic3', 'Topic4'];
        // $scope.topicwise_series = ['Correct'];

        // $scope.topicwise_data = [
        //   [10, 4, 2, 3]
        // ];  
        // //time Analysis
        // $scope.time_labels =["Chapter1", "Chapter2", "Chapter3", "Chapter4", "Chapter5", "Chapter6", "Chapter7"];

        // $scope.time_data = [
        //   [65, 59, 90, 81, 56, 55, 40],
        //   [28, 48, 40, 19, 96, 27, 100]
        // ];
        // $scope.topic_time_labels =["Chapter1", "Chapter2", "Chapter3", "Chapter4", "Chapter5", "Chapter6", "Chapter7"];
        // $scope.topic_time_data = [
        //   [65, 59, 90, 81, 56, 55, 40],
        //   [28, 48, 40, 19, 96, 27, 100]
        // ];
        // $scope.chapter_time_labels =["Chapter1", "Chapter2", "Chapter3", "Chapter4", "Chapter5", "Chapter6", "Chapter7"];
        // $scope.chapter_time_data = [
        //   [65, 59, 90, 81, 56, 55, 40],
        //   [28, 48, 40, 19, 96, 27, 100]
        // ];
        
        //Difficulty Breakup Graph section
        $scope.labels = Object.keys(result_json.difficulty_breakup);
        $scope.series = Object.keys(result_json.difficulty_breakup.total);

        $scope.data = [
          $.map(result_json.difficulty_breakup, function(el) { return el.total; }),
          $.map(result_json.difficulty_breakup, function(el) { return el.correct; })
        ]; 
        console.log($scope.labels);
        console.log($scope.series);
        console.log($scope.data);
        //Correct Pie chart
          $scope.attempt_labels = ["Answered Correctly", "Answered incorrectly","Unattempted"];
          $scope.attempt_data = [result_json.difficulty_breakup.total.incorrect, 
          result_json.difficulty_breakup.total.correct,
          result_json.difficulty_breakup.total.unattempted ];
        //Topicwise Analysis Graph section
        var topics = $.map(result_json.result.streams, function(el) { return el.second_topics; });
        $scope.topicwise_labels = $.map(topics[0], function(el) { return el.second_topic_name; });
        $scope.topicwise_series = ['Correct'];

        $scope.topicwise_data = [
          $.map(topics[0], function(el) { return el.score; })
        ];  
        //time Analysis
        $scope.topic_time_labels =$.map(result_json.result.second_topics, function(el) { return el.name; });
        $scope.topic_time_data = [
          $.map(result_json.result.second_topics, function(el) { return el.average_time_spent; }),
          $.map(result_json.result.second_topics, function(el) { return el.average_score/100; })
        ];  
        $scope.chapter_time_labels =$.map(result_json.result.chapters, function(el) { return el.name; });
        $scope.chapter_time_data = [
          $.map(result_json.result.second_topics, function(el) { return el.average_time_spent; }),
          $.map(result_json.result.second_topics, function(el) { return el.average_score/100; })
        ]; 
        $(document).ready(function(){
          $("#sidebar-wrapper").html("").html('<md-button type="submit" class="md-raised md-primary" id="test_retake_btn" >Start</md-button>')
          $("#test_retake_btn").on("click", function(){
            console.log("clicked");
            DiagnosticTest.clearAllData();
            $scope.$apply(function(){
              $location.url('/online-test/');
            })
          })
        });

        this.start_personalized_test = function(){
          $location.url('/online-test/attempt')
        }
      }
    ]
  })