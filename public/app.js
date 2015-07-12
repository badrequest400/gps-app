var GpsKovetoApp = angular.module('GpsKovetoApp', ['ngRoute', 'ui.bootstrap', 'Auth', 'matchmedia-ng'])
.config(['$routeProvider', '$locationProvider', '$httpProvider',
	function($routeProvider, $locationProvider, $httpProvider) {

		$routeProvider
		.when('/login', {
			title: 'Login',
			templateUrl: 'html/login.html',
			controller: 'AuthController',
			controllerAs: 'loginvctrl',
			access: {requireLogin: false}
		})
		.when('/admin', {
			title: 'Admin',
			templateUrl: 'html/admin.html',
			controller: 'AdminController',
			controllerAs: 'adminvctrl',
			access: {requireLogin: true}
		})
		.when('/map', {
			title: 'Map',
			templateUrl: 'html/map.html',
			controller: 'MapController',
			controllerAs: 'mapvctrl',
			access: {requireLogin: true}
		})
		.when('/realtime', {
			title: 'RealTime',
			templateUrl: 'html/realtime.html',
			controller: 'RealTimeController',
			controllerAs: 'realtimevctrl',
			access: {requireLogin: true}
		})
		.when('/history', {
			title: 'RealTime',
			templateUrl: 'html/history.html',
			controller: 'HistoryController',
			controllerAs: 'historyvctrl',
			access: {requireLogin: true}
		})
		.when('/manage', {
			title: 'Manage',
			templateUrl: 'html/manage.html',
			controller: 'ManageController',
			controllerAs: 'managevctrl',
			access: {requireLogin: true}
		})
		.otherwise({
			redirectTo: '/map'
		});

		$locationProvider.html5Mode(true);
		$httpProvider.interceptors.push('TokenInterceptor');
}]);


GpsKovetoApp.run(['$window', '$location', '$rootScope', 'AuthService',
	function($window, $location, $rootScope, AuthService) {

	$rootScope.$on('$routeChangeStart', function(event, next, current) {

		//fix refresh-logout --> if token is present, but app initialises loggedIn var false, set it to true
		if ($window.sessionStorage.token && !AuthService.loggedIn) {
			AuthService.loggedIn = true;
			$rootScope.pageNav = true;
		}

		if (next.access.requireLogin && !AuthService.loggedIn) {
			$location.path('/login');
			$rootScope.pageNav = false;
		}
	});

}]);
