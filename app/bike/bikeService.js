'use strict';

angular.module('amplitudeApp.services.bikeService', [])

.factory('bike', ['$http', 'API_URL', function($http, API_URL){
	var url = API_URL;

	return {
		getAll: function() {
			return $http.get(url + 'bikes');
		},
		get: function(id) {
			return $http.get(url + 'bikes/' + id);
		},
		add: function(item) {
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
		delete: function(id) {
			return $http.delete(url + 'bikes/' + id)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		gotPart: function(bike, item) {
			return $http.get(url + 'bikes/' + bike + '/wanted/' + item._id + '/got');
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
		editBuild: function(bike, item) {
			return $http.put(url + 'bikes/' + bike + '/build/' + item._id, item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		deleteBuild: function(bike, item) {
			return $http.delete(url + 'bikes/' + bike + '/build/' + item._id)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});
		},
		getMaintenance: function(bike, query) {
			return $http.get(url + "bikes/" + bike + "/maintenance" + query)
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
		editMaintenance: function(item) {
			return $http.put(url + 'maintenance/' + item._id, item)
				.success(function(data) {
					return data;
				})
				.error(function(error) {
					console.log(error);
					return error;
				});	
		},
		deleteMaintenance: function(item) {
			return $http.delete(url + 'maintenance/' + item._id)
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
		},
		deleteWanted: function(bike, item) {
			return $http.delete(url + 'bikes/' + bike + '/wanted/' + item._id)
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