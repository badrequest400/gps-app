angular.module('GpsKovetoApp')

// ADMIN ROLE ONLY !!!!!!!!

.controller('LoginLogController', ['$scope', '$http', function($scope, $http) {

    $scope.logins;
    $scope.sortby = 'timestamp';
    $scope.reverse = true;

    $scope.order = function(sortby) {
      if($scope.sortby === sortby){
        if($scope.reverse){
          $scope.sortby = '';
        } else {
          $scope.reverse = !$scope.reverse;
        };
      } else {
        $scope.sortby = sortby;
        $scope.reverse = false;
      };
    };

    $http.get('/loginlog')
    .success(function(data, status) {
        $scope.logins = data;
    })
    .error(function(data, status) {
        console.log(status);
        console.log(data);
    });

}]);
