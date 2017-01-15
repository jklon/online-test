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
        otherwise('/online-test');
    }
  ]);

angular.module('phonecatApp')
.run(function($rootScope) {
  $rootScope.base_url_api = "http://192.168.0.166:3000/"
  // $rootScope.user = {
  //   first_name:'',
  //   last_name: '',
  //   email:'',
  //   number:''
  // }
  // $rootScope.standard_id = ''
})