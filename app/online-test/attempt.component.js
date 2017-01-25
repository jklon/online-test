'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('attempt', {
    templateUrl: 'online-test/attempt.template.html',
    controller: ['DiagnosticTest', '$scope', '$location',
      function AttemptController(DiagnosticTest, $scope, $location) {
        console.log("This is AttemptController");
        console.log(DiagnosticTest.getAllData())
        var self = this;
        
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
          }
        }

        DiagnosticTest.http.get_test( test_params , function(data){
            self.build_diagnostic_test_data(data)
          }
        )

        self.current_question_index = 0;
        if (DiagnosticTest.attempt_ready() == false){
          console.log(DiagnosticTest.attempt_ready())
          $location.url("/online-test/")
        }

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
          self.question_status_data[question_index] = {class:"attempting", attempt:1}
          DiagnosticTest.setData('question_status_data', {data:self.question_status_data})
          $("#side_panel_question_"+self.current_question_index).removeClass("untouched").addClass("attempting")
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
          self.question_status_data = []
          $.each(self.fetched_questions, function(key, value) {
            self.question_status_data.push({class:"untouched"})
            self.diagnostic_test_data.diagnostic_test.short_choice_questions[value.short_choice_question_id] = {
              question_text: value.question_text,
              attempt_count:0,
              attempt:self.question_status_data[key].attempt || 0,
              index: key,
              score: 0,
              time_taken:0,
              selected_answers: {}
            }
          });
          DiagnosticTest.setData("question_status_data", {data:self.question_status_data})
          console.log(self.fetched_questions)
          $(document).ready(function(){
            $("#sidebar-wrapper").html("").html('<div id="sidebar-question-index"><p>Question list</p><div id="side-panel-questions"></div></div>');
            var html = "";
            for (var i=0; i<self.fetched_questions.length;i++){
              html += '<span id="side_panel_question_'+i+'">'+(i+1)+'</span>'
            }
            html += '<br><br><button id="test_submit_btn" type="button" class="btn btn-success">Submit test</button>'
            $("#side-panel-questions").html("").append(html)
            $("#test_submit_btn").on("click", function(){
              DiagnosticTest.http.submit_test(self.diagnostic_test_data, function(data){
                DiagnosticTest.setData('diagnostic_test_result', {data:{
                  personalized_test_remaining: data.personalized_test_remaining,
                  result: data.result,
                  weak_entity: data.weak_entity 
                }})
                $location.url('/online-test/result')
              })
            })
          })
          $("#side_panel_question_"+self.get_displayed_question_index()).removeClass("untouched").addClass("attempting")
          $("#sidebar-question-index span").on("click",function(event){
            $("#side_panel_question_"+self.get_displayed_question_index()).removeClass("attempting")
            $scope.$apply(function(){
              self.change_question(parseInt($(event.currentTarget).html()) - 1)
            })
          })
          self.change_question(0);
        }


        self.select_answer = function(question_id, answer_index){
          $("#side_panel_question_"+self.get_displayed_question_index()).removeClass("untouched").removeClass("attempting").addClass("attempted")
          var answer_object = self.fetched_questions[self.get_displayed_question_index()].answers[answer_index];
          var present_question = self.diagnostic_test_data.diagnostic_test.short_choice_questions[question_id]
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

          self.question_status_data[self.get_displayed_question_index()] = {class:'attempted'}
          present_question.answer_selected = answer_object.short_choice_answer_id;
          present_question.time_taken += self.get_time_spent();
          if (self.current_question_index < self.fetched_questions.length){
            self.change_question(self.get_displayed_question_index() + 1);
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
        element.text(newValue);
        refresh(element[0]);
      });
    }
  };
});
