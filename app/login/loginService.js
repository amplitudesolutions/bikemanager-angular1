'use strict';

angular.module('amplitudeApp.services.loginService', [])

.factory('authentication', ['$http', 'API_URL', '$window', '$state', '$q', '$timeout', function($http, API_URL, $window, $state, $q, $timeout){
	var url = API_URL;

	return {
		isAuthenticated: function() {
			var defer = $q.defer();

			if ($window.sessionStorage.token) {
				defer.resolve(); 
			} else {
				$timeout(function() {
					$state.go('login');
					defer.reject();
				});
			}
			return defer.promise;
		},
		login: function(user) {
			return $http.post(url + 'authenticate', {email: user.email, password: user.password})
				.success(function(response) {
					if (response.token) {
						$window.sessionStorage.token = response.token;
						// $http.defaults.headers.common.Authorization = response.token;
					}
					// return response.user;
				})
				.error(function(error) {
					delete $window.sessionStorage.token;
					// console.log(error);
					// return error;
				});
		},
		logout: function() {
			 delete $window.sessionStorage.token;
			 $state.go('login');
		}
	}
}])

;


// item.user = TEMP_USER;
// 			return $http.post(url + 'bikes', item)
// 				.success(function(data) {
// 					return data;
// 				})
// 				.error(function(error) {
// 					console.log(error);
// 					return error;
// 				});