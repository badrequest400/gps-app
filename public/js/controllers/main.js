angular.module('GpsKovetoApp')

.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$window',
	function($scope, $route, $routeParams, $location, $window) {
		this.$route = $route;
		this.$location = $location;
		this.$routeParams = $routeParams;

		$scope.sessionUser = {};
		$scope.sessionUser.username = $window.sessionStorage.username;
		$scope.sessionUser.fullname = $window.sessionStorage.fullname;
		$scope.sessionUser.trackers = angular.fromJson($window.sessionStorage.trackers);
		$scope.sessionUser.owner = $window.sessionStorage.owner;
		$scope.sessionUser.role = $window.sessionStorage.role;
		$scope.sessionUser.privileges = angular.fromJson($window.sessionStorage.privileges);
		$scope.sessionUser.status = $window.sessionStorage.status;
		$scope.sessionUser.owned_users = angular.fromJson($window.sessionStorage.owned_users);
}]);
