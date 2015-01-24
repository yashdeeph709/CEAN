angular.module('showmod', []).
   controller('showctrl', ['$scope', function ($scope) {
  	$scope.users = {
  		'1':{
  			code:'1',
  			fname:'yashdeep',
  			lname:'hinge',
  			email:'yashdeeph709@gmail.com'
  		},
  		'2':{
  			code:'2',
  			fname:'yamini',
  			lname:'sarode',
  			email:'yams.sarode@gmail.com'
  		}
  	};

  }]);