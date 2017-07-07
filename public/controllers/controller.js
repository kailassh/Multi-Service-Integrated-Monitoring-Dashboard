var myApp = angular.module("myApp", ['ngRoute', 'ngAnimate']);

myApp.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'AppCtrl'
    })
    .when('/clients', {
      templateUrl: 'views/clients.html',
      controller: 'AppCtrl'
    })
    .when('/events', {
      templateUrl: 'views/events.html',
      controller: 'AppEvents'
    })
    .when('/details/:id', {
      templateUrl: 'views/details.html',
      controller: 'AppDetails'
    })
    .when('/eventDetails/:id', {
      templateUrl: 'views/eventDetails.html',
      controller: 'AppEventDetails'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

myApp.controller('AppCtrl',['$scope', '$http', '$location', '$window', '$interval', function($scope, $http, $location, $window, $interval){
  //$interval(function(){


    $scope.testing = function(){
      console.log("Hello");
    $http({
          method: 'GET',
          url: '/clients',
          data: $scope.lists
        })
        .then(function(response) {
          console.log(response.data);
          $scope.lists = response.data;
    });
  };
  $scope.testing();
  $interval(function(){
  $scope.testing();
}, 60000);


  $scope.showdata = function(id){
    console.log(id);
    $http({
          method: 'GET',
          url: '/clients/' + id,
          data: $scope.dt
        })
        .then(function(response) {
          $scope.dt = response.data;
          console.log($scope.dt);
          $window.my_value = $scope.dt;
          console.log($window.my_value);
          $location.path('/details/' + id);

    });
  };
}]);

myApp.controller('AppEvents',['$scope', '$http', '$window', '$location', '$interval', function($scope, $http, $window, $location, $interval){


  $scope.testing = function(){
    console.log("Hello");
    $http({
        method: 'GET',
        url: '/events',
        data: $scope.lists
      })
      .then(function(response) {
        console.log(response.data);
        $scope.lists = response.data;
  });
};
$scope.testing();
$interval(function(){
$scope.testing();
}, 60000);

  $scope.showEventsData = function(id){
    console.log(id);
    $http({
          method: 'GET',
          url: '/events/' + id,
          data: $scope.pt
        })
        .then(function(response) {
          console.log(response);
          $scope.pt = response.data;
          $window.val = $scope.pt;
          $location.path('/eventDetails/' + id);
    });
  };
}]);

myApp.controller('AppDetails',['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
  $scope.dt = $window.my_value;
  console.log($scope.dt);
}]);

myApp.controller('AppEventDetails',['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
  $scope.pt = $window.val;
  console.log($scope.pt);
}]);
