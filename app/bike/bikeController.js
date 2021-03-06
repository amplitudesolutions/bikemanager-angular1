'use strict';

angular.module('amplitudeApp.bike', ['amplitudeApp.services.bikeService', 'amplitudeApp.directives.bikeDirective'])


.controller('bikeCtrl', ['$scope', '$stateParams', '$mdDialog' ,'bike', function($scope, $stateParams, $mdDialog, bike) {
	$scope.showMoreMaintenance = false;
	var bikeId = $stateParams.id;

	$scope.maintItemsDisplay = 5;

	bike.get(bikeId).then(function(data) {
		$scope.bike = data.data;
		if ($scope.bike.maintenance.length > $scope.maintItemsDisplay)
			$scope.showMoreMaintenance = true;
	});

	$scope.displayMoreMaintenance = function() {
		$scope.maintItemsDisplay += 5;
		if ($scope.bike.maintenance.length <= $scope.maintItemsDisplay)
			$scope.showMoreMaintenance = false;
	};

	$scope.addBuild = function(ev) {
		$mdDialog.show({
			controller: 'partsDialogCtrl',
			templateUrl: 'bike/partsDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: null
			}
		}).then(function(part) {
			bike.addBuild(bikeId, part).then(function(data) {
	    		$scope.bike = data.data;
	    	});
		}, function() {

		});
	};

	$scope.editBuild = function(build, ev) {
		$mdDialog.show({
			controller: 'partsDialogCtrl',
			templateUrl: 'bike/partsDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: angular.copy(build)
			}
		}).then(function(part) {
			bike.editBuild(bikeId, part).then(function(data) {
	    		$scope.bike = data.data;
	    	});
		}, function() {

		});
	};

	$scope.deleteBuild = function(build) {
		bike.deleteBuild(bikeId, build).then(function(data) {
			$scope.bike = data.data;
		});
	};

	$scope.addMaintenance = function(ev) {

		$mdDialog.show({
			controller: 'maintenanceDialogCtrl',
			templateUrl: 'bike/maintenanceDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: null
			}
		}).then(function(maintenance) {
			bike.addMaintenance(bikeId, maintenance).then(function(data) {
	    		$scope.bike = data.data;
	    	});
		}, function() {

		});
	};

	$scope.editMaintenance = function(maintenanceItem, ev) {
		$mdDialog.show({
			controller: 'maintenanceDialogCtrl',
			templateUrl: 'bike/maintenanceDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: angular.copy(maintenanceItem)
			}
		}).then(function(maintenance) {
			bike.editMaintenance(maintenance).then(function(data) {
				// Refresh Bike..... maybe need to find better way to do.
				bike.get(bikeId).then(function(data) {
					$scope.bike = data.data;
					if ($scope.bike.maintenance.length > $scope.maintItemsDisplay)
						$scope.showMoreMaintenance = true;
				});
	    	});
		}, function() {

		});	
	};

	$scope.checkCompleted = function(item) {
		if (item.completeddate)
			return true;
		
		return false;
	};

	$scope.updateCompleted = function(item) {
		if (item.completeddate)
			item.completeddate = '';
		else
			item.completeddate = new Date();

		bike.editMaintenance(item).then(function(data) {
			// Refresh Bike..... maybe need to find better way to do.
			bike.get(bikeId).then(function(data) {
				$scope.bike = data.data;
				if ($scope.bike.maintenance.length > $scope.maintItemsDisplay)
					$scope.showMoreMaintenance = true;
			});
		});
	};

	$scope.deleteMaintenance = function(item) {
		bike.deleteMaintenance(item).then(function(data) {

			// Refresh Bike..... maybe need to find better way to do.
			bike.get(bikeId).then(function(data) {
				$scope.bike = data.data;
				if ($scope.bike.maintenance.length > $scope.maintItemsDisplay)
					$scope.showMoreMaintenance = true;
			});
		});
	};

	$scope.addWanted = function(ev) {
		$mdDialog.show({
			controller: 'partsDialogCtrl',
			templateUrl: 'bike/partsDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: null
			}
		}).then(function(part) {
			bike.addWanted(bikeId, part).then(function(data) {
	    		$scope.bike = data.data;
	    	});
		}, function() {

		});
	};

	$scope.editWanted = function(partItem, ev) {
		$mdDialog.show({
			controller: 'partsDialogCtrl',
			templateUrl: 'bike/partsDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: angular.copy(partItem)
			}
		}).then(function(part) {
			bike.editWanted(bikeId, part).then(function(data) {
	    		$scope.bike = data.data;
	    	});
		}, function() {

		});
	};

	$scope.deleteWanted = function(partItem) {
		bike.deleteWanted(bikeId, partItem).then(function(data) {
			$scope.bike = data.data;
		});
	};

	$scope.gotPart = function(partItem) {
		bike.gotPart(bikeId, partItem).then(function(data) {
			$scope.bike = data.data;
		});
	};

	$scope.viewHistory = function(ev) {
		$mdDialog.show({
			controller: 'historyDialogCtrl',
			templateUrl: 'bike/bikeHistoryDialog.tmpl.html',
			parant: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				item: angular.copy($scope.bike._id)
			}
		}).then(function(part) {
			bike.editWanted(bikeId, part).then(function(data) {
	    		$scope.bike = data.data;
	    	});
		}, function() {

		});
	};
}])

.controller('maintenanceDialogCtrl', ['$scope', '$mdDialog', 'item', function($scope, $mdDialog, item) {
	if (item) {
		$scope.maintenance = item;
	
		if (item.completeddate != null)
			$scope.maintenance.completeddate = new Date(item.completeddate);
	}
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.save = function() {
		$mdDialog.hide($scope.maintenance);
	};
}])

.controller('partsDialogCtrl', ['$scope', '$mdDialog', 'item', function($scope, $mdDialog, item) {
	if (item) {
		$scope.part = item;
	}
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.save = function() {
		$mdDialog.hide($scope.part);
	};
}])

.controller('bikeDialogCtrl', ['$scope', '$mdDialog', 'item', 'bike', function($scope, $mdDialog, item, bike) {
	$scope.headerText = "Use this section to add a new bike";

	if (item) {
		$scope.headerText = "Use this section to edit your bike details";
		$scope.bike = item;
	}
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.save = function() {
		var returnBike = {};
		if (item) {
			bike.edit($scope.bike).then(function(data) {
	    		$mdDialog.hide(data);
	    	});
		} else {
			bike.add($scope.bike).then(function(data) {
	    		$mdDialog.hide(data);
	    	});
		}
	};
}])

.controller('historyDialogCtrl', ['$scope', '$mdDialog', 'item', 'bike', function($scope, $mdDialog, item, bike) {

	$scope.pages = [];
	var currentPage = 0;
	var perPage = 4;

	bike.getMaintenance(item, '?top=100&start=01/01/1999').then(function(data) {
		for (var i = 0; i < data.data.length / perPage; i++) {
			$scope.pages.push(i);
		}
	});

	bike.getMaintenance(item, '?top=' + perPage + '&start=01/01/1999&page=0').then(function(data) {
		$scope.maintenanceItems = data.data;
	});

	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.gotoPage = function(page) {
		bike.getMaintenance(item, '?top=' + perPage + '&start=01/01/1999&page=' + page).then(function(data) {
			$scope.maintenanceItems = data.data;
		});		
	};

}])

;