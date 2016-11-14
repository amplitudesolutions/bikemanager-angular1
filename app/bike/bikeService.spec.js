describe('Services: Bikes factory', function() {
	var bike, $httpBackend;

	var RESPONSE_BIKE = {
		'_id': '1',
		'name': 'Transition Scout',
		'year': '2016',
		'size': 'Large'
	};

	var RESPONSE_SUCCESS = [];
	RESPONSE_SUCCESS.push(RESPONSE_BIKE);

	var API = "http://localhost:443/api/";

	beforeEach(module(function($provide) {
		$provide.constant("API_URL", "http://localhost:443/api/");
		$provide.constant("TEMP_USER", "581df76e09f63ef825000004");
	}));

	beforeEach(angular.mock.module('amplitudeApp.services.bikeService'));

	beforeEach(inject(function(_bike_, _$httpBackend_) {
		bike = _bike_;
		$httpBackend = _$httpBackend_;
	}));

	it('should exist', function() {
		expect(bike).toBeDefined();
	});

	
	describe('.getAll()', function() {
		var result;

		beforeEach(function() {
			result = {};

			spyOn(bike, 'getAll').and.callThrough();
		});

		it('should return all bikes', function() {
			// $q.when() not working properly for some reason...
			$httpBackend.whenGET(API + 'bikes').respond(200, RESPONSE_SUCCESS);

			expect(bike.getAll).not.toHaveBeenCalled();
			expect(result).toEqual({});

			bike.getAll().then(function(res) {
				result = res;
			});

			$httpBackend.flush();

			expect(result.data.length).toEqual(1);
			expect(result.data[0]._id).toEqual('1');
			expect(result.data[0].name).toEqual('Transition Scout');
			expect(result.data[0].year).toEqual('2016');
			expect(result.data[0].size).toEqual('Large');
		
		});
	});

	describe('.get(id)', function() {
		var result;

		beforeEach(function() {
			result = {};
			spyOn(bike, "get").and.callThrough();
		});

		it('should return 1 bike details', function() {
			$httpBackend.whenGET(API + 'bikes/1').respond(200, RESPONSE_BIKE);

			expect(bike.get).not.toHaveBeenCalled();
			expect(result).toEqual({});

			bike.get(1).then(function(res) {
				result = res;
			});

			$httpBackend.flush();

			expect(result.data._id).toEqual('1');
			expect(result.data.name).toEqual('Transition Scout');
			expect(result.data.year).toEqual('2016');
			expect(result.data.size).toEqual('Large');
		});
	});

	describe('.add(bike)', function() {
		var result;

		beforeEach(function() {
			result = {};
			spyOn(bike, "add").and.callThrough();
		});

		it('should add 1 bike', function() {
			$httpBackend.whenPOST(API + 'bikes', RESPONSE_BIKE).respond(200, RESPONSE_BIKE);

			expect(bike.add).not.toHaveBeenCalled();
			expect(result).toEqual({});

			bike.add(RESPONSE_BIKE).then(function(res) {
				result = res;
			});

			$httpBackend.flush();
			expect(result.data._id).toEqual(RESPONSE_BIKE._id);
			expect(result.data.name).toEqual(RESPONSE_BIKE.name);
			expect(result.data.year).toEqual(RESPONSE_BIKE.year);
			expect(result.data.size).toEqual(RESPONSE_BIKE.size);
			expect(result.data.user).toBeDefined();
			expect(result.data.user).toEqual(RESPONSE_BIKE.user);
		});
	});

	describe('.edit(bike)', function() {
		var result;

		beforeEach(function() {
			result = {};
			spyOn(bike, "edit").and.callThrough();
		});

		it('should edit 1 bike', function() {
			RESPONSE_BIKE.name = "Rocky Mountain Slayer SS";
			RESPONSE_BIKE.year = "2013";
			RESPONSE_BIKE.size = "Long";

			$httpBackend.whenPUT(API + 'bikes/1', RESPONSE_BIKE).respond(200, RESPONSE_BIKE);

			expect(bike.edit).not.toHaveBeenCalled();
			expect(result).toEqual({});

			bike.edit(RESPONSE_BIKE).then(function(res) {
				result = res;
			});

			$httpBackend.flush();
			expect(result.data._id).toEqual(RESPONSE_BIKE._id);
			expect(result.data.name).toEqual(RESPONSE_BIKE.name);
			expect(result.data.year).toEqual(RESPONSE_BIKE.year);
			expect(result.data.size).toEqual(RESPONSE_BIKE.size);
		});
	});

	describe('.delete(bike)', function() {
		var result;

		beforeEach(function() {
			result = {};
			spyOn(bike, "delete").and.callThrough();
		});

		it('should delete 1 bike', function() {
			expect(RESPONSE_SUCCESS.length).toEqual(1);

			$httpBackend.whenDELETE(API + 'bikes/1').respond(200, RESPONSE_SUCCESS.splice(0));

			expect(bike.delete).not.toHaveBeenCalled();
			expect(result).toEqual({});

			bike.delete(1).then(function(res) {
				result = res;
			});
			
			$httpBackend.flush();
			expect(RESPONSE_SUCCESS.length).toEqual(0);
		});
	});

});