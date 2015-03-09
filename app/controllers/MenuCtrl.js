//controller for menu and order
app.controller('MenuCtrl', ['$scope', '$http', 'userStatus', 'globalVariable', 'qId',
	function MenuCtrl($scope, $http, userStatus, globalVariable, paramValue) {

		//Call service 
		//if user was defined -> update $scope
		if (userStatus.getUser().hasOwnProperty('_id')) {
			$scope.user = userStatus.getUser();
			//get resturant by id 
			getRestaurant(paramValue, false)
		} else {
			//if user non defined, call getStatus api
			var httpCall = userStatus.getUserCall().then(function (data) {
				//if user is logged -> update $scope
				if (data.status == 200 && data.data.user) {
					$scope.user = {}
					$scope.user.logged = true;
					$scope.user.displayName = data.data.user.displayName;
					$scope.user.picture = data.data.user.profileImg;
					$scope.user._id = data.data.user._id;
					userStatus.setUser(data.data.user.displayName, data.data.user.profileImg, data.data.user._id, data.data.user.email, true)
						//get resturant by id 
					getRestaurant(paramValue, false)
				} else {
					//if user is not logged -> get restaurant by id (without possibility to rate it)
					getRestaurant(paramValue, true)
				}
			})
		}
		//function for get Restaurant by id
		function getRestaurant(paramValue, notlogged) {
			$http({
				method: 'GET',
				url: '/api/cobject/v0/restaurant/' + paramValue + '?populate=true'
			}).
			success(function (data, status) {
				$scope.restaurant = data;
				//Since meals are populated 
				$scope.restaurant.menuItems = $scope.restaurant.meals;
				var find = true;
				//if user is logged check if he already rate this restaurant 
				if (!notlogged) {
					for (var i = 0; i < data.actions.ratings.users.length && find; i++) {
						if (data.actions.ratings.users[i].userId == $scope.user._id) {
							$scope.yourvote = data.actions.ratings.users[i].rating
							$scope.voted = true;
							find = false;
						}
					}
				}

			}).error(function (data, status) {
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
				var data = {
						email: $scope.delivery.email,
						surname: $scope.delivery.surname,
						address: $scope.delivery.address,
						notes: $scope.delivery.notes,
						meals: meals,
						price: $scope.cart.total,
						delivered: false
					}
					//Post request for create order      
				$http({
					method: 'POST',
					data: data,
					url: '/api/cobject/v0/order'
				}).
				success(function (data, status) {
					//close modal and reset cart
					globalVariable.hideModal('#checkoutModal')
					$scope.cart = {};
					$scope.cart.items = []
					$scope.cart.total = 0;

					var hookData = {
						restaurant_owner_email: restaurant.owner_email,
						order: data
					}

					$http({
							method: 'POST',
							data: hookData,
							url: '/api/webhook/v0/ordercomplete/catch'
						})
						.success(function (data, status) {})
						.error(function (data, status) {
							$scope.modal.error = 'Ops Something went Wrong'
						})


					setTimeout(function () {
						globalVariable.showModal('#paymentModal')
					}, 1000)
				}).error(function (data, status) {
					$scope.modal.error = 'Ops Something went Wrong'
				})
			}
		}
}])