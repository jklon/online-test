'use strict';

angular.
  module('phonecatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/online-test', {
          template: '<online-test></online-test>'
        }).
        when('/online-test/attempt', {
          template: '<attempt></attempt>'
        }).
        when('/online-test/result', {
          template: '<result></result>'
        }).
        otherwise('/online-test');
    }
  ]);

angular.module('phonecatApp')
.run(['$rootScope','$http',function($rootScope, $http) {
  $rootScope.base_url_api = "http://localhost:3000/"
}])
