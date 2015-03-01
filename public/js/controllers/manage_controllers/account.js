angular.module('GpsKovetoApp')

.controller('AccountController', ['$scope', '$http', function($scope, $http) {

	$scope.userForm = {};

	$http.get('/get_user/' + $scope.user.username)
	.success(function(data) {
		$scope.userForm.fullname = data.fullname;
		$scope.userForm.email = data.email;
		$scope.userForm.username = data.username;
		$scope.userForm.phone_no = data.phone_no;

	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});

	$scope.passwordForm = {
		username: $scope.user.username,
		old: '',
		new: '',
		confirm: ''
	};

	$scope.message = '';
	$scope.alert = '';

	$scope.changePassword = function() {
		if(!$scope.passwordForm.old || !$scope.passwordForm.new || !$scope.passwordForm.confirm) {
			$scope.alert = 'Please fill in all the password fields';

		} else {

			if($scope.passwordForm.new == $scope.passwordForm.confirm) {
				$http.post('/change_password', $scope.passwordForm)
				.success(function(data) {
					$scope.message = data;
				}).error(function(data, status) {
					console.log(status);
					$scope.alert = data;
				});

			} else {
				$scope.message = 'The passwords provided do not match';
			};
		};
	};

	$scope.updateUser = function() {
		$http.post('/update_details/' + $scope.user.username, $scope.userForm)
		.success(function(data) {
			$scope.message = data;
		}).error(function(data, status) {
			console.log(status);
			$scope.alert = data;
		});
	};

}]);
