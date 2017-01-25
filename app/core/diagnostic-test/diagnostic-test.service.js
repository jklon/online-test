angular.
  module('core.diagnostic-test').
  factory('DiagnosticTest', ['$resource', '$rootScope',
    ($resource, $rootScope) => {
      const data = {
        'question_status_data' : {data:[]},
        'standard_id' : {},
        'user': {},
        'diagnostic_test_result':{},
        'personalized':{},
      }

      const data_template = {
        'question_status_data' : {data:[]},
        'standard_id' : {},
        'user': {},
        'diagnostic_test_result':{},
        'personalized':{},
      }

      var attempt_ready = false;

      return {
          getData(key) {
             return data[key].data
          },
          setData(key,value) {
            Object.assign(data[key], value)
          },

          getAllData(){
            return data
          },

          clearAllData(){
            console.log("Cleaning DiagnosticTest service data");
            Object.assign(data, data_template);
            attempt_ready = false
            return true
          },

          attempt_ready(value=null){
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