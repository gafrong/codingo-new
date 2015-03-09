app.config(
	['$stateProvider', '$urlRouterProvider',
	function ($stateProvider, $urlRouterProvider) {
			//
			// For any unmatched url, redirect to /state1
			// $urlRouterProvider.otherwise("/state1");
			//
			// Now set up the states
			$urlRouterProvider.otherwise('/');

			$stateProvider

			//////////
			// Home //
			//////////

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

			////////////
			// Login //
			//////////

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


			///////////////////
			// How it works //
			/////////////////

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

			///////////////////
			// Registration //
			/////////////////

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

			///////////////////
			// Menu         //
			/////////////////

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