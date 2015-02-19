
angular.module('Auth', [])

.factory('AuthService', function() {
	var auth = {
		loggedIn: false
	}

	return auth;
})

.factory('TokenInterceptor', function($q, $window, $location, AuthService) {
	return {
		request: function(config) {
			config.headers = config.headers || {};
			if($window.sessionStorage.token) {
				config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
			}

			return config;
		},

		requestError: function(rejection) {
			return $q.reject(rejection);
		},

		response: function(response) {
			if (response != null && response.status == 200  && $window.sessionStorage.token && !AuthService.loggedIn) {
				AuthService.loggedIn = true;
			}

			return response;
		},

		responseError: function(rejection) {
			if(rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthService.loggedIn)) {
				delete $window.sessionStorage.token;
				AuthService.loggedIn = false;
				$location.path('/login');
			}

			return $q.reject(rejection);
		}
	};
});
