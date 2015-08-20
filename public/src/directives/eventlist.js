sochopApp.directive('eventlist', function() {
  return {
    restrict: 'A',
    replace: false,
    templateUrl: '/src/partials/eventlist.html',
    scope: {
      events: "@eventsInfo"
    },
  };
});