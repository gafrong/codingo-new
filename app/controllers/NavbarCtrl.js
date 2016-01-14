/*
This controller is the only one present in every view of this app since it's binded
to the main navigation bar of the app.
It must be able to recognize user status showing `Login/Logout` button,
and it is responsible of understanding the current page visited by the user
to highlight it on the navigation bar (check `function RouteIs`).
*/
app.controller('NavbarCtrl', ['$scope', '$location', 'userStatus',
	function NavbarController($scope, $location, userStatus) {

		$scope.logout = function(){
			userStatus.logout()
		}
		//method for setting active class in navbar
		$scope.routeIs = function (routeName) {
			var index = $location.absUrl().split("/").pop();
			return index === routeName;
		};

		if(userStatus.getUser().logged){
			$scope.logged = true;
		}else{
			//default value of user Status
			$scope.logged = false;
			//Call service
			var user = userStatus.getUserModel()
			//if user was defined -> update $scope
			user.currentUser()
				.then(function(res){
					var user = res.user;
					var logged = user._id;
					if(logged !== undefined){
							$scope.$apply(function(){
								$scope.logged = true;
								$scope.displayName = user.displayName;
								$scope.picture = user.profileImg;
								$scope._id = user._id;
							})
							userStatus.setUser(user.displayName, user.profileImg, user._id, user.email, true)
						}
					}, function(err){
						console.log(err);
					})
			}
		}
])
