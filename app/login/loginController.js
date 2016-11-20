'use strict';

angular.module('amplitudeApp.login', ['amplitudeApp.services.loginService'])

.controller('loginCtrl', ['$scope', 'authentication', '$state', function($scope, authentication, $state) {

	$scope.login = function() {
		authentication.login($scope.user).then(function(user) {
			$state.go('dashboard');
		}).catch(function(error) {
			console.log(error);
		});
	};

}])

;