angular.module('GpsKovetoApp')

.controller('UserManagementController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.users = [];
	$scope.users[0] = $scope.sessionUser;

	$http.get('/get_users?owner=' + $scope.sessionUser.username)
	.success(function(data) {
		data.forEach(function(user) {
			$scope.users.push(user);
		});
	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});

	$scope.openModifyModal = function(current_user) {
		var modalInstance = $modal.open({
			templateUrl: 'modify_user_modal.html',
			controller: 'ModifyUserModalController',
			size: 'md',
			resolve: {
				users: function() {
					return $scope.users;
				},
				current_user: function() {
					return current_user;
				}
			}
		});
	};
	$scope.openNewUserModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'modify_user_modal.html',
			controller: 'NewUserModalController',
			size: 'md'
		});
	};
}])

.controller('ModifyUserModalController', ['$scope', '$modalInstance', '$http', 'users', 'current_user',
	function($scope, $modalInstance, $http, users, current_user) {

	$scope.current_user = current_user;
	$scope.users = users;

	$scope.alert = '';
	$scope.message = '';

	$scope.form = {};
	if($scope.current_user.role) {
		$scope.form.role = $scope.current_user.role;
	} else {
		$scope.form.role = 'Role';
	};
	if($scope.current_user.status) {
		$scope.form.status = $scope.current_user.status;
	} else {
		$scope.form.status = 'User Status';
	};
	if($scope.current_user.owner) {
		$scope.form.owner = $scope.current_user.owner;
	} else {
		$scope.form.owner = 'Owner';
	};
	$scope.form.username = $scope.current_user.username;
	$scope.form.max_trackers = $scope.current_user.max_trackers;
	$scope.form.expiryDate = $scope.current_user.expiryDate;
	$scope.form.handlingSteps = $scope.current_user.handlingSteps;
	$scope.form.notes = $scope.current_user.notes;
	$scope.form.password = undefined;
	$scope.form.passwordConfrim = undefined;

	$scope.ok = function() {

		// IF PASSWORD FIELDS ARE EMPTY, JUST SUBMIT REST
		if(!$scope.form.password && !$scope.form.passwordConfrim) {

			$http.post('/update_details/' + $scope.current_user.username, $scope.form)
			.success(function(data, status) {
				$modalInstance.dismiss('ok');
			}).error(function(data, status) {
				//
			});

		} else {

			// IF PASSWORD PRESENT, UPDATE PASSWORD THEN UPDATE DETAILS
			if ($scope.form.password != $scope.form.passwordConfirm) {
				$scope.alert = 'Password and confirmation must match';
			} else {

				$http.post('/change_password_admin/' + $scope.current_user.username, {new: $scope.form.password})
				.success(function(data, status) {

					$http.post('/update_details/' + $scope.current_user.username, $scope.form)
					.success(function(data, status) {
						$modalInstance.dismiss('ok');
					}).error(function(data, status) {
						//
					});

				}).error(function(data, status) {
					$scope.alert = 'Could not change password, please try again';
				});
			};
		};
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$http.get('/get_roles')
	.success(function(data, status) {
		$scope.roles = data;
	}).error(function(data, status) {
		//
	});

	$scope.status = {
		isopen: false
	};
	$scope.toggleDropdown = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.status.isopen = !$scope.status.isopen;
	};
	$scope.setRole = function(val) {
		$scope.form.role = val;
	};
	$scope.setStatus = function(val) {
		$scope.form.status = val;
	};
	$scope.setOwner = function(val) {
		$scope.form.owner = val;
	};
}])

.controller('NewUserModalController', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.ok = function() {
		// SUBMIT
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
