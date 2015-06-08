angular.module('odoru')
.controller('ProjectsCtrl', [
	'$scope',
	'$stateParams',
	'projects',
	'project',
	'wspaces',
	'socket',
	function($scope, $stateParams, projects, project, wspaces, socket) {
		$scope.project = project;

		$scope.wspace = wspaces.get($scope.project.wspace_id);
		console.log($scope.wspace);

		socket.changeProjectRoom(project.id);

		socket.getSocket().on('project-change', function(msg) {
			projects.getAsync(msg).then(function(data) {
				$scope.project = data;
			});
		});

		$scope.completeTask = function(task) {
			projects.completeTask(project.id, task).success(function() {
				projectChange();
			});
		};

		$scope.taskPriority = function(task) {
			projects.taskPriority(project.id, task).success(function() {
				if (task.priority >= 4) { task.priority = 0;};
				task.priority += 1;
				projectChange();
			});

		}

		$scope.addTask = function() {
			if (!$scope.taskBody || $scope.taskBody == "") { return; };
			projects.addTask(project.id, {
				body: $scope.taskBody,
				state: false,
				priority: 1,
			}).success(function(data) {
				$scope.project.tasks.push(data);
				projectChange();
			});

			$scope.taskBody = "";

		};

		var projectChange = function() {
			socket.emit('project-change', project.id);
		}

		$scope.$on('$destroy', function() {
			socket.changeProjectRoom(false);
		});
	}
]);