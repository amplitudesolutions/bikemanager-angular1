'use strict';

angular.module('amplitudeApp.controllers', [])

.controller('menuBarCtrl', ['$scope', '$mdSidenav', '$location', function($scope, $mdSidenav, $location) {

	$scope.toggleSidenav = function() {
		$mdSidenav('left').toggle();
	}

	$scope.backToDashboard = function() {
		$location.path("/dashboard");
	};

	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		if ($location.path().split('/')[1] === 'dashboard') {
		 	$scope.displayBack = false;
		} else {
			$scope.displayBack = true;
		};
	});

}])


;