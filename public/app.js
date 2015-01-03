var GpsKovetoApp = angular.module('GpsKovetoApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {

	  $routeProvider
	    .when('/login', {
	title: 'Login',
	templateUrl: 'html/login.html',
	controller: 'LoginController',
	controllerAs: 'loginvctrl',
	access: {requireLogin: false}
	    });

	$locationProvider.html5Mode(true);
}]);


GpsKovetoApp.run(['$window', '$location', '$rootScope', function($window, $location, $rootScope) {


}]);