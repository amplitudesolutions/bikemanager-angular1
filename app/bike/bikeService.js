'use strict';

angular.module('amplitudeApp.services.bikeService', [])

.factory('bike', ['$http', function($http){
	var url = 'https://limitless-everglades-69582.herokuapp.com/api/';

	return {
		getAll: function() {
			return $http.get(url + 'bikes');
		},
		get: function(id) {
			return $http.get(url + 'bikes/' + id);

		},
		add: function(item) {
			item.user = '581df76e09f63ef825000004';

			return $http.post(url + 'bikes', item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		edit: function(item) {
			return $http.put(url + 'bikes/' + item._id, item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		addBuild: function(bike, item) {
			return $http.post(url + 'bikes/' + bike + '/build', item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		editBuild: function(bike, build, item) {
			return $http.put(url + 'bikes/' + bike + '/build/' + build, item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		addMaintenance: function(bike, item) {
			return $http.post(url + 'bikes/' + bike + '/maintenance', item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});	
		},
		editMaintenance: function(bike, item) {
			return $http.put(url + 'bikes/' + bike + '/maintenance/' + item._id, item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});	
		},
		deleteMaintenance: function(bike, item) {
			return $http.delete(url + 'bikes/' + bike + '/maintenance/' + item._id)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		addWanted: function(bike, item) {
			return $http.post(url + 'bikes/' + bike + '/wanted', item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});	
		},
		editWanted: function(bike, item) {
			return $http.put(url + 'bikes/' + bike + '/wanted/' + item._id, item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});		
		}
	}
}])

;	