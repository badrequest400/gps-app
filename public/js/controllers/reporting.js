angular.module('GpsKovetoApp')

.controller('ReportingController', ['$scope', function($scope) {

    $scope.selected = 'tracker_config';

    $scope.setSelected = function(value) {
        $scope.selected = value;
    };
}]);
