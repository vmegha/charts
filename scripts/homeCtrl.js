(function (angular) {
    angular.module('appController', [])
        .controller('homeCtrl', function ($scope,$rootScope, $state, chartTypesFactory, myConfig ,urlConfig,shipOwnerService) {
            $scope.cityName="DELHI-NCR";
            $rootScope.region = 'DELHI-NCR';
            $scope.region=$rootScope.region;
            $scope.boundPoliciesActiveTab="allAreas";
            $scope.chatData=[
                {"name": "Jack",
                  "text": "Hey!! Is your project complete?",
                  "imgsrc": "http://placehold.it/50/55C1E7/fff",
                   "class": "left",
                    "time": "12 mins ago"
                },
                {
                   "name" : "Me",
                    "text" : "Yes, I did it on time :)",
                    "imgsrc": "http://placehold.it/50/FA6F57/fff",
                    "class": "right",
                    "time": "10 mins ago"
                },
                {
                    "name": "Jack",
                    "text": "That's Great, On what technology u have made it?",
                    "imgsrc": "http://placehold.it/50/55C1E7/fff",
                    "class": "left",
                    "time": "9 mins ago"
                },
                {
                    "name" : "Me",
                    "text" : "Angular framework, bootstrap, Javascript",
                    "imgsrc": "http://placehold.it/50/FA6F57/fff",
                    "class": "right",
                    "time": "8 mins ago"
                },

            ];

            $scope.available = function(){
                document.getElementsByClassName("panel-body")[0].style.backgroundColor = 'green';
            }

            $scope.busy = function(){
                document.getElementsByClassName("panel-body")[0].style.backgroundColor = '#ff8100';
            }
            $scope.away = function(){
                document.getElementsByClassName("panel-body")[0].style.backgroundColor = 'yellow';
            }
            $scope.close = function(){
                document.getElementsByClassName("panel-body")[0].style.backgroundColor = 'transparent';
            }

            $scope.addChat = function(msg){
                var newMsg={
                    "name" : "Me",
                    "text" : msg,
                    "imgsrc": "http://placehold.it/50/FA6F57/fff",
                    "class": "right",
                    "time": "6 mins ago"
                }
                $scope.chatData.push(newMsg);
                $scope.sendNewMsg = "";
            }

            $scope.clearData = function(){
                $scope.chatData = [];
                $scope.sendNewMsg = "";
            }


            var boundSvc = shipOwnerService.callFunc(urlConfig.boundPolicies);



            $scope.chagetab=function(activeTab){
                $scope.boundPoliciesActiveTab = activeTab;
                $scope.getBoundPoliciesFromRegion();
            };


            $scope.showCityWiseData = function(){
                var cityWiseDataSvc = shipOwnerService.callFunc(urlConfig.cityWiseData);
                cityWiseDataSvc.post().then(function(data){
                    $scope.cityWiseData = data;
                    $scope.changeLocation($scope.cityName);
                },
                function(error){
                    console.log(error);
                })
            }

            $scope.showCityWiseData();

            $scope.changeLocation = function(cityName){
                $scope.cities=[];
                var cityMatched = 0;
                angular.forEach($scope.cityWiseData, function(data){
                    $scope.cities.push(data.city);
                    if(data.city.toLowerCase() == cityName.toLowerCase() ){
                        cityMatched = 1;
                        $scope.cityName= data.city;
                        $scope.topBarData = data.topBarData;
                        $scope.personInfo = data.personInfo;
                        $scope.strikeRateData = data.strikeRate;
                        $scope.getBoundPoliciesFromRegion();
                    }
                });
                if(!cityMatched){
                    $scope.cityName= $scope.cityWiseData[0].city;
                    $scope.topBarData = $scope.cityWiseData[0].topBarData;
                    $scope.personInfo = $scope.cityWiseData[0].personInfo;
                    $scope.strikeRateData = $scope.cityWiseData[0].strikeRate;
                    $scope.getBoundPoliciesFromRegion();
                }
            }


            boundSvc.post().then(function(data){
                    $scope.boundPolicies=data;
                     $scope.getBoundPoliciesFromRegion();
                    },
                function(error){
                    console.log(error);
            });



            $scope.getBoundPoliciesFromRegion =function() {
                var test = {};
                angular.forEach($scope.boundPolicies, function (value, key) {

                 if (value.region.toLowerCase() == $scope.region.toLowerCase()) {
                        test[$scope.region] = value.boundPolicies;
                    }
                });
                $scope.boundPoliciesByRegion = test;

            }



        });




})(angular);
