angular.
  module('core.diagnostic-test').
  factory('DiagnosticTest', ['$resource', '$rootScope',
    ($resource, $rootScope) => {
      const data = {
        'question_status_data' : {data:[]},
        'standard_id' : {},
        'user': {},
        'diagnostic_test_result':{}
      }

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

          http: $resource($rootScope.base_url_api + 'api/diagnostic_tests/get_test.json', {}, {
            get_test: {
              method: 'GET',
              headers: {"Authorization" : "Basic " + btoa("education:education") }
            },

            submit_test:{
              method: 'POST',
              url: $rootScope.base_url_api + 'api/diagnostic_tests/test_attempt.json',
              headers: {"Authorization" : "Basic " + btoa("education:education") },
            }
          }),

      };
    }
  ]);