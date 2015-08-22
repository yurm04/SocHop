sochopApp.controller('CreateController', function($scope, $location, $filter, sochopService) {
  $scope.hours = ['1','2','3','4','5','6','7','8','9','10','11','12'];
  $scope.minutes = ['00', '15', '30', '45'];
  $scope.ampm = ['AM', 'PM'];
  $scope.date = '';

  // Event model
  $scope.newEvent = {
    name: '',
    description: '',
    startTime: '',
    location: {
      address1: '',
      address2:'',
      city: '',
      state: '',
      zipcode: '',
      coords: {
        lattitude: '',
        longitude: ''
      }
    }
  };

  $scope.selectedHour = $scope.hours[2];
  $scope.selectedMin = $scope.minutes[0];
  $scope.selectedAmPm = $scope.ampm[0];

  $scope.submit = function() {
    var formattedDate = $filter('date')(Date.now(), 'MM/yy');
    $scope.newEvent.startTime = formattedDate + ' ' + $scope.selectedHour + ' ' + $scope.selectedMin + ' ' + $scope.selectedAmPm;
    sochopService.createService($scope.newEvent);
    $location.path('/attend');
  };

});