sochopApp.controller('AttendController', function($scope, $window) {
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

  var eventLocation = {};
  $scope.$watch('eventLocation', displayLocation(eventLocation));

  function selectEvent(index) {
    var selected = $scope.events[index];
    $scope.eventLocation = selected.location.coords;
  }

  /****************************************************************
  Google Maps
  ****************************************************************/
  window.onload = init;
  console.log('before');
  var lattitude, longitude, map;
console.log('after');
  var options = {
        enableHighAccuracy : true,
        timeout : 50000,
        maximumAge : 0
      };

  function init() {
    // getCurrentLocation();
    var options = {
                enableHighAccuracy : true,
                timeout : 50000,
                maximumAge : 0
              };
              
              function displayLocation(position) {
                console.log('discplay location coords 1 ' + position);
              }

              function handleError(err) {
                console.log(err);
              }

              /**
               * Gets current position of device
               * sets displayLocation callback function
               * handleError
               * function options
               */
              navigator.geolocation.getCurrentPosition(displayLocation, handleError, options);
  }

  function getCurrentLocation() {
    // Navigator options
    var options = {
      enableHighAccuracy : true,
      timeout : 50000,
      maximumAge : 0
    };
    navigator.geolocation.getCurrentPosition(displayLocation, handleError, options);
  }

  // Show position
  function displayLocation(position) {
    // console.log('hello');
    console.log('display location coords 2' + position.coords);
    // console.log(position.coords);
    // latitude      = position.coords.latitude;
    // longitude     = position.coords.longitude;

    // showOnMap();
  }

  function handleError(err) {
    console.log(err);

    // switch(err.code) {
    //   case 1:
    //     updateStatus("The user denied permission");
    //       break;
    //   case 2:
    //     updateStatus("Position is unavailable");
    //       break;
    //   case 3:
    //     updateStatus("Timed out");
    //     break;
    // }
  }

  // Show on map the position pass
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
    addMarker(map, googlePosition, 'Current Position', 'You Are Here');
  }

  // Add marker to map
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

  
});