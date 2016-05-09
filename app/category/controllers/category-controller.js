(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name category.controller:CategoryCtrl
   *
   * @description
   *
   */
  angular
    .module('category')
    .controller('CategoryCtrl', CategoryCtrl);

  function CategoryCtrl(activeCategory, Category, $timeout, $mdDialog, $mdToast, $filter) {
    var vm = this,
        chartInit = false;

    vm.category = activeCategory;
    vm.stats = Category.getStats(activeCategory);

    // items is a promise that must be loaded before trying to render the chart
    vm.stats.items.$loaded(function () {
      if (vm.stats.items.length > 0) {
        initChart();
        refreshChartData();
      }

      // Set a watcher to reflow the chart after a change
      vm.stats.items.$watch(function () {
        if (!chartInit) {
          initChart();
        }
        refreshChartData();
      });
    });

    vm.showItemDialog = function (event, category, item) {
      var priorBest = 0;
      if (vm.stats.items.length > 0) {
        priorBest = vm.stats.best[0].$id;
      }

      $mdDialog.show({
        controller: 'ItemDialogCtrl',
        controllerAs: 'dialog',
        templateUrl: 'category/views/item-dialog.tpl.html',
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: false,
        resolve: {
          category: function () {
            return category;
          },
          item: function () {
            if (!item) {
              // No item passed in, so this is a new item
              return null;
            }
            // This is an update so pass a copy of the item
            return angular.copy(item);
          },
          lastValue: function () {
            if (!item && vm.stats.items.length > 0) {
              return vm.stats.items[vm.stats.items.length - 1].valueNumber;
            }
            return 0;
          }
        }
      })
      .then(function () {
        if (vm.stats.best[0].$id !== priorBest &&
            vm.stats.items.length > 1) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Congrats, that is a new PR!')
              .position('top left')
              .hideDelay(3000)
              .theme('success-toast')
          );
        }
      }, function () {
        console.log('Item dialog cancelled');
      });
    };

    vm.delete = function (event, item) {
      var confirm = $mdDialog.confirm()
            .title('Delete this try?')
            .textContent('Are you sure you want to delete this try?')
            .ariaLabel('Confirm delete user item')
            .targetEvent(event)
            .ok('Delete It')
            .cancel('Keep It');

      $mdDialog.show(confirm).then(function () {
        Category.deleteItem(vm.category.$id, item.$id)
          .catch(function (err) {
            onError(err);
          });
      });
    };

    function refreshChartData() {
      var itemsCopy,
          chartSeries1 = [];

      // Sort the items array by date, descending
      itemsCopy = $filter('orderBy')(angular.copy(vm.stats.items), 'itemDateTime', true);

      angular.forEach(itemsCopy, function (item) {
        // Date fix for view
        var d = new Date(item.itemDateTime);
        // value.itemDateTime = d;

        // var yy = $filter('date')(value.itemDateTime, 'yyyy');
        // chartSeries1.push([Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()), value.valueNumber]);
        chartSeries1.push([$filter('date')(d, 'shortDate'), item.valueNumber]);
      });

      vm.chartConfig.series[0].data = chartSeries1.reverse();
    }

    function onError(err) {
      vm.errorMessage = err.message ? err.message : 'An unknown error has occurred';
    }

    function initChart() {
      var items = vm.stats.items,
          latestTry = items[items.length - 1].valueNumber,
          seriesName = vm.category.valueType === 'duration' ? 'Time in MM:SS' : 'Number completed',
          goalLabel = 'Goal: ' + (latestTry + 1),
          minY = null;

      if (vm.category.goalType === 'less') {
        minY = Math.round(vm.category.best[0].valueNumber * 0.95, 0);
      }

      if (vm.category.valueType === 'duration') {
        goalLabel = 'Goal: ' + secondsToHms(latestTry - 60);
      }

      vm.chartConfig = {
        options: {
          chart: {
            type: 'areaspline'
          },
          exporting: {enabled: false},
          tooltip: {
            pointFormatter: function () {
              if (vm.category.valueType === 'duration') {
                return this.series.name + ': <b>' + secondsToHms(this.y) + '</b>';
              }

              return this.series.name + ': <b>' + this.y + '</b>';
            }
          },
          yAxis: {
            min: minY,
            title: {text: null},
            plotLines: [{
              value: latestTry + 1,
              color: 'green',
              width: 2,
              zIndex: 3,
              label: {text: goalLabel},
              dashStyle: 'shortdash'
            }],
            labels: {
              formatter: function () {
                // Formats the y-axis labels for HH:MM:SS
                if (vm.category.valueType === 'duration') {
                  /* eslint angular/controller-as-vm: [0] */
                  return secondsToHms(this.value);
                }
                return this.value;
              }
            }
          }
        },
        series: [{
          name: seriesName,
          data: [],
          marker: {
            enabled: true
          },
          events: {
            legendItemClick: function () {
              return false;
            }
          }
        }],
        title: {
          text: vm.category.name
        },
        subtitle: {
          text: vm.category.description
        },
        xAxis: {
          tickmarkPlacement: 'on',
          type: 'category'
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

      chartInit = true;
    }

    function secondsToHms(d) {
      var h = Math.floor(Number(d) / 3600),
          m = Math.floor(Number(d) % 3600 / 60),
          s = Math.floor(Number(d) % 3600 % 60);
      return (h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s;
    }
  }
}());
