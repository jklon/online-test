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
                DiagnosticTest.setData('standard_id', {data:data.standards.standard_id});
                DiagnosticTest.setData('personalized', {data:true})
                DiagnosticTest.attempt_ready(true);
                $location.url('/online-test/attempt')
              } else {
                // DiagnosticTest.http.get_standards({}, function(data){
                //   self.standards = data.standards
                //   console.log(self.standards);
                // })
                self.standards = data.standards
                for (var key in data.standards){
                  self.streams[data.standards[key].standard_id] = data.standards[key].streams
                }
                self.standard_form_class = true
              }
            })
          } else if (self.standard_id) {
            DiagnosticTest.setData('standard_id', {data:self.standard_id})
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
          number:9740644522,
          email: '9740644522@resopccp.com'
        }
        self.streams = {}
        self.standard_id = null
        self.stream_id = null
        self.subject_id = '';
        

        
        // $(document).ready(function(){
        //   $("#sidebar-wrapper").html("")
        // })

      }
    ]
  });
