'use strict';

angular.module('amplitudeApp.services', [])

.factory('authInterceptor',['$rootScope', '$q', '$window', function($rootScope, $q, $window) {
	return {
		request: function (config) {
     		config.headers = config.headers || {};
      		if ($window.sessionStorage.token) {
        		config.headers.Authorization = $window.sessionStorage.token; //'Bearer ' + $window.sessionStorage.token;
      		}
      		return config;
    	},
    	responseError: function (rejection) {
	      	if (rejection.status === 401) {
	      		delete $window.sessionStorage.token;
	        	// handle the case where the user is not authenticated
	      	}
	      		return $q.reject(rejection);
	    	}
  	};
}])

;