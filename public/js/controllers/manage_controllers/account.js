angular.module('GpsKovetoApp')

.controller('AccountController', ['$scope', '$http', function($scope, $http) {

	$scope.userForm = {};

	$http.get('/get_user/' + $scope.sessionUser._id)
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
		username: $scope.sessionUser.username,
		old: '',
		new: '',
		confirm: ''
	};

	$scope.passwordMessage = '';
	$scope.userMessage = '';
	$scope.passwordAlert = '';
	$scope.userAlert = '';

	$scope.changePassword = function() {
		if(!$scope.passwordForm.old || !$scope.passwordForm.new || !$scope.passwordForm.confirm) {
			$scope.passwordAlert = 'Please fill in all the password fields';

		} else {

			if($scope.passwordForm.new == $scope.passwordForm.confirm) {
				$http.post('/change_password/' + $scope.sessionUser._id, $scope.passwordForm)
				.success(function(data) {
					$scope.passwordMessage = data;
				}).error(function(data, status) {
					console.log(status);
					$scope.passwordAlert = data;
				});

			} else {
				$scope.passwordMessage = 'The passwords provided do not match';
			};
		};
	};

	$scope.updateUser = function() {
		$http.post('/update_details/' + $scope.sessionUser._id, $scope.userForm)
		.success(function(data) {
			$scope.userMessage = data;
		}).error(function(data, status) {
			console.log(status);
			$scope.userAlert = data;
		});
	};

}]);
