//controller for the registration page
app.controller('RegistrationCtrl', ['$scope', '$state', 'userStatus', 'globalVariable', 'validator',
	function RegistrationCtrl($scope, $state, userStatus, globalVariable, validator) {

		//setting regexp for email field
		$scope.EMAIL = globalVariable.email

		//register function 
		$scope.register = function () {
			if ($scope.email && $scope.password) {
				var user = {
					email: $scope.email,
					password: $scope.password
				}

				var validate = {
						email: $scope.email
					}
					//first step verify email is not already used
				validator.validateEmail(validate)
					.success(function (data, status) {
						//second step register user         
						userStatus.registerUser(user)
							.success(function (data, status) {
								$state.go('home');
							})
							.error(function (data, status) {
								$scope.error = 'Registration Failed'
							})
					})
					.error(function (data, status) {
						$scope.error = 'Email Already Exist or invalid'
					})
			}
		}
}])