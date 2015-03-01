angular.module('GpsKovetoApp')

.controller('ManageController', ['$scope', function($scope) {

	$scope.selected = 'tracker_config';

	$scope.setSelected = function(value) {
		$scope.selected = value;
	};

}]);
