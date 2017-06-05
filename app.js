(function (angular) {
    angular.module('shipOwner', ['ui.router','appController','appFactory' ,'ngScrollbar' ])
        .run(function () {
        })
        .constant("myConfig", {
            "demoMode": true
        })
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('/', {
                    url: "/",
                    templateUrl: "templates/home.html",
                    controller: "homeCtrl"
                })


            //for unmatched url redirect to home
            $urlRouterProvider.otherwise("/");
        })
})(angular);

