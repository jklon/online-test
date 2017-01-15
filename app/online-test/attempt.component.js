'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('attempt', {
    templateUrl: 'online-test/attempt.template.html',
    controller: ['DiagnosticTest', '$scope',
      function AttemptController(DiagnosticTest, $scope) {
        console.log("This is AttemptController");
        console.log(DiagnosticTest.getAllData())
        var self = this;
        self.current_question_index = 0;


        self.change_question = function(question_index){
          try {
            if (typeof question_index == "string"){
              question_index = parseInt(question_index)
              console.log(question_index)
            }
          } catch(err){
            console.log(err)
            return
          }

          if(question_index < self.fetched_questions.length){
            self.current_question_index = question_index
            self.reset_timer()
          }
        }

        self.reset_timer = function(){
          self.current_question_start_time = Date.now();
        }
        self.reset_timer();

        self.get_time_spent = function(){
          return (Date.now() - self.current_question_start_time)/1000
        }

        self.get_displayed_question_index = function(){
          return self.current_question_index;
        }

        DiagnosticTest.http.get_test(
          {
            standard_id: DiagnosticTest.getData('standard_id'),
            subject_id: DiagnosticTest.getData('standard_id')
          }, function(data){
            self.build_diagnostic_test_data(data)
          }
        )


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
          $.each(self.fetched_questions, function(key, value) {
            self.diagnostic_test_data.diagnostic_test.short_choice_questions[value.short_choice_question_id] = {
              question_text: value.question_text,
              attempt_count:0,
              index: key,
              score: 0,
              time_taken:0,
              selected_answers: {}
            }
          });
          console.log(self.fetched_questions)
          $(document).ready(function(){
            var html = "";
            for (var i=0; i<self.fetched_questions.length;i++){
              html += '<span>'+(i+1)+'</span>'
            }
            $("#sidebar-question-index").append(html)
          })
          $("#sidebar-question-index span").on("click",function(event){
            $scope.$apply(function(){
              self.change_question(parseInt($(event.currentTarget).html()) - 1)
            })
          })
        }


        self.select_answer = function(question_id, index){
          var answer_object = self.fetched_questions[0].answers[index];
          var present_question = self.diagnostic_test_data.diagnostic_test.short_choice_questions[question_id]
          present_question.attempt_count += 1
          present_question.selected_answers[answer_object.short_choice_answer_id] = {
            text: answer_object.answer_text,
            index: present_question.attempt_count,
            time_taken: self.get_time_spent(),
          }
          present_question.answer_selected = answer_object.short_choice_answer_id;
          present_question.time_taken += self.get_time_spent();
          if (self.current_question_index < self.fetched_questions.length){
            self.change_question(self.get_displayed_question_index() + 1);
          }
        }

      }
    ]
  });
