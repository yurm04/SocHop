sochopApp.factory('sochopService', function ($http) {
  // Service that communicates with the backend and holes user data
  var apiUrl = 'http://127.0.0.1:3000/api/',
      apiSignUp = 'signup',
      apiLogin = 'login',
      apiEvents = 'events',
      apiCreate = 'create',

      _userId = '',
      _username = '',
      _password = '',
      _events,

      logInService = function(user) {
        _username = user.username;
        _username = res.username;
        _password = res.password;
        _events = getEvents();
      },

      createService = function(newEvent) {
        _events.push(newEvent);
      },

      isLoggedIn = function() {
        if ( _username === '' || _password === '' ) {
          return false;
        } else {
          return true;
        }
      },

      signUp = function(data) {
        var url = apiUrl + apiSignUp;

        var res = $http.post(url, data);
        _userId = res.userId;
        _username = res.username;
        _password = res.password;
        _events = res.events;

        return res;
      },

      logIn = function(data) {
        var url = apiUrl + apiLogin;

        var res = $http.post(url, data);
        _username = res.username;
        _password = res.password;
        _events = res.events;

        return res;
      },

      getEvents = function(callback) {
        console.log('getEvents');
        if ( !_events) {
          var url = apiUrl + apiEvents;
          $http.get(url)
            .success(function(data, status, headers, config) {
              _events = data;
              // console.log(_events);
              callback(_events);
            })
            .error(function(data, status, headers, config) {
              console.log('Could not get Events');
            });
          
        }

        return _events;
      },

      createEvent = function(newEvent) {
        var url = apiUrl + apiCreate;

        $http.post(url, newEvent);
      };

      return {
        isLoggedIn : isLoggedIn,
        signUp : signUp,
        logIn : logIn,
        getEvents : getEvents,
        createEvent : createEvent,
        createService : createService,
        logInService : logInService
      };

});