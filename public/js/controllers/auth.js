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
            $window.sessionStorage.username = data.user.username;
            $window.sessionStorage.fullname = data.user.fullname;
            $window.sessionStorage.trackers = angular.toJson(data.user.trackers);
            $window.sessionStorage.owner = data.user.owner;
            $window.sessionStorage.role = data.user.role;
            $window.sessionStorage.privileges = angular.toJson(data.user.privileges);
            $window.sessionStorage.status = data.user.status;
            $window.sessionStorage.owned_users = angular.toJson(data.user.owned_users);

            $scope.sessionUser.username = $window.sessionStorage.username;
            $scope.sessionUser.fullname = $window.sessionStorage.fullname;
            $scope.sessionUser.trackers = angular.fromJson($window.sessionStorage.trackers);
            $scope.sessionUser.owner = $window.sessionStorage.owner;
            $scope.sessionUser.role = $window.sessionStorage.role;
            $scope.sessionUser.privileges = angular.fromJson($window.sessionStorage.privileges);
            $scope.sessionUser.status = $window.sessionStorage.status;
            $scope.sessionUser.owned_users = angular.fromJson($window.sessionStorage.owned_users);

            $location.path('/map');
        }).error(function(data, status) {
            console.log(status);
            console.log(data);
        });
    };

    $scope.logout = function() {
        if(AuthService.loggedIn) {
            AuthService.loggedIn = false;
            delete $window.sessionStorage.token;
            delete $window.sessionStorage.username;
            delete $window.sessionStorage.fullname;
            delete $window.sessionStorage.trackers;
            delete $window.sessionStorage.owner;
            delete $window.sessionStorage.role;
            delete $window.sessionStorage.privileges;
            delete $window.sessionStorage.status;
            delete $window.sessionStorage.owned_users;
            $location.path('/');
        };
    };

}]);
