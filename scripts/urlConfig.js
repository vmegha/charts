/**
 * Created by Megha verma on 3 june, 2017.
 */
(function (angular) {
    "use strict";

    angular.module('shipOwner').factory('urlConfig', [function () {
       // var productionUrl = "http://54.229.87.40/sqr/services";
        var productionUrl = "./";

        var urlConfig;
        urlConfig = {
            boundPolicies : productionUrl + '/boundPolicies.json',
            cityWiseData: productionUrl + '/cityWiseData.json'
        };
        return urlConfig;
    }]);

})(angular);

