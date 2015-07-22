angular.module('GpsKovetoApp')

.controller('ReportingController', ['$scope', '$http', function($scope, $http) {

    $scope.selected = 'gps_report';

    $scope.setSelected = function(value) {
        $scope.selected = value;
    };
}]);
