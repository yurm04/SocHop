sochopApp.controller('AttendController', function($scope, $window) {
  // $scope.events.test = 'HELLO';
  $scope.events = [{
    name: 'Test Name',
    description: 'This is a test Description',
    date: Date.now(),
    numAttending: 5,
    location: {
      name: 'A bar',
      latitude: 40.805,
      longitude: -73.94
    }
  }, {
    name: 'Test Name 2',
    description: 'This is a second test Description',
    date: Date.now(),
    numAttending: 7,
    location: {
      name: 'A restaurant',
      latitude: 40.81,
      longitude: -73.92
    }
  }];

  var currentLocation = {};

  var eventLocation = {};
  // $scope.$watch('eventLocation', displayLocation(eventLocation));

  $scope.selectEvent = function(index) {
    console.log("Event selected " + index);
    // var selected = $scope.events[index];
    // $scope.eventLocation = selected.location.coords;
  };

  // Google Map -------------------------------------------

  google.maps.event.addListenerOnce(map, 'idle', function(){
    console.log('map fully loaded');
  });

  // Map options
  var mapOptions = {

  };

  // current location of device
  var getCurrentLocation = function() {
    console.log('Getting current location');
    // navigator options
    var navigatorOptions = {
      enableHighAccuracy : true,
      timeout : 50000,
      maximumAge : 0
    };

    navigator.geolocation.getCurrentPosition(displayLocation, handleError, navigatorOptions);
  };

  // Error handler
  var handleError = function(err) {
    console.log('An error occured ' + err);
  };

  // display the passed location
  var displayLocation = function(position) {
    console.log(position);
    if (!$scope.map) {
      console.log('scope.map does not exist');
      showOnMap(position);
    }
  };

  var showOnMap = function (position) {
    console.log('showOnMap');
    var googlePosition = new google.maps.LatLng(position.latitude, position.longitude);

    var mapOptions = {
      zoom: 12,
      center: googlePosition
    };

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Add marker
    var title = "Around You";
    var content = "You are here!";

    addMarker($scope.map, googlePosition, title, content);
  };

  var createMarkers = function () {
    var markerOptions = {};
    angular.forEach($scope.events, function(currentEvent, index) {
      var googlePosition = google.maps.LatLng(currentEvent.location.latitude, currentEvent.location.longitude);
      markerOptions = {
        position: googlePosition,
        map: $scope.map,
        title: currentEvent.name,
        content: currentEvent.location.name
      };
    });
  };
  
  var addMarker = function (map, markerPosition, title, content) {
    console.log('addMarker');
    var markerOptions = {
      position: markerPosition,
      map: map,
      title: title,
      clickable: true
    };

    var marker = new google.maps.Marker(mapOptions);

    var popupOptions = {
      content: content,
      position: markerPosition
    };

    var popup = new google.maps.InfoWindow(popupOptions);

    google.maps.event.addListener(marker, 'click', function() {
      popup.open(map);
    });

    return marker;
  };


  getCurrentLocation();
  
});