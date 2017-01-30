angular.
  module('core.diagnostic-test').
  factory('DiagnosticTest', ['$resource', '$rootScope',
    function($resource, $rootScope){
      const data = {
        'question_status_data' : {data:[]},
        'standard_id' : {},
        'stream_id'   : {},
        'user': {},
        'diagnostic_test_result':{},
        'personalized':{},
        'current_question_index':{data:0},  
      }

      const data_template = {
        'question_status_data' : {data:[]},
        'standard_id' : {},
        'stream_id'   : {},
        'user': {},
        'diagnostic_test_result':{},
        'personalized':{},
        'current_question_index':{data:0},
      }

      var attempt_ready = false;

      return {
          getData: function(key) {
             return data[key].data
          },
          setData: function(key,value) {
            Object.assign(data[key], value)
          },

          getAllData: function(){
            return data
          },

          clearAllData: function(){
            console.log("Cleaning DiagnosticTest service data");
            Object.assign(data, data_template);
            attempt_ready = false
            return true
          },

          setQuestionStatus: function(index, value){
            Object.assign(data['question_status_data'].data[index], value)
          },

          attempt_ready: function(value){
            if (value){
              attempt_ready = value
            }
            return attempt_ready
          },

          http: $resource($rootScope.base_url_api + 'api/diagnostic_tests/get_test.json', {}, {
            get_test: {
              method: 'GET',
              headers: {"Authorization" : "Basic " + btoa("education:education") }
            },

            submit_test:{
              method: 'POST',
              url: $rootScope.base_url_api + 'api/diagnostic_tests/test_attempt.json',
              headers: {"Authorization" : "Basic " + btoa("education:education") },
            },

            get_standards: {
              method: "GET",
              url: $rootScope.base_url_api + "api/standards/get_standards.json",
              headers: {"Authorization" : "Basic " + btoa("education:education")}
            },

            get_attempt_details:{
              method: "GET",
              url: $rootScope.base_url_api + "api/diagnostic_tests/get_attempt_details.json",
              headers: {"Authorization" : "Basic " + btoa("education:education")}
            },
          }),

      };
    }
  ]);