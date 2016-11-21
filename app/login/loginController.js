'use strict';

angular.module('amplitudeApp.login', ['amplitudeApp.services.loginService'])

.controller('loginCtrl', ['$scope', 'authentication', '$state', function($scope, authentication, $state) {
	$scope.isRegistering = false;
	$scope.user = { email: '' };

	$scope.login = function() {
		authentication.login($scope.user).then(function(user) {
			$state.go('dashboard');
		}).catch(function(error) {
			console.log(error);
		});
	};

	$scope.register = function() {
		$scope.isRegistering = true;
	};

	$scope.createAccount = function() {
		authentication.create($scope.userRegistration).then(function(newUser) {
			console.log(newUser);
			//From here, can auto log them in? or force them to login.

			$scope.isRegistering = false;
			$scope.userRegistration = {};
			$scope.user.email = newUser.data.email;
			$scope.user.password = '';
		}).catch(function(error) {
			// $scope.userRegistrationForm.userEmail.$error = true;
			console.log(error);
		});
	};

}])

;