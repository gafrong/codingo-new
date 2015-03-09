/*
This component provides access to global functionalities and variables to avoid code duplication. 
*/
app.factory('globalVariable', function () {
	return {
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		cuisine: {
			african: 'African',
			american: 'American',
			barbecue: 'Barbecue',
			cafe: 'Cafe',
			chinese: 'Chinese',
			'czech/slovak': 'Czech / Slovak',
			german: 'German',
			indian: 'Indian',
			japanese: 'Japanese',
			mexican: 'Mexican',
			pizza: 'Pizza',
			thai: 'Thai',
			vegetarian: 'Vegetarian'
		},
		hideModal: function (selector) {
			$(selector).modal('hide')
		},
		showModal: function (selector) {
			$(selector).modal('show')
		}
	}
});