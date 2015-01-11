angular.module('GpsKovetoApp')

.service('map', function() {

	// GoogleMaps initializer function.
	// Needs $scope as an argument from  caller Angular controller so Map reference can be attached to controller scope.

	this.map_init = function($scope) {

		var options = {
			zoom : 12,
			center : {lat: 47.495086, lng: 19.040006}, // TODO change to dynamic (language, last pos etc.)
		};

		// create map object and link it to DOM element
		$scope.map =  new google.maps.Map(document.getElementById('map-panel'), options);

		// create Places SearchBar on map
		var markers = [];

		// create the searchbox and link it to DOM, set placement on map panel
		var input = document.getElementById('places-input');
		$scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

		var searchBox = new google.maps.places.SearchBox((input));

		// new search event
		google.maps.event.addListener(searchBox, 'places_changed', function() {
			var places = searchBox.getPlaces();

			// no search results
			if (places.length == 0) return;

			//unset all previous marker on new search
			for (var i=0, marker; marker = markers[i]; i++) {
				marker.setMap(null);
			};

			// loop through resulting places and get icon, name, location
			markers = [];
			var bounds = new google.maps.LatLngBounds();
			for (var i=0, place; place = places[i]; i++) {
				var img = {
					url: place.icon,
					size: new google.maps.Size(71, 71),
					origin: new google.maps.Point(0, 0),
					anchor : new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(25, 25)
				};

				// create marker for each hit
				var marker = new google.maps.Marker({
					map: $scope.map,
					icon: img,
					title: place.name,
					position: place.geometry.location
				});

				markers.push(marker);
				bounds.extend(place.geometry.location);
			};

			// set map viewport to search result bounds
			$scope.map.fitBounds(bounds);

			// Bias the SearchBox results towards places that are within the bounds of the
			// current map's viewport.
			google.maps.event.addListener($scope.map, 'bounds_changed', function() {
				var bounds = $scope.map.getBounds();
				searchBox.setBounds(bounds);
			});
		});
	};
});
