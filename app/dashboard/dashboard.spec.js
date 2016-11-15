describe('Controller: amplitudeApp.dashboard', function() {
	var bike, $controller, $httpBackend, $mdDialog, $scope;

	var BIKES = [
		{_id: '1', name: 'Transition Scout', size: 'Large', year: '2016', build: [], maintenance: [], wanted: []},
		{_id: '2', name: 'Rocky Mountain Blizzard', size: 'Small', year: '2014', build: [], maintenance: [], wanted: []},
		{_id: '3', name: 'Rocky Mountain Slayer SS', size: 'Long', year: '2013', build: [], maintenance: [], wanted: []},
	]

	beforeEach(angular.mock.module('ui.router'));
	beforeEach(angular.mock.module('ngMaterial'));
	beforeEach(angular.mock.module('amplitudeApp.dashboard'));
	beforeEach(angular.mock.module('amplitudeApp.services.bikeService'));

	var API = "http://localhost:443/api/";

	beforeEach(module(function($provide) {
		$provide.constant("API_URL", "http://localhost:443/api/");
		$provide.constant("TEMP_USER", "581df76e09f63ef825000004");
	}));
	
	beforeEach(inject(function(_$controller_, _bike_, _$httpBackend_, _$mdDialog_, $rootScope) {
		$controller = _$controller_;
		bike = _bike_;
		$httpBackend = _$httpBackend_;
		$mdDialog = _$mdDialog_;
		$scope = $rootScope.$new();
	}));

	describe('dashboardCtrl', function() {
		// var $scope = {};
		var DashboardCtrl;

		beforeEach(function() {
			DashboardCtrl = $controller('dashboardCtrl', {$scope: $scope, $mdDialog: $mdDialog, bike: bike});
		});

		it('should be defined', function() {
			expect(DashboardCtrl).toBeDefined();
		});

		describe('Default Dashboard Controller Loading', function() {

			beforeEach(function() {
			});

			it('should load the bikes', function() {
				expect($scope.bikes).toBeUndefined();

				$httpBackend.whenGET(API + 'bikes').respond(200, BIKES);
				$httpBackend.flush();

				expect($scope.bikes).toBeDefined();
				expect($scope.bikes.length).toEqual(3);
				expect($scope.bikes[0].name).toEqual('Transition Scout');
				expect($scope.bikes[0].year).toEqual('2016');
				expect($scope.bikes[0].size).toEqual('Large');
				expect($scope.bikes[0].build.length).toEqual(0);
				expect($scope.bikes[0].wanted.length).toEqual(0);
				expect($scope.bikes[0].maintenance.length).toEqual(0);
				// console.log($scope.bikes);

			});
		});

		describe('Add new bike', function() {
			beforeEach(function() {
				var fakeModal = {
				    then: function(confirmCallback, cancelCallback) {
			            //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
			            this.confirmCallBack = confirmCallback;
			            this.cancelCallback = cancelCallback;
			        }
				};
				spyOn($mdDialog, 'show').and.returnValue(fakeModal);
			});

			it('should open a dialog for adding a new bike to the list', function() {
				$scope.addBike();
				expect($mdDialog.show).toHaveBeenCalled();
			});
		});

		describe('Edit a bike', function() {
			beforeEach(function() {
				var fakeModal = {
				    then: function(confirmCallback, cancelCallback) {
			            //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
			            this.confirmCallBack = confirmCallback;
			            this.cancelCallback = cancelCallback;
			        }
				};
				spyOn($mdDialog, 'show').and.returnValue(fakeModal);
			});

			it('should open a dialog for adding a new bike to the list', function() {
				$scope.editBike();
				expect($mdDialog.show).toHaveBeenCalled();
			});
		});
		
		describe('Delete a bike', function() {
			var item = {_id: '1', name: 'Transition Scout', size: 'Large', year: '2016', build: [], maintenance: [], wanted: []};

			beforeEach(function() {
				spyOn(bike, "delete").and.callThrough();
			});

			it('should remove a bike from the list', function() {
				expect(BIKES.length).toEqual(3);
				expect(bike.delete).not.toHaveBeenCalled();
				
				$httpBackend.whenDELETE(API + 'bikes/1').respond(200, BIKES.splice(0,1));
				$scope.deleteBike(item);
				
				expect(BIKES.length).toEqual(2);
			});
		});

		describe('should go to the bike details page', function() {

		});
	});
});