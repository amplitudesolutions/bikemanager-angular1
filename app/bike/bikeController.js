'use strict';

angular.module('amplitudeApp.bike', ['amplitudeApp.services.bikeService', 'amplitudeApp.directives.bikeDirective'])


.controller('bikeCtrl', ['$scope', '$stateParams', '$mdDialog' ,'bike', function($scope, $stateParams, $mdDialog, bike) {
	
	var bikeId = $stateParams.id;

	bike.get(bikeId).then(function(data) {
		$scope.bike = data.data;
	});

	$scope.addBuild = function(ev) {
		var confirm = $mdDialog.prompt()
	      	.title('Enter a part of your build')
	      	// .textContent('Bowser is a common name.')
	      	.placeholder('Part Description')
	      	// .ariaLabel('Dog name')
	      	// .initialValue('Buddy')	
	      	.targetEvent(ev)
			.ok('Add')
	    	.cancel('Cancel');

	    $mdDialog.show(confirm).then(function(result) {
	    	bike.addBuild(bikeId, {description: result}).then(function(data) {
	    		$scope.bike = data.data;
	    	});
	      	// $scope.status = 'You decided to name your dog ' + result + '.';
	    }, function() {
	      	// $scope.status = 'You didn\'t name your dog.';
	    });
	};

	$scope.editBuild = function(build, ev) {
		var confirm = $mdDialog.prompt()
	      	.title('Enter a part of your build')
	      	// .textContent('Bowser is a common name.')
	      	.placeholder('Part Description')
	      	// .ariaLabel('Dog name')
	      	.initialValue(build.description)	
	      	.targetEvent(ev)
			.ok('Add')
	    	.cancel('Cancel');

	    $mdDialog.show(confirm).then(function(result) {
	    	bike.editBuild(bikeId, build._id, {description: result}).then(function(data) {
	    		$scope.bike = data.data;
	    	});
	      	// $scope.status = 'You decided to name your dog ' + result + '.';
	    }, function() {
	      	// $scope.status = 'You didn\'t name your dog.';
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
			bike.editMaintenance(bikeId, maintenance).then(function(data) {
	    		$scope.bike = data.data;
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

		bike.editMaintenance(bikeId, item).then(function(data) {
			$scope.bike = data.data;
		});
	};

	$scope.deleteMaintenance = function(item) {
		bike.deleteMaintenance(bikeId, item).then(function(data) {
			$scope.bike = data.data;
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

.controller('bikeDialogCtrl', ['$scope', '$mdDialog', 'item', function($scope, $mdDialog, item) {
	if (item) {
		$scope.bike = item;
	}
	
	$scope.cancel = function() {
		$mdDialog.cancel();
	};

	$scope.save = function() {
		$mdDialog.hide($scope.bike);
	};
}])

;