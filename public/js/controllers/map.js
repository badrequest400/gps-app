angular.module('GpsKovetoApp')

.controller('MapController', ['$scope', function($scope) {

	$scope.init = map_init($scope);

}]);
