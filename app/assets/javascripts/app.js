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
			});

		$urlRouterProvider.otherwise('home');
	}
]);