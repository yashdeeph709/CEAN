var app = angular.module("Userapp", ['ngRoute','ngResource']);

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

app.factory('users', function ($resource){
    return $resource('/showusers');
});
app.factory('addUser', function ($resource){
    return $resource('/addUser');
});


app.controller('formctrl', ['$scope','addUser',
    function($scope,addUser) {
        $scope.addUser=function(){
            var firstname=$scope.firstname;
            var lastname=$scope.lastname;
            var email=$scope.email;
            console.log(firstname+lastname+email);
            addUser.query({"firstname":firstname,"lastname":lastname,"email":email},function(data){
                $scope.success=data;
            });
        }
    }
]);

app.controller('showctrl', ['$scope','users',
    function($scope,users) {
        $scope.users =users.query();
    }
]);