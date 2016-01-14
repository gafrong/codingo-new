/*
This Factory is in charge of tracking user status via the **User** `getStatus`
API call and expose it to controllers who require it.
It acts as a simple caching layer between user status and controllers
Whenever one or more controller on the same page are in need to know
the user status the API call would be effectively done only one time
*/
app.factory('userStatus', ['$http','$stamplay',function ($http, $stamplay) {

	var user = {};

	return {
		loginUser: function (data) {
			return Stamplay.User.login(data);
		},
		registerUser: function (data) {
			return Stamplay.User.signup(data);
		},
		logout: function(){
			return Stamplay.User.logout()
		},
		//simple call to get userStatus
		getUserModel: function () {
			return Stamplay.User;
		},
		// Getter and Setter method
		getUser: function () {
			return user
		},
		setUser: function (displayName, picture, _id, email, logged) {
			user = {
				displayName: displayName,
				picture: picture,
				_id: _id,
				email: email,
				logged: logged
			}
		}
	};
}])
