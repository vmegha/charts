(function (angular) {
    angular.module('appFactory', [])

    .factory('chartTypesFactory', function () {
        var chartType = {};


            chartType.columnChart = function (chartObject) {
                return {
                    chart: {
                        type: 'column',
                        renderTo:chartObject.element,
                        width: 318,
                        height: 300,
                    },
                    credits: false,
                    title: {text: ''},
                    subtitle: {text: ''},
                    xAxis: {
                        type: 'category',
                        lineColor: 'transparent',
                        labels: {enabled: true },
                        tickLength: 0
                    },
                    yAxis: {
                        title: {text: '' },
                        gridLineColor: 'transparent',
                    },
                    colors: [
                        chartObject.color
                    ],
                    legend: { enabled: false },
                    plotOptions: {
                        series:{
                            borderWidth: 0,
                            pointWidth: 20
                        }
                    },
                    series: [{
                        name: '',

                        data:chartObject.series
                    }]
                }
            }; //end of columnChart function
    chartType.stackedColumn =function(chartObject){
    return {

        chart: {
            type: 'column',
            renderTo:chartObject.element,
            width: 318,
            height: 300,

        },
        credits: false,
        title: {
            text: ''
        },
        xAxis: {
                categories: chartObject.categories,
                lineColor: 'transparent',
                tickLength: 0

        },
        yAxis: {
            min: 0,
                title: {
                text: ''
            },
            title: {text: '' },
            gridLineColor: 'transparent',

        },
        colors: [
            '#009ee2',
            '#281d67'

        ],

        legend: { enabled: false },
        plotOptions: {
            column: {
                stacking: 'normal',

            },
            series:{
                borderWidth: 0,
                    pointWidth: 12,

            }
        },
        series: chartObject.series

    }
};
            chartType.comparisonGraph=function(chartObject){
                return {
            chart: {
                type:'area',
                renderTo: chartObject.element,
                width: 1100,
            },
                    credits: false,
                    title: {
                        text: '',

                    },
                    subtitle: {
                        text: '',

                    },
                    xAxis: {
                        categories: chartObject.categories,
                        lineColor: 'transparent',
                        tickLength: 0,

                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        plotLines: [{

                            color: '#808080'
                        }],
                        gridLineColor: 'transparent',
                    },
                    tooltip: {
                        useHTML: true,
                        //borderWidth: 0,
                        //borderRadius: 0,
                        //shadow: false
                        //,
                        //formatter: function() {
                        //    return '<div class="tooltipdiv"><span class="tooltipspan1">'+this.y+' </span><span class="tooltipspan2"> '+parseInt((this.y /chartObject.totalquotes)*100 )+'</span></div>'
                        //}
                    },
                    legend: {
                            enabled: true,
                            verticalAlign: 'top',
                            align:'right',
                        symbolHeight:10,
                        symbolRadius: 8,
                        symbolWidth: 10

                    },
                    plotOptions: {
                        series: {
                            fillOpacity: 0 ,
                                          marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
                        }
                    },
                    series: chartObject.data
                }
            };

        return chartType;
    });
})(angular)
