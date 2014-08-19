describe('Toggle service', function() {
  var $httpBackend;

  beforeEach(module('toggle-ui.services'));

  it('should throw an error when no TOGGLE_API_BASE_URL constant defined', function() {
    expect(function() {
      inject(function(Toggle){});
    }).toThrow(new Error("No TOGGLE_API_BASE_URL set, have you configured it?"));
  });
});
