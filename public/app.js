var GpsKovetoApp = angular.module('GpsKovetoApp', ['ngRoute', 'ui.bootstrap'])
.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {

		$routeProvider
		.when('/admin', {
			title: 'Admin',
			templateUrl: 'html/admin.html',
			controller: 'AdminController',
			controllerAs: 'adminvctrl'
			// access: {requireLogin: false}
		})
		.when('/map', {
			title: 'Map',
			templateUrl: 'html/map.html',
			controller: 'MapController',
			controllerAs: 'mapvctrl'
		})
		.when('/realtime', {
			title: 'RealTime',
			templateUrl: 'html/realtime.html',
			controller: 'RealTimeController',
			controllerAs: 'realtimevctrl'
		})
		.when('/history', {
			title: 'RealTime',
			templateUrl: 'html/history.html',
			controller: 'HistoryController',
			controllerAs: 'historyvctrl'
		})
		.otherwise({
			redirectTo: '/'
		});

		$locationProvider.html5Mode(true);
}]);


GpsKovetoApp.run(['$window', '$location', '$rootScope', function($window, $location, $rootScope) {

}]);
