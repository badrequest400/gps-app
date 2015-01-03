
// Google Maps init function
function init() {

	var options = {
		center : {lat: 47.495086, lng: 19.040006},
		zoom: 12
	};

	// create map object and link it to DOM element
	var map = new google.maps.Map(document.getElementById('map-panel'), options);

	// create Places SearchBar on map
	placesSearchInit(map);

};

// add event listener --> initialise map after body has loaded
google.maps.event.addDomListener(window, 'load', init);