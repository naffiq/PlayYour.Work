angular.module('odoru')
.controller('WspacesCtrl', [
	'$scope',
	'$rootScope',
	'Auth',
	'wspaces',
	'wspace',
	'socket',
	function($scope, $rootScope, Auth, wspaces, wspace, socket) {
		$scope.wspace = wspace;

		$scope.md5 = md5;

		Auth.currentUser().then(function(user) {
			$scope.user = user;
 		});

		$scope.inviteUser = function() {
			wspaces.inviteUser($scope.wspace, $scope.userEmail).then(
				function(data) {
					wspaces.get($scope.wspace.id).then(function(data) {
						$scope.wspace = data;

						if ($scope.user.wspace_id == $scope.wspace.user_id) {
							$rootScope.$broadcast('curWspaceUpdated', {user: $scope.user});
						};
						socket.emit('wspace-changed', $scope.wspace.id);
					});
				}
			)
		};


	}
]);