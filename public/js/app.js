var app = angular.module("Userapp", ['ngResource']);

app.factory('users', function ($resource){
    return $resource('/showusers');
});
app.factory('addUser', function ($resource){
    return $resource('/addUser');
});
app.factory('editUser', function ($resource){
    return $resource('/editUser');
});
app.factory('deleteUser',function($resource){
    return $resource('/deleteUser');
});

app.controller('controller', ['$scope','addUser','users','editUser','deleteUser',
    function($scope,addUser,users,editUser,deleteUser) {
        $scope.refresh=function(){
        $scope.users =users.query();
        }
        $scope.edit=function(user){
            $scope.firstname=user.firstname;
            $scope.lastname=user.lastname;
            $scope.email=user.email;
            $scope.id=user.id;
            $scope.statesubmit='disabled';
            $scope.message=null;
        }
        $scope.update=function(){
          editUser.query({"id":$scope.id,"firstname":$scope.firstname,"lastname":$scope.lastname,"email":$scope.email},
            function(data){
                console.log(data[0].error);
                if(data[0].error){
                $scope.message="Error on server contact administrator";
                }else{
                $scope.message="data updated successfully";
                }
            });
            $scope.firstname="";
            $scope.lastname="";
            $scope.email="";
            $scope.statesubmit="enabled"
            $scope.refresh();
        }
        $scope.delete=function(id){
            deleteUser.query({"id":id},function(data){
                console.log(data[0].error);
                if(data[0].error){
                $scope.message="Error on server contact administrator";
                }else{
                $scope.message="form submitted successfully"
                }
                $scope.refresh();
            });
        }
        $scope.addUser=function(){
            var firstname=$scope.firstname;
            var lastname=$scope.lastname;
            var email=$scope.email;
            
            addUser.query({"firstname":firstname,"lastname":lastname,"email":email},function(data){
                console.log(data[0].error);
                if(data[0].error){
                $scope.message="Error on server contact administrator";
                }else{
                $scope.message="form submitted successfully"
                }   
            });
            $scope.firstname="";
            $scope.lastname="";
            $scope.email="";
            $scope.refresh();
        }
    }
]);

