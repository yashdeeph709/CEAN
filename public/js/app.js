var app = angular.module("Userapp", ['ngResource']);

app.factory('users', function ($resource){
    return $resource('/showusers');
});
app.factory('addUser', function ($resource){
    return $resource('/addUser');
});


app.controller('controller', ['$scope','addUser','users',
    function($scope,addUser,users) {
        $scope.refresh=function(){
        $scope.users =users.query();
        }
        $scope.addUser=function(){
            var firstname=$scope.firstname;
            var lastname=$scope.lastname;
            var email=$scope.email;
            
            addUser.query({"firstname":firstname,"lastname":lastname,"email":email},function(data){
                $scope.success=data;
            });
            $scope.refresh();
        }
    }
]);

