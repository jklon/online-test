'use strict';
angular.
  module('core').
  component('header', {
    templateUrl: 'core/header/header.template.html',
    controller: ['DiagnosticTest', '$scope', '$mdSidenav',
      function HeaderController(DiagnosticTest, $scope, $mdSidenav) {
        console.log("Header component")
        var self = this
        self.diagnostic_test_data = DiagnosticTest.getAllData();
        self.show_data = function(){
          console.log(self.diagnostic_test_data)
        }
        self.toggleSidenav = function(){
          $mdSidenav('left').toggle()
        }

        self.change_question = function(current_question_index){
          var previous_question = self.diagnostic_test_data.current_question_index.data
          console.log(previous_question)
          DiagnosticTest.setQuestionStatus(previous_question, {
            class: self.diagnostic_test_data.question_status_data.data[previous_question].static_class
          })
          DiagnosticTest.setQuestionStatus(current_question_index, {class:"attempting"});
          DiagnosticTest.setData('current_question_index', {data:current_question_index});
        }

      }
    ]
  })