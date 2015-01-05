var GpsKovetoApp = angular.module('GpsKovetoApp', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {

		$routeProvider
			.when('/admin', {
		title: 'Admin',
		templateUrl: 'html/admin.html',
		controller: 'AdminController',
		controllerAs: 'adminvctrl',
		// access: {requireLogin: false}
		    });

		$locationProvider.html5Mode(true);
}]);


GpsKovetoApp.run(['$window', '$location', '$rootScope', function($window, $location, $rootScope) {


}]);
