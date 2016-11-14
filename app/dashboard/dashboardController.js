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
			refreshBikeList();
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
			refreshBikeList();
		});
	};

	$scope.deleteBike = function(item) {
		bike.delete(item._id).then(function(data) {
			refreshBikeList();
		});
	};

}])

;