
// Google Maps init function
function init() {

	var options = {
		center : {lat: 47.495086, lng: 19.040006},
		zoom: 12
	};

	var map = new google.maps.Map(document.getElementById('map-panel'), options);
};

// add event listener --> initialise map after body has loaded
google.maps.event.addDomListener(window, 'load', init);