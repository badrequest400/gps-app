angular.module('GpsKovetoApp')

.controller('AuthController', ['$scope', '$location', '$http', '$window', 'AuthService',
    function($scope, $location, $http, $window, AuthService) {

    $scope.username = '';
    $scope.password = '';

    $scope.login = function() {

        $http.post('/login', {username: $scope.username, password: $scope.password})
        .success(function(data, status) {
            AuthService.loggedIn = true;
            $window.sessionStorage.token = data.token;
            $window.sessionStorage.userName = data.user.username;
            $window.sessionStorage.userAccessLevel = data.user.access_level;
            $scope.user.username = data.user.username;
            $scope.user.accessLevel = data.user.access_level;
            $location.path('/streams');
        }).error(function(data, status) {
            console.log(status);
            console.log(data);
        });
    };

    $scope.logout = function() {
        if(AuthService.loggedIn) {
            AuthService.loggedIn = false;
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.userName;
            $scope.user = {};
            $location.path('/');
        };
    };

}]);
