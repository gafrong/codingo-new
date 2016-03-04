var app = angular.module('codingo', [
	'ui.router', 
	'ngStamplay'
])
.run(function() {
	Stamplay.init("codingo");
})
.config(
	['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider

		.state('home', {
			url: '/',
			views: {
				'': {
					controller: 'RestaurantCtrl',
					templateUrl: './app/partials/home.html'
				},
				'header': {
					controller: 'NavbarCtrl',
					templateUrl: 'app/partials/header.html',
				}
			}
		})

		.state('login', {
			url: '/login',
			views: {
				'': {
					controller: 'LoginCtrl',
					templateUrl: 'app/partials/login.html'
				},
				'header': {
					controller: 'NavbarCtrl',
					templateUrl: 'app/partials/header.html',
				}
			}
		})

		.state('how-it-works', {
			url: '/how-it-works',
			views: {
				'': {
					templateUrl: 'app/partials/how-it-works.html'
				},
				'header': {
					controller: 'NavbarCtrl',
					templateUrl: 'app/partials/header.html',
				}
			}
		})

		.state('registration', {
			url: '/registration',
			views: {
				'': {
					controller: 'RegistrationCtrl',
					templateUrl: 'app/partials/registration.html'
				},
				'header': {
					controller: 'NavbarCtrl',
					templateUrl: 'app/partials/header.html',
				}
			}
		})

		.state('menu', {
			url: '/menu/:id',
			views: {
				'': {
					controller: 'MenuCtrl',
					templateUrl: 'app/partials/menu.html',
					resolve: {
						qId: function ($stateParams) {
							return $stateParams.id;
						}
					}
				},
				'header': {
					controller: 'NavbarCtrl',
					templateUrl: 'app/partials/header.html',
				}
			},

		});

}]);
