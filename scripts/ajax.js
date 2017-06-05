(function (angular) {
    angular.module('shipOwner').factory("shipOwnerService", ['$http', '$rootScope', '$q' , '$location',  function ($http, $rootScope, $q, $location) {

    //code to configure the cache in sugeestion query
    var chartHttpServices = function (url ,payload) {
        var self = this;
       var defaultParams = {"month": "1","year": "2016" };
        self.url = url;
        self.onError = function onError(type, data, deferred){
                  deferred.reject(data);
        };

        self.get = function (params) {
            if (!params) params = {};
            var deferred = $q.defer();
            self.params = params;

                $http.get(self.url, {params: params}).success(function (data) {
                    deferred.resolve(data);
                }).error(function (data) {
                    self.onError('GET', data, deferred);
                });
            return deferred.promise;
        };
        self.post = function (data) {
          var deferred = $q.defer();

            var params =  data ? angular.extend(defaultParams, data): defaultParams;
            var config = {
                headers: {
                    'Content-type': 'application/json'
                },
                'dataType': 'json'
            };
          $http.post(self.url, params ,config).success(function (data) {
              deferred.resolve(data);
            }).error(function (data) {
              self.onError('POST', data, deferred);
            });
            return deferred.promise;
        };

    };
    var shipOwnerService = {
        callFunc: function (url) {
            if (!url) {
                return false;
            }
            return new chartHttpServices(url);
        }
    };
    return shipOwnerService;
}]);

})(angular);
