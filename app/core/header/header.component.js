'use strict';
angular.
  module('core').
  component('header', {
    templateUrl: 'core/header/header.template.html',
    controller: ['DiagnosticTest', '$scope', '$mdSidenav',
      function HeaderController(DiagnosticTest, $scope, $mdSidenav) {
        console.log("Header component")
        this.question_status_data = DiagnosticTest.getData('question_status_data');
        this.toggleSidenav = function(){
          $mdSidenav('left').toggle()
        }

      }
    ]
  })