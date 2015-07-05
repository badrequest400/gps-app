angular.module('GpsKovetoApp')

.controller('UserManagementController', ['$scope', '$http', '$modal', function($scope, $http, $modal) {

	$scope.users = [];
	$scope.users[0] = $scope.sessionUser;
	$scope.roles;

	$http.get('/get_users?owner=' + $scope.sessionUser._id)
	.success(function(data) {
		data.forEach(function(user) {
			$scope.users.push(user);
		});
	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});

	$http.get('/get_roles')
	.success(function(data, status) {
		$scope.roles = data;
	}).error(function(data, status) {
		console.log(status);
		console.log(data);
	});

	$scope.openModifyModal = function(current_user) {
		var modalInstance = $modal.open({
			templateUrl: 'modify_user_modal.html',
			controller: 'ModifyUserModalController',
			scope: $scope,
			size: 'md',
			resolve: {
				users: function() {
					return $scope.users;
				},
				current_user: function() {
					return current_user;
				},
				roles: function() {
					return $scope.roles;
				}
			}
		});
	};
	$scope.openNewUserModal = function() {
		var modalInstance = $modal.open({
			templateUrl: 'modify_user_modal.html',
			controller: 'NewUserModalController',
			scope: $scope,
			size: 'md',
			resolve: {
				users: function() {
					return $scope.users;
				},
				roles: function() {
					return $scope.roles;
				}
			}
		});
	};

	// Listen for Model changes from modal child scopes
	$scope.$on('newUserAdded', function(event, data) {
		$scope.users.push(data);
	});
	$scope.$on('userDetailsUpdated', function(event, data) {
		for(var i=0; i<$scope.users.length; i++) {
			if($scope.users[i].id == data.id) {
				$scope.users[i] = data;
			};
		};
	});
}])

.controller('ModifyUserModalController', ['$scope', '$modalInstance', '$http', 'users', 'current_user', 'roles',
	function($scope, $modalInstance, $http, users, current_user, roles) {

	$scope.current_user = current_user;
	$scope.users = users;
	$scope.roles = roles;

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

			$http.post('/update_details/' + $scope.current_user._id, $scope.form)
			.success(function(data, status) {
				//Notify parent controller of model change
				$scope.$emit('userDetailsUpdated', $scope.form);
				$modalInstance.close();

			}).error(function(data, status) {
				//
			});

		} else {

			// IF PASSWORD PRESENT, UPDATE PASSWORD THEN UPDATE DETAILS
			if ($scope.form.password != $scope.form.passwordConfirm) {
				$scope.alert = 'Password and confirmation must match';
			} else {

				$http.post('/change_password_admin/' + $scope.current_user._id, {new: $scope.form.password})
				.success(function(data, status) {

					$http.post('/update_details/' + $scope.current_user._id, $scope.form)
					.success(function(data, status) {
						//Notify parent controller of model change
						$scope.$emit('userDetailsUpdated', $scope.form);
						$modalInstance.close();

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

	// Drop-down button
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

.controller('NewUserModalController', ['$scope', '$modalInstance', '$http', 'users', 'roles',
	function($scope, $modalInstance, $http, users, roles) {

	$scope.alert = '';
	$scope.message = '';

	$scope.users = users;
	$scope.roles = roles;

	$scope.form = {};
	$scope.form.role = 'Role';		//default
	$scope.form.status = 'Status';	//default
	$scope.form.owner = 'Owner';	//default
	$scope.form.username = '';
	$scope.form.max_trackers = '';
	$scope.form.expiryDate = '';
	$scope.form.handlingSteps = '';
	$scope.form.notes = '';
	$scope.form.password = undefined;
	$scope.form.passwordConfrim = undefined;

	$scope.ok = function() {

		$http.post('/create_user', $scope.form)
		.success(function(data, status) {
			// Notify parent scope of new user to update View
			$scope.$emit('newUserAdded', $scope.form);
			$modalInstance.close();

		}).error(function(data, status) {
			$scope.alert = data;
		});
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
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
}]);
