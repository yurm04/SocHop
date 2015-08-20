sochopApp.controller('AttendController', function($scope) {
  // $scope.events.test = 'HELLO';
  $scope.events = [{
    name: 'Test Name',
    description: 'This is a test Description',
    date: Date.now(),
    numAttending: 5
  }, {
    name: 'Test Name 2',
    description: 'This is a second test Description',
    date: Date.now(),
    numAttending: 7
  }];

  /****************************************************************
  Google Maps
  ****************************************************************/
  window.onload = init;

  // current location
  var latitude;
  var logitude;

  // Google map
  var map = null;

  // Path
  var path = [];

  var lastMarker = null;

  // Onload event handler
  function init() {
    var startButton = document.getElementById("startButton"); // query for check location button
    startButton.onclick = getCurrentLocation;  // register event handler
  }

  function getCurrentLocation() {
    // disable start button
    this.disabled = true;

    var options = {
      enableHighAccuracy : true,
      timeout : 50000,
      maximumAge : 0
    };
    
    /**
     * Gets current position of device
     * sets displayLocation callback function
     * handleError
     * function options
     */
    navigator.geolocation.getCurrentPosition(displayLocation, handleError, options);
    setInterval(updateMyLocation, 5000);
  }

  // Callback function for displaying the location on the google map
  function displayLocation(position) {
    latitude      = position.coords.latitude;
    longitude     = position.coords.longitude;

    document.getElementById("latitude").innerHTML = "Latitude: " + latitude;
    document.getElementById("longitude").innerHTML = "Longitude: " + longitude;

    if (firstGo === true) {
      showOnMap(position.coords);
      firstGo = false;
    }
  }

  // Sets error message based on error code
  function handleError(err) {
    switch(err.code) {
      case 1:
        updateStatus("The user denied permission");
          break;
      case 2:
        updateStatus("Position is unavailable");
          break;
      case 3:
        updateStatus("Timed out");
        break;
    }
  }

  //  Updates message for errors
  function updateStatus(message) {
    document.getElementById("status").innerHTML = "<strong>Error</strong>: " + message;
  }

  function showOnMap(position) {
    var googlePosition = new google.maps.LatLng(position.latitude, position.longitude);

    var mapOptions = {
      zoom: 15,
      center: googlePosition,
    };

    var mapElement = document.getElementById("map");
    map = new google.maps.Map(mapElement, mapOptions);

    // Add marker
    var title = "Location Details";
    var content = "Lat: " + position.latitude + " , Long: " + position.longitude;
    addMarker(map, googlePosition, title, content);

  }

  function addMarker(map, markerPosition, title, content) {
    var options = {
      position: markerPosition,
      map: map,
      title: title,
      clickable: true
    };
    var marker = new google.maps.Marker(options);

    var popupWindowOptions = {
      content: content,
      position: markerPosition
    };

    var popupWindow = new google.maps.InfoWindow(popupWindowOptions);

    google.maps.event.addListener(marker, 'click', function() {
      popupWindow.open(map);
    });

    return marker;
  }

  function updateMyLocation() {
    path = [];

    // first point
    var latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    latitude += Math.random() / 100;
    longitude -= Math.random() / 100;

    // next
    latlong = new google.maps.LatLng(latitude, longitude);
    path.push(latlong);

    var line = new google.maps.Polyline({
      path : path,
      strokeColor : '#0000ff',
      strokeOpacity : 1.0,
      strokeWeight : 3
    });
    line.setMap(map);

    map.panTo(latlong);

    if (lastMarker)
          lastMarker.setMap(null);
      // add the new marker
    lastMarker = addMarker(map, latlong, "Your new location", "You moved to: " + latitude + ", " + longitude);
    var position = {
      coords : {
        latitude : latitude,
        longitude : longitude
      }
    };
    displayLocation(position);
  }
});