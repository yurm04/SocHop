var sochopApp = angular.module('SocHopApp', ['ngRoute'])
  .config( function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/login.html'
      });
    $locationProvider.html5Mode(true);  // Is this necessary??
  });
  