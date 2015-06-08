angular.module('odoru', ['ui.router', 'templates', 'Devise'])
.config([
	'$stateProvider',
	'$urlRouterProvider',
	// 'Auth',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: 'home/_home.html',
				controller: 'MainCtrl',
			})
			.state('projects', {
				url: '/projects/{id}',
				templateUrl: 'projects/_projects.html',
				controller: 'ProjectsCtrl',
				resolve: {
					project: ['$stateParams', 'projects', function($stateParams, projects) {
						return projects.get($stateParams.id);
					}]
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: 'auth/_login.html',
				controller: 'AuthCtrl'
			})
			.state('register', {
				url: '/register',
				templateUrl: 'auth/_register.html',
				controller: 'AuthCtrl'
			})
			.state('wspaces', {
				url: '/wspaces/{id}',
				templateUrl: 'wspaces/_wspaces.html',
				controller: 'WspacesCtrl',
				resolve: {
					wspace: ['$stateParams', 'wspaces', function($stateParams, wspaces) {
						return wspaces.get($stateParams.id)
					}]
				}
			});

		$urlRouterProvider.otherwise('home');
	}
]);