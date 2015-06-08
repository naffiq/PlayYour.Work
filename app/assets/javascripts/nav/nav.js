angular.module('odoru')
.controller('NavCtrl', [
	'$scope',
	'$rootScope',
	'projects',
	'wspaces',
	'Auth',
	'socket',
	function($scope, $rootScope, projects, wspaces, Auth, socket) {
		$scope.submenu = '';
		$scope.anchor = 'right';

		$scope.md5 = md5;

		

		init = function(user) {
			$scope.user = user;
			$scope.projects = {};
			$scope.curWspace = {};

			var mySocket = socket.getSocket();
			mySocket.on('wspace-change', function(msg) {
				$scope.selectWspace(msg);
			});

			$scope.selectWspace = function(id) {
				socket.changeWspaceRoom(id);

				wspaces.get(id).then(function(wspace) {
					$scope.curWspace = wspace;
					$scope.projects = wspace.projects;
					wspaces.getAll().then(function(wspaces) {
						$scope.wspaces = wspaces;
					});
					
				});
			}

			$scope.showMenu = function() {
				if ($scope.submenu != 'submenu-show') {
					$scope.submenu = 'submenu-show';
					$scope.anchor = 'left';
				} else {
					$scope.submenu = 'submenu-hide';
					$scope.anchor = 'right';
				}
			}

			$scope.changeWspace = function(id) {
				$scope.showMenu();
				$scope.selectWspace(id);
			}

			$scope.selectWspace($scope.user.wspace_id);

			$scope.addProject = function() {
				if (!$scope.projectName || $scope.projectName == "") { return; };
				projects.create($scope.curWspace.id, {
					title: $scope.projectName,
					priority: 1,
				}).then(function(project) {
					$scope.projects.push(project);
					$scope.projectName = "";
					socket.emit('wspace-change', $scope.curWspace.id);
				});
			};

			$scope.changePriority = function(project) {
				projects.priority(project).then(function(pr) {
					socket.emit('wspace-change', $scope.curWspace.id);
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

 		$rootScope.$on('curWspaceUpdated', function(evt, args) {
 			console.log('curWspaceUpdated');
 			init(args.user);
 		})

		$scope.$on('devise:new-registration', function(e, user) {
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