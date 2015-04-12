angular.module('GpsKovetoApp')

// ADMIN ROLE ONLY !!!!!!!!

.controller('LoginLogController', ['$scope', '$http', function($scope, $http) {

    $scope.logins;

    $http.get('/loginlog')
    .success(function(data, status) {
        $scope.logins = data;
    }).error(function(data, status) {
        console.log(status);
        console.log(data);
    });

}]);
