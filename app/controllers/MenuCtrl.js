//controller for menu and order
app.controller('MenuCtrl', ['$scope', '$http','$stamplay' ,'userStatus','restaurant', 'globalVariable', 'qId',
	function MenuCtrl($scope, $http, $stamplay, userStatus, restaurant, globalVariable, paramValue) {

		//Call service
		//if user was defined -> update $scope
		var user = userStatus.getUserModel()
		user.currentUser()
			.then(function(res){
				var user = res.user;
				var logged = user._id;
				if(logged !== undefined){
						$scope.user = {};
						$scope.user.logged = true;
						$scope.user.displayName = user.displayName;
						$scope.user.picture = user.profileImg;
						$scope.user._id = user._id;
						userStatus.setUser(user.displayName, user.profileImg, user._id, user.email, true)
						getRestaurant(paramValue, false)
				}else{
						getRestaurant(paramValue, true)
				}
			}, function(){
				getRestaurant(paramValue, true)
			})
		//function for get Restaurant by id

		function getRestaurant(paramValue, notlogged) {
			var model = restaurant.get();
			model.get({"_id" : paramValue})
				.then(function(model){
					$scope.$apply(function(){
						$scope.restaurant = model.data[0];
						var meal_ids = model.data[0].meals;
						var meals = [];
						for(var i = 0; i < meal_ids.length; i += 1) {
							Stamplay.Object("meal")
								.get({ _id : meal_ids[i] })
									.then(function(res) {
										meals.push(res.data[0]);
											$scope.$apply();
									})
						}


						$scope.restaurant.menuItems = meals;
						var find = true;
						if (!notlogged) {
							for (var i = 0; i < $scope.restaurant.actions.ratings.users.length && find; i++) {
								if ($scope.restaurant.actions.ratings.users[i].userId == $scope.user._id) {
									$scope.yourvote = $scope.restaurant.actions.ratings.users[i].rating
									$scope.voted = true;
									find = false;
								}
							}
						}
					})
				},function(){
					$scope.error = 'Ops something went wrong'
				})
		}

		//Set some variable
		$scope.modal = {}
		$scope.cart = {}
		$scope.cart.items = []
		$scope.cart.total = 0;
		$scope.card = {};
		$scope.delivery = {};
		$scope.email = globalVariable.email;
		$scope.cardnumber = /^\d+$/;
		$scope.expired = /[0-9]{4}\/[0-9]{2}/

		//function to add element to cart and update amount of price
		$scope.addToCart = function (item) {
			$scope.cart.items.push(item)
			$scope.cart.total = parseInt($scope.cart.total) + parseInt(item.price);
		}

		//function to remove element to cart and update amount of price
		$scope.removeToCart = function (item) {
			var index = $scope.cart.items.indexOf(item);
			if (index >= 0) {
				$scope.cart.total = parseInt($scope.cart.total) - parseInt($scope.cart.items[index].price);
				$scope.cart.items.splice(index, 1);
			}
			if (!$scope.cart.items.length) {
				$scope.cart = {};
				$scope.cart.items = []
				$scope.cart.total = 0;
			}
		}

		//function for show or hide modal
		$scope.showModal = function () {
			globalVariable.showModal('#checkoutModal')
		}
		$scope.dismiss = function () {
			globalVariable.hideModal('#paymentModal')
		}

		//function for checkout order
		$scope.checkout = function (restaurant) {
			//check if all field are not empty
			if (Object.keys($scope.card).length != 4 || Object.keys($scope.delivery).length != 4) {
				$scope.modal.error = 'All fields are required'
			} else {
				//create an order
				var meals = []
				for (var i = 0; i < $scope.cart.items.length; i++) {
					meals.push($scope.cart.items[i].name)
				}
				var orderContents = {
					email : $scope.delivery.email,
					surname : $scope.delivery.surname,
					address : $scope.delivery.address,
					notes : $scope.delivery.notes,
					meals : meals,
					price : $scope.cart.total,
					delivered : false
				}

				var order = Stamplay.Object('order');

				order.save(orderContents).then(function(){
					globalVariable.hideModal('#checkoutModal')
					$scope.$apply(function(){
						$scope.cart = {};
				 		$scope.cart.items = []
				 		$scope.cart.total = 0;
					})
					var webhook = Stamplay.Webhook('ordercomplete');
					var data = {
							restaurant_owner_email: restaurant.owner_email,
							order: data
					}
					webhook.post(data).then(function (response) {}, function( err ){
					  $scope.modal.error = 'Ops Something went Wrong'
					});
					setTimeout(function () {
						globalVariable.showModal('#paymentModal')
					}, 1000)

				}, function(){
					$scope.modal.error = 'Ops Something went Wrong'
				})
			}
		}
}])
