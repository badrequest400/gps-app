angular.module('GpsKovetoApp')

// address lookup function, async call
//NEEDS callback, scope needs to be updated in view --> $scope.$apply()

.service('geocode', function() {

	this.reverse_geocode = function(lat, lng, callback) {

		var geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lat, lng);

		geocoder.geocode({'latLng': latlng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					callback(results[0].formatted_address);
				}
			} else {
					callback("Geocoder failed due to: " + status);
			};
		});
	};
});
