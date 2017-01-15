angular.
  module('core.diagnostic-test').
  factory('DiagnosticTest', ['$resource', '$rootScope',
    function($resource, $rootScope) {
      data = {}
      return{ 

        http: $resource($rootScope.base_url_api + 'api/diagnostic_tests/get_test.json', {}, {
          get_test: {
            method: 'GET'
          }
        }),

        setData: function(key, value){
          self.data[key] = value
          console.log(self.data)
        },

        getData: function(key){
          return self.data[key]
        },

        getAllData: function(){
          return self.data
        }
      }
    }
  ]);