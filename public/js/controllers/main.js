angular.module('GpsKovetoApp')

.controller('MainCtrl', ['$scope', '$route', '$routeParams', '$location', '$window',
	function($scope, $route, $routeParams, $location, $window) {
		this.$route = $route;
		this.$location = $location;
		this.$routeParams = $routeParams;

		$scope.user = {};
		$scope.user.username = $window.sessionStorage.userName;
		$scope.user.accessLevel = $window.sessionStorage.userAccessLevel;
		// $scope.user.pic = $window.sessionStorage.userPic;
}]);
