angular.module('odoru')
.controller('ProjectsCtrl', [
	'$scope',
	'$stateParams',
	'projects',
	'project',
	function($scope, $stateParams, projects, project) {
		$scope.project = project;
		$scope.completeTask = function(task) {
			projects.completeTask(project.id, task).success(function() {});
		};

		$scope.taskPriority = function(task) {
			projects.taskPriority(project.id, task).success(function() {
				if (task.priority >= 4) { task.priority = 0;};
				task.priority += 1;
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
			});

			$scope.taskBody = "";
		};
	}
]);