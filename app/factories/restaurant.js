/*
This Factory is in charge of tracking user status via the **User** `getStatus` 
API call and expose it to controllers who require it. 
It acts as a simple caching layer between user status and controllers
Whenever one or more controller on the same page are in need to know 
the user status the API call would be effectively done only one time
*/
app.factory('restaurant', ['$http','$stamplay', function ($http, $stamplay) {
		
	return {

		getAll: function () {
			var restaurants = $stamplay.Cobject('restaurant').Collection
			return restaurants
		},
		get:function(){
			var restaurant = $stamplay.Cobject('restaurant').Model
			return restaurant
		}
	
	};
}])