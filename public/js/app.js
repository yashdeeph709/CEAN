var app = angular.module("Userapp", ['ngRoute','ngResource','users']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/show.html',
            controller: 'showctrl'
        });
        
        $routeProvider.when('/form', {
            templateUrl: 'partials/form.html',
            controller: 'formctrl'
        });

    }
]);

var userserve=angular.module("users",[]);
userserve.factory('users', function ($resource){
    return $resource('/showusers');
});


app.controller('formctrl', ['$scope',
    function($scope) {
    }
]);

app.controller('showctrl', ['$scope','users',
    function($scope,users) {
        $scope.users =users.query();
    }
]);