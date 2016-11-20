'use strict'

angular.module('amplitudeApp', [
	'ui.router',
  	'ngAnimate',
  	'ngMaterial',
  	'amplitudeApp.services',
  	'amplitudeApp.directives',
  	'amplitudeApp.controllers',
  	'amplitudeApp.dashboard',
  	'amplitudeApp.bike',
  	'amplitudeApp.login'
])

// lo dash, that way you can use Dependency injection.
.constant('_', window._)

.config(['$httpProvider', function($httpProvider) {
	$httpProvider.interceptors.push('authInterceptor');
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider

	    .state('dashboard', {
	      	url: '/dashboard',
	      	templateUrl: 'dashboard/dashboard.html',
	      	controller: 'dashboardCtrl',     
	      	resolve: {
		       	"currentAuth": ["authentication", function(authentication) {
		          return authentication.isAuthenticated();
		        }]
	      	}
	    })

	    .state('bike', {
	    	url: '/bike/:id',
	    	templateUrl: 'bike/bike.html',
	    	controller: 'bikeCtrl',
	    	resolve: {
	    		"currentAuth": ["authentication", function(authentication) {
		        	return authentication.isAuthenticated();
		        }]
	    	}
	    })

	    .state('login', {
	    	url: '/login',
	    	templateUrl: 'login/login.html',
	    	controller: 'loginCtrl',
	    	resolve: {

	    	}
	    })

	    ;

	}])

;