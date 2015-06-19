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
			user.currentUser().then(function(){
				if(user.isLogged()){
						$scope.$apply(function(){
							$scope.logged = true;
							$scope.displayName = user.instance.displayName;
							$scope.picture = user.instance.profileImg;
							$scope._id = user.instance._id;
						})
						userStatus.setUser(user.instance.displayName, user.instance.profileImg, user.instance._id, user.instance.email, true)
					}
				}, function(){})
			}
		}
])