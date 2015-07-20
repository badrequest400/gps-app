angular.module('GpsKovetoApp')

.controller('ReportingController', ['$scope', function($scope) {

    $scope.selected = 'tracker_config';
    $scope.filter = {};

    $scope.setSelected = function(value) {
        $scope.selected = value;
    };

    console.log($scope.filter.from)
    console.log($scope.filter.to)
}]);
