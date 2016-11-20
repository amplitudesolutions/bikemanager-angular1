'use strict';

angular.module('amplitudeApp.controllers', [])

.controller('menuBarCtrl', ['$scope', '$mdSidenav', '$location', 'authentication', function($scope, $mdSidenav, $location, authentication) {

	$scope.toggleSidenav = function() {
		$mdSidenav('left').toggle();
	}

	$scope.backToDashboard = function() {
		$location.path("/dashboard");
	};

	$scope.logout = function() {
		authentication.logout();
	};

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if ($location.path().split('/')[1] === 'dashboard' || $location.path().split('/')[1] === 'login') {
		 	$scope.displayBack = false;
		} else {
			$scope.displayBack = true;
		};

		if($location.path().split('/')[1] === 'login') {
			$scope.showLogin = false;
		} else {
			$scope.showLogin = true;
		};
	});

}])


;