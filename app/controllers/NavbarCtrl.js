/*
This controller is the only one present in every view of this app since it's binded 
to the main navigation bar of the app.
It must be able to recognize user status showing `Login/Logout` button, 
and it is responsible of understanding the current page visited by the user 
to highlight it on the navigation bar (check `function RouteIs`).
*/
app.controller('NavbarCtrl', ['$scope', '$location', 'userStatus',
	function NavbarController($scope, $location, userStatus) {

		//method for setting active class in navbar
		$scope.routeIs = function (routeName) {
			var index = $location.absUrl().split("/").pop();
			return index === routeName;
		};

		//default value of user Status
		$scope.logged = false;

		//Call service 
		//if user was defined -> update $scope
		if (userStatus.getUser().hasOwnProperty('_id')) {
			var user = userStatus.getUser()
			$scope.logged = true;
			$scope.displayName = user.displayName;
			$scope.picture = user.profileImg;
			$scope._id = user._id;
		} else {
			//if user non defined, call getStatus api
			var httpCall = userStatus.getUserCall().then(function (data) {
				//if user is logged -> update $scope
				if (data.status == 200 && data.data.user) {
					$scope.logged = true;
					$scope.displayName = data.data.user.displayName;
					$scope.picture = data.data.user.profileImg;
					$scope._id = data.data.user._id;
					userStatus.setUser(data.data.user.displayName, data.data.user.profileImg, data.data.user._id, data.data.user.email, true)
				}
			})
		}
}])