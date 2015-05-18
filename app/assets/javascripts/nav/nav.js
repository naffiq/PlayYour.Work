angular.module('odoru')
.controller('NavCtrl', [
	'$scope',
	'projects',
	'Auth',
	function($scope, projects, Auth) {

		projects.getAll().then(function(projects) {
			$scope.projects = projects;
		});

		$scope.addProject = function() {
			if (!$scope.projectName || $scope.projectName == "") { return; };
			projects.create({
				title: $scope.projectName,
				priority: 1,
			}).then(function(projects) {
				$scope.projects = projects;
				$scope.projectName = "";
			});
		};

		$scope.changePriority = function(project) {
			projects.priority(project).then(function(pr) {
				project = pr;
			});
		};

		$scope.signedIn = Auth.isAuthenticated;
		$scope.logout = Auth.logout;

		Auth.currentUser().then(function(user) {
			$scope.user = user;
		});

		$scope.$on('devise:register', function(e, user) {
			$scope.user = user;
		});

		$scope.$on('devise:login', function(e, user) {
			$scope.user = user;
		});

		$scope.$on('devise:logout', function(e, user) {
			$scope.user = {};
		});
	}
]);