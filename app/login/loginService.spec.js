describe('Services: Login factory', function() {
	var authentication, $httpBackend, $state;

	var API = "http://localhost:443/api/";

	beforeEach(module(function($provide) {
		$provide.constant("API_URL", "http://localhost:443/api/");
		$provide.constant("TEMP_USER", "581df76e09f63ef825000004");
	}));

	beforeEach(angular.mock.module('ui.router'));
	beforeEach(angular.mock.module('amplitudeApp.services.loginService'));

	beforeEach(inject(function(_authentication_, _$httpBackend_) {
		authentication = _authentication_;
		$httpBackend = _$httpBackend_;
		// $state = _$state_;
	}));

	it('should exist', function() {
		expect(authentication).toBeDefined();
	});
});


// 'API_URL', '$window', '$state', '$q', '$timeout'