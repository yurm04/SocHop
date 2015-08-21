sochopApp.controller('CreateController', function($scope) {
  // Event model
  $scope.event = {
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

  $scope.submit = function() {
    
  };
});