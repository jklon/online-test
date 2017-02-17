'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('onlineTest', {
    templateUrl: 'online-test/online-test.template.html',
    controller: ['$routeParams', 'DiagnosticTest', '$rootScope', '$location', '$http',
      function OnlineTestController($routeParams, DiagnosticTest, $rootScope, $location, $http) {
        var self = this;
        self.standard_form_class = false 

        self.submitStudentForm = function(){
          DiagnosticTest.setData('user', {data:{
              first_name: self.user.first_name,
              last_name: self.user.last_name,
              email: self.user.number.toString() + "@resopccp.com",
              number: self.user.number
            }}
          )

          if (self.standard_form_class == false){
            DiagnosticTest.http.get_attempt_details({
              number: self.user.number
            }, function(data){
              if (data.personalized.count > 0){
                console.log(data.personalized.count);
                DiagnosticTest.setData('standard_id', {data:data.standards.standard_id});
                DiagnosticTest.setData('personalized', {data:data.personalized.count});
                
                DiagnosticTest.attempt_ready(true);
                $location.url('/online-test/attempt')
              } else {
                // DiagnosticTest.http.get_standards({}, function(data){
                //   self.standards = data.standards
                //   console.log(self.standards);
                // })
                self.standards = data.standards
                for (var key in data.standards){
                  self.subjects[data.standards[key].standard_id] = data.standards[key].subjects
                }
                for (var key in self.subjects){
                  for (var key2 in self.subjects[key]){
                    self.streams[self.subjects[key][key2].subject_id] = self.subjects[key][key2].streams
                  }
                }
                console.log(self.subjects)
                console.log(self.streams)
                self.standard_form_class = true
              }
            })
          } else if (self.standard_id) {
            DiagnosticTest.setData('standard_id', {data:self.standard_id})
            DiagnosticTest.setData('subject_id', {data:self.subject_id})
            DiagnosticTest.setData('stream_id', {data:self.stream_id})
            DiagnosticTest.attempt_ready(true);
            $location.url('/online-test/attempt')
          }
        }

        // DiagnosticTest.http.get_standards({}, function(data){
        //   self.standards = data.standards
        //   console.log(self.standards);
        // })

        self.user = {
          first_name:'Neeraj',
          last_name: 'Resonance-PCCP',
          number:9879879879,
          email: '9740644522@resopccp.com'
        }
        self.streams = {}
        self.subjects = {}
        self.standard_id = null;
        self.stream_id = null;
        self.subject_id = null;        

        
        // $(document).ready(function(){
        //   $("#sidebar-wrapper").html("")
        // })

      }
    ]
  });
