angular.module('GpsKovetoApp')

.controller('MapController', ['$scope', 'map', function($scope, map) {

	$scope.map_init = map.map_init($scope);

}]);
