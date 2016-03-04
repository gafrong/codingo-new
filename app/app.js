var app = angular.module('codingo', [
	'ui.router', 
	'ngStamplay'
])
.run(function() {
	Stamplay.init("codingo");
})
.config(['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/',
			views: {
				'': {
					templateUrl: './app/home/home.html'
				},
				'header': {
					templateUrl: 'app/partials/header.html',
					controller: 'NavbarCtrl'
				},
				'footer': {
					templateUrl: 'app/partials/footer.html'
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
					templateUrl: 'app/partials/header.html',
					controller: 'NavbarCtrl'
				},
				'footer': {
					templateUrl: 'app/partials/footer.html'
				}
			}
		})
    .state('pricing', {
      url: '/pricing',     
      views: {
        '': {
          templateUrl: '/app/pricing/pricing.html'
        },
        'header': {
          templateUrl: '/app/partials/header.html',
          controller: 'NavbarCtrl'
        },
				'footer': {
					templateUrl: 'app/partials/footer.html'
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
					templateUrl: 'app/partials/header.html',
					controller: 'NavbarCtrl'
				},
				'footer': {
					templateUrl: 'app/partials/footer.html'
				}
			}
		})
		.state('registration', {
			url: '/registration',
			views: {
				'': {
					templateUrl: 'app/partials/registration.html',
					controller: 'RegistrationCtrl'
				},
				'header': {
					templateUrl: 'app/partials/header.html',
					controller: 'NavbarCtrl'
				},
				'footer': {
					templateUrl: 'app/partials/footer.html'
				}
			}
		})
}]);
