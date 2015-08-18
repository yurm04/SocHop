sochopApp.controller('LoginController', function ($scope) {
  // initialize user object with empty values
  $scope.user = {
    username : '',
    password : ''
  };

  // Validation -------------
  $scope.validate = function() {
    var valid = true;

    if ( !validateUser() ) {
      valid = false;
      // Is this how you add class to element?
      angular.element("#inputEmail").addClass('has-warning');
    }

    if ( !validatePassword() ) {
      valid = false;
      angular.element("#inputPassword").addClass('has-warning');
    }

    if ( valid ) {
      console.log('Send to API');
      // send to API using service
    }
  };

  // username validation
  function validateUser() {
    var username = $scope.user.username;

    if ( username === '' || username === 0 || !sanitizeInput(username) ) {
      console.log('invalid username');
      return false;   // Need to add incorrect bootstrap class
    } else {
      return true;
    }
  }

  // password validation
  function validatePassword() {
    var password = $scope.user.password;

    if ( password === '' || password === 0 || !sanitizeInput(password) ) {
      console.log('invalid password');
      return false;
    } else {
      return true;
    }
  }

  // sanitize inputs before sending to server
  function sanitizeInput(val) {
    return true;
  }
});