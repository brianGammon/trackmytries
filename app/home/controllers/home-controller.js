(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($timeout) {
    var vm = this;
    vm.ctrlName = 'HomeCtrl';

    vm.chartConfig = {
      options: {
        chart: {
          type: 'areaspline'
        },
        exporting: {enabled: false},
        yAxis: {
          min: 20,
          title: {text: null},
          plotLines: [{
            value: 72,
            color: 'green',
            width: 2,
            zIndex: 3,
            label: {text: 'Goal: 72'},
            dashStyle: 'shortdash'
          }]
        }
      },
      series: [
        {
          name: 'Number completed',
          data: [
            [Date.UTC(2012, 7, 6), 24],
            [Date.UTC(2012, 7, 17), 40],
            [Date.UTC(2012, 8, 16), 50],
            [Date.UTC(2012, 8, 23), 53],
            [Date.UTC(2012, 9, 20), 61],
            [Date.UTC(2012, 10, 1), 43],
            [Date.UTC(2012, 10, 17), 72],
            [Date.UTC(2012, 10, 28), 65],
            [Date.UTC(2012, 11, 3), 55],
            [Date.UTC(2012, 11, 25), 63],
            [Date.UTC(2013, 0, 31), 66],
            [Date.UTC(2013, 1, 2), 69]
          ],
          marker: {
            enabled: true
          }
        }
      ],
      title: {
        text: 'Push Ups'
      },
      subtitle: {
        text: 'Number of push ups completed in 2 minutes'
      },
      // Configuration for the xAxis (optional). Currently only one x axis can be dynamically controlled.
      // properties currentMin and currentMax provided 2-way binding to the chart's maximum and minimum
      xAxis: {
        type: 'datetime'
      },
      // function to trigger reflow in bootstrap containers
      // see: http://jsfiddle.net/pgbc988d/ and https://github.com/pablojim/highcharts-ng/issues/211
      func: function (chart) {
        $timeout(function () {
          chart.reflow();
          // The below is an event that will trigger all instances of charts to reflow
          // $scope.$broadcast('highchartsng.reflow');
        }, 0);
      }
    };
  }
}());
