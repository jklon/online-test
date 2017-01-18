'use strict';

// Register `phoneDetail` component, along with its associated controller and template
angular.
  module('onlineTest').
  component('onlineTest', {
    templateUrl: 'online-test/online-test.template.html',
    controller: ['$routeParams', 'DiagnosticTest', '$rootScope', '$location', '$http',
      function OnlineTestController($routeParams, DiagnosticTest, $rootScope, $location, $http) {
        var self = this;

        self.submitStudentForm = function(){
          if (self.standard_id) {
            DiagnosticTest.setData('standard_id', {data:self.standard_id});
            DiagnosticTest.setData('user', {data:{
                first_name: self.user.first_name,
                last_name: self.user.last_name,
                email: self.user.number.toString() + "@resopccp.com",
                number: self.user.number
              }}
            )
            $location.url('/online-test/attempt')
          }
        }


        self.resetForm = function(){
        }

        $http.get($rootScope.base_url_api + "api/standards/get_standards.json").then(function(response){
          self.standards = response.data.standards
          console.log(self.standards);
        })

        self.user = {
          first_name:'Neeraj',
          last_name: 'Resonance-PCCP',
          number:9015853951,
          email: '8005946506@resopccp.com'
        }
        self.standard_id = null
        self.subject_id = '';
      }
    ]
  });
