angular.module('GpsKovetoApp')

.controller('LastPositionController', ['$scope', '$http', function($scope, $http) {

    $scope.filter = {};
    $scope.table = {};

    $scope.search = function() {

        $http.get('/latest?name=' + $scope.filter.name)
        .success(function(data, status) {
            $scope.table.reports = [data];
        }).error(function(data, status) {
            //
        });
    };

}]);
