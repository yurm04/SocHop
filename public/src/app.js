var sochopApp = angular.module('SocHopApp', ['ngRoute'])
  .config( function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'views/login.html'
      })
      .when('/attend', {
        controller: 'AttendController',
        templateUrl: 'views/attend.html'
      })
      .when('/create', {
        controller: 'CreateController',
        templateUrl: 'views/create.html'
      });
    $locationProvider.html5Mode(true);  // Is this necessary??
  });
  