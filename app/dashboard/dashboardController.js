'use strict';

angular.module('amplitudeApp.dashboard', ['amplitudeApp.services.dashboardService', 'amplitudeApp.directives.dashboardDirective'])


.controller('dashboardCtrl', ['$scope', '$mdDialog','bike', function($scope, $mdDialog, bike) {
	
	function refreshBikeList() {
		bike.getAll().then(function(data) {
			$scope.bikes = data.data;
		});	
	};

	refreshBikeList();
	
	$scope.addBike = function(ev) {
		$mdDialog.show({
			controller: 'bikeDialogCtrl',
			templateUrl: 'bike/bikeDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: null
			}
		}).then(function(newBike) {
			bike.add(newBike).then(function(data) {
	    		$scope.bikes.push(data.data);
	    	});
		}, function() {

		});
	};

	$scope.editBike = function(bikeItem, ev) {
		$mdDialog.show({
			controller: 'bikeDialogCtrl',
			templateUrl: 'bike/bikeDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: angular.copy(bikeItem)
			}
		}).then(function(bikeResult) {
			bike.edit(bikeResult).then(function(data) {
	    		refreshBikeList();
	    	});
		}, function() {

		});
	};
}])

;