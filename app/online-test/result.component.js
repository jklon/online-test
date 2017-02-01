'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('result', {
    templateUrl: 'online-test/result.template.html',
    controller: ['DiagnosticTest', '$scope', '$location','$mdDialog',
      function ResultController(DiagnosticTest, $scope, $location,$mdDialog) {        
        this.diagnostic_test_result = DiagnosticTest.getData('diagnostic_test_result')
        if (!this.diagnostic_test_result){
          $location.url("/online-test/")
        }
        this.color_labels = ["Aquamarine", "DarkGrey", "DeepSkyBlue", "FloralWhite", "LavenderBlush","LightGoldenRodYellow"]
        console.log(this.diagnostic_test_result); 
        $scope.attemptNames = ["Unseen","Unattempted","Incorrect","Correct"];
        var result_json = this.diagnostic_test_result;
        $scope.diffAnalysisInfoTitle = "More about Difficulty Analysis";
        $scope.diffAnalysisInfoContent = "In this section, you can see analysis of your attempt based on different difficulty levels. With respect to each level of difficulty, you can see total questions in the paper and number of questions correctly attempted by you.";
        $scope.attemptBreakupInfoTitle = "More about Attempt Breakup";
        $scope.attemptBreakupInfoContent = "In this section, you can see breakup of your attempt. You can see number of correctly answered, incorrectly answered and unattempted questions in the form of pie chart. ";
        $scope.topicwiseAnalysisInfoTitle = "More about Topicwise Scores";
        $scope.topicwiseAnalysisInfoContent = "In this section, you can see the your scores for each topic. Your final Score is an weighted average of these topicwise scores";
        $scope.topicwiseTimeAnalysisInfoTitle = "More about Topicwise Time Analysis";
        $scope.topicwiseTimeAnalysisInfoContent = "In this section, you can see analysis of your attempt based on topicwise scores and amount of time you spent on questions of that topic.";
        $scope.chapterwiseTimeAnalysisInfoTitle = "More about Chapterwise Time Analysis";
        $scope.chapterwiseTimeAnalysisInfoContent = "In this section, you can see analysis of your attempt based on chapterwise score and amount of time you spent questions of that chapter";
        $scope.resoTipInfoTitle = "More about Reso Tip";
        $scope.resoTipInfoContent = "Based on your attempt, our algorithm finds out the topics where you need to focus more. Our algorithm takes into account both the time you took to solve the question and whether you have ebeen able to solve that question or not.";
        $scope.overallAnalysisInfoTitle = "More about Overall analysis";
        $scope.overallAnalysisInfoContent = "In this section, you can see analysis of your attempt based on different difficulty levels. With respect to each level of difficulty, you can see total questions in the paper and number of questions correctly attempted by you.";
        $scope.questionAnalysisInfoTitle = "More about Question Analysis";
        $scope.questionAnalysisInfoContent = "In this section, you can see analysis of every question attempted by you. For each question, you can see the topic and chapter associated with that question, difficulty level and result of your attempt.";
        $scope.showDialogInfo = function(ev,title,content) {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(title)
                .textContent(content)
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

          };
        $scope.stringWrapper= function(text){
          text = text.replace(/-/g , " ");
          return (text.charAt(0).toUpperCase() + text.slice(1));
        };
          $scope.createLabelArray = function(length,type){
            var label_array = new Array(length);
            for (let index = 0; index < label_array.length; index++) {
                 label_array[index] = type+"#"+index;
            }
            console.log(label_array)
            return label_array;
            // return array;
          };
        //Difficulty Breakup Graph section
        // $scope.colors = ['#f44242', '#42f4f1', '#40E0D0'];
        // $scope.labels = ['Total', 'Easy', 'Medium', 'Tough'];
        // $scope.series = ['Correct', 'Total'];

        // $scope.data = [
        //   [20, 10, 5, 5],
        //   [10, 4, 2, 3]
        // ]; 
        // //Correct Pie chart
        // $scope.attempt_colors = ['#ff8e72', '#f44242', '#42f4f1'];
        //   $scope.attempt_labels = ["Answered Correctly", "Answered incorrectly","Unattempted"];
        //   $scope.attempt_data = [6, 3,1];
        // //Topicwise Analysis Graph section
        // $scope.topicwise_colors = ['#f4a142']
        // $scope.topicwise_labels = ['Topic1', 'Topic2', 'Topic3', 'Topic4'];
        // $scope.topicwise_series = ['Correct'];

        // $scope.topicwise_data = [
        //   [10, 4, 2, 3]
        // ];  
        // //time Analysis
        // $scope.time_labels =["Chapter1", "Chapter2", "Chapter3", "Chapter4", "Chapter5", "Chapter6", "Chapter7"];
        // $scope.time_colors = ['#da35e0','#1d9e1a'];
        // $scope.time_data = [
        //   [65, 59, 90, 81, 56, 55, 40],
        //   [28, 48, 40, 19, 96, 27, 100]
        // ];
        // $scope.topic_time_labels =["Chapter1", "Chapter2", "Chapter3", "Chapter4", "Chapter5", "Chapter6", "Chapter7"];
        // $scope.topic_labels = $scope.createLabelArray($scope.topic_time_labels.length,"Topic");
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
        $scope.colors = ['#f44242', '#42f4f1', '#40E0D0'];
        $scope.data = [
          Object.values(result_json.difficulty_breakup).map( function(el) { return el.total; }),
          Object.values(result_json.difficulty_breakup).map( function(el) { return el.correct; })
        ]; 
        console.log($scope.labels);
        console.log($scope.series);
        console.log($scope.data);
        //Correct Pie chart
        $scope.attempt_colors = ['#ff8e72', '#f44242', '#42f4f1'];
          $scope.attempt_labels = ["Answered Correctly", "Answered incorrectly","Unattempted"];
          $scope.attempt_data = [result_json.difficulty_breakup.total.incorrect, 
          result_json.difficulty_breakup.total.correct,
          result_json.difficulty_breakup.total.unattempted ];
        //Topicwise Analysis Graph section
        $scope.topicwise_colors = ['#f4a142']
        var topics = Object.values(result_json.result.streams).map( function(el) { return el.second_topics; });
        $scope.topicwise_labels = Object.values(topics[0]).map( function(el) { return el.second_topic_name; });
        $scope.topicwise_series = ['Correct'];

        $scope.topicwise_data = [
          Object.values(topics[0]).map( function(el) { return el.score; })
        ];  
        //time Analysis
        $scope.time_colors = ['#da35e0','#1d9e1a'];
        $scope.topic_time_labels =Object.values(result_json.result.second_topics).map( function(el) { return el.name; });
        $scope.topic_time_data = [
          Object.values(result_json.result.second_topics).map( function(el) { return el.average_time_spent; }),
          Object.values(result_json.result.second_topics).map( function(el) { return el.average_score/100; })
        ];  
        $scope.topic_labels = $scope.createLabelArray($scope.topic_time_labels.length,"Topic");
        $scope.chapter_time_labels =Object.values(result_json.result.chapters).map( function(el) { return $scope.stringWrapper(el.name); });
        $scope.chapter_time_data = [
          Object.values(result_json.result.second_topics).map( function(el) { return el.average_time_spent; }),
          Object.values(result_json.result.second_topics).map( function(el) { return el.average_score/100; })
        ]; 
          $scope.showDifficultyInfo = function(ev) {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('This is an alert title')
                .textContent('You can specify some description text in here.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
            );

          };
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