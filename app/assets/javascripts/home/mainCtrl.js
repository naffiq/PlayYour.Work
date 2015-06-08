angular.module('odoru')
.controller('MainCtrl', [
	'$scope',
	'$state',
	'Auth',
	// 'projects',
	function($scope, $state, Auth) {
		Auth.currentUser().then(function(user) {
			$scope.user = user;
 		});
 		$scope.md5 = md5;
		if (!Auth.isAuthenticated) { $state.$load('login'); };
	}
]);