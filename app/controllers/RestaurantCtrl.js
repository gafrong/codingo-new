/*
This controller handles the restaurant list.
It listens for filter selection on the home page and update
the list accordingly. It has also expose sorting
functionalities to rank restaurant by Name, rating or price.
*/
app.controller('RestaurantCtrl', ['$scope','restaurant' ,'$http', 'globalVariable',
	function RestaurantCtrl($scope, restaurant, $http, globalVariable) {

		$scope.search = {}
		$scope.CUISINE_OPTIONS = globalVariable.cuisine

		//watch 'search' property for build url filtering
		$scope.$watch('search', function (search) {

			var restaurants = restaurant.getAll();

			if (search.price && search.price!=null) {
				restaurants.equalTo('price',search.price)
			}
			if (search.cusine && search.cusine!=null) {
				restaurants.equalTo('cusine',search.cusine)
			}
			if (search.rating && search.rating!=null) {
				restaurants.equalTo('actions.ratings.avg',search.rating)
			}
			//get the restaurant filtered
			restaurants.exec()
				.then(function(res){
					$scope.$apply(function(){
						$scope.restaurants = res.data;
						$scope.order = 'name'
					})
				}, function(err) {
					$scope.error = 'Ops Something went wrong'
				})

		}, true)

		//function for added class on active element for sorting restaurant in table
		$scope.orderIs = function (order) {
			return order === $scope.order;
		}
}])
