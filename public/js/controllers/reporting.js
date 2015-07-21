angular.module('GpsKovetoApp')

.controller('ReportingController', ['$scope', '$http', function($scope, $http) {

    $scope.selected = 'tracker_config';

    $scope.setSelected = function(value) {
        $scope.selected = value;
    };
}]);
