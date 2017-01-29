'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('attempt', {
    templateUrl: 'online-test/attempt.template.html',
    controller: ['DiagnosticTest', '$scope', '$location',
      function AttemptController(DiagnosticTest, $scope, $location) {
        if (DiagnosticTest.attempt_ready() == false){
          $location.url("/online-test/")
        }
        console.log("This is AttemptController");
        console.log(DiagnosticTest.getAllData())
        var self = this;
        self.timer_height = 20;
        self.show_all_questions = false;
        self.question_status_data = DiagnosticTest.getAllData().question_status_data
        self.test_start_text = "Hi " + (DiagnosticTest.getData('user') ? DiagnosticTest.getData('user').first_name : "") + ", We have got a personalized test for you designed to improve your week areas based on your last attempt here :)"  
        if (DiagnosticTest.getData('personalized')){
          var test_params = {
            standard_id: DiagnosticTest.getData('standard_id'),
            subject_id: DiagnosticTest.getData('standard_id'),
            personalization_type:1,
            diagnostic_test_id:1,
            number:DiagnosticTest.getData('user').number
          }
        } else {
          var test_params = {
            standard_id: DiagnosticTest.getData('standard_id'),
            subject_id: DiagnosticTest.getData('standard_id'),
            stream_id: DiagnosticTest.getData('stream_id'),
          }
        }

        DiagnosticTest.http.get_test( test_params , function(data){
            self.build_diagnostic_test_data(data)
          }
        )

        self.current_question_index = DiagnosticTest.getAllData().current_question_index;

        self.toggleAllQuestionView = function(){
          self.show_all_questions = !self.show_all_questions
        }

        this.show_data = function(){
          console.log(self.question_status_data)
        }

        self.change_question = function(question_index){
          if (question_index < self.fetched_questions.length){
            var previous_question = self.current_question_index.data
            DiagnosticTest.setQuestionStatus(previous_question, {
              class: self.question_status_data.data[previous_question].static_class
            })
            DiagnosticTest.setQuestionStatus(question_index, {class:"attempting"});
            DiagnosticTest.setData('current_question_index',{data:question_index})     
          }
          var time_spent = self.diagnostic_test_data.diagnostic_test.short_choice_questions[self.fetched_questions[question_index].short_choice_question_id].time_taken
          console.log(((time_spent/90)*100).toString() + "%");
          document.getElementById("animated_timer").style.height = ((time_spent/90)*100).toString() + "%";
        }

        $scope.$watch('$ctrl.current_question_index.data',function(new_val,old_val){
          console.log("Question changed");
          var present_question = self.diagnostic_test_data.diagnostic_test.short_choice_questions[self.fetched_questions[old_val].short_choice_question_id]
          present_question.time_taken += self.get_time_spent();
          DiagnosticTest.setQuestionStatus(new_val, {class:"attempting"})
          self.reset_timer()
        })

        self.reset_timer = function(){
          self.current_question_start_time = Date.now();
        }

        self.reset_timer();

        self.get_time_spent = function(){
          return (Date.now() - self.current_question_start_time)/1000
        }

        self.get_displayed_question_index = function(){
          return self.current_question_index.data;
        }


        self.build_diagnostic_test_data = function(data){
          self.diagnostic_test_data = {
            user: DiagnosticTest.getData("user"),
            diagnostic_test: {
              id: data.diagnostic_test_id,
              short_choice_questions: {
              }
            }
          }
          self.fetched_questions = data.questions
          var temp_question_status_data = []
          $.each(self.fetched_questions, function(key, value) {
            temp_question_status_data.push({class:"untouched", static_class:"untouched"})
            self.diagnostic_test_data.diagnostic_test.short_choice_questions[value.short_choice_question_id] = {
              question_text: value.question_text,
              attempt_count:0,
              attempt:temp_question_status_data[key].attempt || 0,
              index: key,
              score: 0,
              time_taken:0,
              selected_answers: {}
            }
          });
          DiagnosticTest.setData("question_status_data", {data:temp_question_status_data})

          $("#start-test-btn").prop("disabled", false).on("click", function(){
            console.log("Starting the test now");
            self.reset_timer();
            $("#attempt-overlay").addClass("hidden");
          })     
        }

        self.submit_test = function(){
          DiagnosticTest.http.submit_test(self.diagnostic_test_data, function(data){
            DiagnosticTest.setData('diagnostic_test_result', {data:{
              personalized_test_remaining: data.personalized_test_remaining,
              result: data.result,
              weak_entity: data.weak_entity,
              difficulty_breakup: data.difficulty_breakup,
              question_analysis: data.question_analysis, 
            }})
            $location.url('/online-test/result')
          })
        }


        self.select_answer = function(question_id, answer_index){
          var answer_object = self.fetched_questions[self.get_displayed_question_index()].answers[answer_index];
          var present_question = self.diagnostic_test_data.diagnostic_test.short_choice_questions[question_id];
          present_question.attempt_count += 1
          present_question.attempt = answer_object.correct ? 3 : 2
          present_question.selected_answers[answer_object.short_choice_answer_id] = {
            text: answer_object.answer_text,
            index: present_question.attempt_count,
            time_taken: self.get_time_spent(),
          }

          if (answer_object.correct){
            var max_score = 1000
            var max_time_allotted = 90
            var time_elapsed = self.get_time_spent()
            if (time_elapsed <= (max_time_allotted / 3)) {
              present_question.score = max_score;
            }else if((time_elapsed > (max_time_allotted / 3))&&(time_elapsed < (max_time_allotted))){
              present_question.score = ((29 * max_time_allotted - 27 * time_elapsed) * (max_score)) / (20 * max_time_allotted);
            }else {
              present_question.score = max_score / 10;
            }
          }

          DiagnosticTest.setQuestionStatus(self.get_displayed_question_index(),{class:'attempted', static_class:'attempted'})
          present_question.answer_selected = answer_object.short_choice_answer_id;
          present_question.time_taken += self.get_time_spent();
          console.log(self.current_question_index)
          console.log(self.fetched_questions.length)
          if (self.current_question_index.data < self.fetched_questions.length - 1){
            DiagnosticTest.setData('current_question_index',{data:self.get_displayed_question_index() + 1})
          } else {
            self.show_all_questions = true;
          }
        }

      }
    ]
  });

angular.
  module('onlineTest').directive('mathJaxBind', function() {
  var refresh = function(element) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
  };
  return {
    link: function(scope, element, attrs) {
      scope.$watch(attrs.mathJaxBind, function(newValue, oldValue) {
        element.html(newValue);
        refresh(element[0]);
      });
    }
  };
});

angular.
  module('onlineTest').directive('animatedTimer',['$interval', function($interval) {
  return {
    link: function(scope, element, attrs) {
      $interval(function(){
        if (scope.$ctrl.diagnostic_test_data ){
          var time_spent = scope.$ctrl.get_time_spent() + scope.$ctrl.diagnostic_test_data.diagnostic_test.short_choice_questions[attrs['animatedTimer']].time_taken
          if (time_spent <= 90){
            element.css('height', ((time_spent/90)*100).toString() + "%")
          } else {
            element.css('height', "100%")
          }
        }
      },1000, 0);
    }
  };
}]);
