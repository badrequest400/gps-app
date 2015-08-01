angular.module('GpsKovetoApp')

.controller('DistanceReportController', ['$scope', '$http', function($scope, $http) {

    $scope.filter = {};
    $scope.filter.grouping = 'none';
    $scope.table = {};

    $scope.search = function() {

        var url = '';
        if($scope.filter.grouping == 'none' || !$scope.filter.grouping) {
            url = '/reporting/distance?start=' + $scope.filter.from.toISOString() + '&end=' + $scope.filter.to.toISOString() + '&name=' + $scope.filter.name;
        } else {
            url = '/reporting/distance?start=' + $scope.filter.from.toISOString() + '&end=' + $scope.filter.to.toISOString() + '&name=' + $scope.filter.name + '&grouping=' + $scope.filter.grouping;
        }
        console.log(url)

        $http.get(url)
        .success(function(data, status) {
            $scope.table.reports = data;
            console.log(data)
        }).error(function(data, status) {

        });
    };

}]);
