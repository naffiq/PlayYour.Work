angular.module('odoru')
.controller('NavCtrl', [
	'$scope',
	'projects',
	'wspaces',
	'Auth',
	function($scope, projects, wspaces, Auth) {
		$scope.submenu = '';
		$scope.anchor = 'right';

		$scope.selectWspace = function(id) {
			wspaces.get(id).then(function(wspace) {
				$scope.curWspace = wspace;
				$scope.projects = wspace.projects;
				wspaces.getAll().then(function(wspaces) {
					$scope.wspaces = wspaces;
				});
				
			});
		}

		init = function(user) {
			$scope.user = user;
			$scope.projects = {};

			$scope.showMenu = function() {
				if ($scope.submenu != 'submenu-show') {
					$scope.submenu = 'submenu-show';
					$scope.anchor = 'left';
				} else {
					$scope.submenu = 'submenu-hide';
					$scope.anchor = 'right';
				}
			}

			$scope.selectWspace($scope.user.wspace_id);

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

			$scope.switchWspace = function(wspace) {

			};
			$scope.addWspace = function() {
				if (!$scope.wspaceName || $scope.wspaceName == "") { return; };
				wspaces.create({
					title: $scope.wspaceName,
					user_id: $scope.user.id
				}).then(function(wspace) {
					$scope.wspaces.push(wspace);
					$scope.wspaceName = "";
				});
			}
		}

		$scope.signedIn = Auth.isAuthenticated;
		$scope.logout = Auth.logout;

		Auth.currentUser().then(function(user) {
			init(user);
 		});

		$scope.$on('devise:register', function(e, user) {
			$scope.user = user;
			init(user);
		});

		$scope.$on('devise:login', function(e, user) {
			$scope.user = user;
			init(user);
		});

		$scope.$on('devise:logout', function(e, user) {
			$scope.user = {};
		});
	}
]);