angular.module('odoru')
.factory('projects', [
	'$http',
	'$q',
	function($http, $q) {
		var o = {
			projects: {}
		};
		o.getAll = function(wspace_id) {
			deferred = $q.defer();
			$http.get('/wspaces/'+wspace_id+'/projects.json').success(function(data) {
				deferred.resolve(data);
				o.projects = data;
			});

			return deferred.promise;
		};

		o.create = function(project) {
			deferred = $q.defer();
			$http.post('/projects.json', project).success(function(data) {
				o.projects.push(data);
				deferred.resolve(o.projects);
			});
			return deferred.promise;
		};

		o.priority = function(project) {
			deferred = $q.defer();
			$http.put('/projects/' + project.id + '/priority.json')
				.success(function(data) {
					if (project.priority >= 4) { project.priority = 0;};
					project.priority += 1;
					deferred.resolve(data);
				});
			return deferred.promise;
		};

		o.get = function(id) {
			return $http.get('/projects/' + id + '.json').then(function(res) {
				return res.data;
			});
		};

		o.addTask = function(id, task) {
			return $http.post('/projects/' + id + '/tasks.json', task);
		};

		o.completeTask = function(id, task) {
			return $http.put('/projects/' + id + '/tasks/' + task.id + '/complete.json');
		};

		o.taskPriority = function(id, task) {
			return $http.put('/projects/' + id + '/tasks/' + task.id + '/priority.json');
		};

		return o;
	}
]);