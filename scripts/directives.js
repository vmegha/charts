/**
 * Created by MEGHA VERMA on 3 JUNE, 2017.
 */

angular.module('shipOwner')
    .directive('donutChart',function(){

        return{
            restrict: 'EA',
            scope:{
                donutValue:'@'
            },
            template: '<div class="c100 p{{donutValue |number:0}} big"><span>{{donutValue|number:0}}%</span><div class="slice"> <div class="bar"></div>'+
            '<div class="fill"></div>'+
            '</div>'+
            '</div>'
        }
    })

    .directive('stackedColumnChart', function($rootScope ,chartTypesFactory) {
    return {
        restrict: "EA",
        scope: {
            policiesByRegion:'=',
            policiesActiveTab:'=',
            region:'='
        },
        template: '<div></div>',
        link: function (scope, element, attrs) {
            scope.$watchGroup(['policiesActiveTab', 'policiesByRegion'], function() {

                var ruralAreas = {}
                var urbanAreas = {}
                if (Object.keys(scope.policiesByRegion).length) {
                    ruralAreas.data = scope.policiesByRegion[scope.region]['ruralAreas'][attrs.type].data;
                    ruralAreas.name = 'urbanAreas';
                    urbanAreas.data = scope.policiesByRegion[scope.region]['urbanAreas'][attrs.type].data;
                    urbanAreas.name = "ruralAreas";


                    var chartoptions = {};
                    chartoptions.categories = scope.policiesByRegion[scope.region]['ruralAreas'][attrs.type].categories;
                    chartoptions.series = [ruralAreas, urbanAreas];
                    chartoptions.element = element[0];
                    var chart = new Highcharts.Chart(chartTypesFactory.stackedColumn(chartoptions));
                }
            });
           }





    }
}).directive('columnChart', function($rootScope ,chartTypesFactory) {
        return {
            restrict: "EA",
            scope: {
                policiesByRegion:'=',
                policiesActiveTab:'=',
                region:'='
            },
            template: '<div></div>',
            link: function (scope, element, attrs) {
                scope.$watchGroup(['policiesActiveTab', 'policiesByRegion'], function() {
                    // all the code here...

                    var ruralAreas ={};
                        var  series =[];
                        if(Object.keys(scope.policiesByRegion).length){
                            ruralAreas.data=scope.policiesByRegion[scope.region][scope.policiesActiveTab][attrs.type].data;
                            ruralAreas.name=scope.policiesActiveTab;
                            angular.forEach(ruralAreas.data, function (item, key) {
                                series.push({
                                    name: scope.policiesByRegion[scope.region][scope.policiesActiveTab][attrs.type].categories[key],
                                            y: parseFloat(item),
                                });
                            });

                            var chartoptions= {};
                            chartoptions.series =series;
                            chartoptions.element =element[0];
                            chartoptions.color = scope.policiesActiveTab=='ruralAreas'?'#291d67':'#019EE3';
                            var chart = new Highcharts.Chart(chartTypesFactory.columnChart(chartoptions));
                        }
                });


            }

        }
    }).directive('stackedBarChart', function($rootScope ,chartTypesFactory) {
    return {
        restrict: "EA",
        scope: {
            policiesByRegion:'=',
            policiesActiveTab:'=',
            region:'='
        },
        templateUrl: './templates/barChart.html',
        controller: function ($scope, $element,$attrs) {
            $scope.getActualCategoryData =function(policiesByRegion,topActiveTab,policiesActiveTab ,index) {

                var original_category = policiesByRegion[$scope.region][topActiveTab].premiumGenerated.categories[index];
                var searching_category = policiesByRegion[$scope.region][policiesActiveTab].premiumGenerated.categories[index]?policiesByRegion[$scope.region][policiesActiveTab].premiumGenerated.categories[index]:'';
                if(original_category == searching_category){

                    return policiesByRegion[$scope.region][policiesActiveTab].premiumGenerated.data[index];
                }
                else {

                    if(policiesByRegion[$scope.region][policiesActiveTab].premiumGenerated.categories.indexOf(original_category) >=0){
                        var searchedindex =policiesByRegion[$scope.region][policiesActiveTab].premiumGenerated.categories.indexOf(original_category);
                        return policiesByRegion[$scope.region][policiesActiveTab].premiumGenerated.data[searchedindex];
                    }
                    else
                    {
                        return 0;

                    }
                }
            }


        },
        link: function (scope, element, attrs) {
            scope.$watchGroup(['policiesActiveTab', 'policiesByRegion'], function() {

            });
         }

    }

})
