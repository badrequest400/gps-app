angular.module('GpsKovetoApp')

.controller('GPSController', ['$scope', '$http', function($scope, $http) {

    $scope.filter = {};
    $scope.table = {};

    $scope.search = function() {
        $http.post('/gps', {start: $scope.filter.from, end: $scope.filter.to, name: $scope.filter.name})
        .success(function(data, status) {
            $scope.table.reports = data;
        }).error(function(data, status) {
            //
        });
    };

}]);
