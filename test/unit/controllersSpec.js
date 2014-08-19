'use strict';

describe('toggle-ui controllers', function(){
  beforeEach(module('toggle-ui.controllers'));

  beforeEach(module('toggle-ui.services'));

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('ToggleCtrl', function() {
    var scope, ctrl, $httpBackend;

    var togglesData = [
            {
                "name": "toggling",
                "status": "conditionally-active",
                "conditions": [
                    {
                        "name": "operator-condition",
                        "key": "user_id",
                        "operator": {
                            "name": "less-than",
                            "value": 42
                        }
                    },
                    {
                        "name": "operator-condition",
                        "key": "company_id",
                        "operator": {
                            "name": "in-set",
                            "values": [1337, 1028]
                        }
                    },
                    {
                        "name": "operator-condition",
                        "key": "user_id_mod_100",
                        "operator": {
                            "name": "percentage",
                            "precentage": 50,
                            "shift": 25
                        }
                    }
                ]
            },
            {
                "name": "toggling2",
                "status": "inactive",
                "conditions": [
                    {
                        "name": "operator-condition",
                        "key": "company_id",
                        "operator": {
                            "name": "greater-than",
                            "value": 42
                        }
                    }
                ]
            },
            {
                "name": "toggling3",
                "status": "active",
                "conditions": []
            }
        ];

    var loadedTogglesData = togglesData;
    angular.forEach(loadedTogglesData, function(t) { t.originalName = t.name });

    beforeEach(module(function($provide) {
        $provide.constant('TOGGLE_API_BASE_URL', 'http://127.0.0.1\\:8080');
    }));

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('http://127.0.0.1:8080/toggles').
        respond(togglesData);

      scope = $rootScope.$new();
      ctrl = $controller('ToggleCtrl', {$scope: scope});
    }));

    it('should create "toggles" model with 2 toggles fetched from xhr', function() {
      expect(scope.toggles).toEqualData([]);
      $httpBackend.flush();

      expect(scope.toggles).toEqualData(togglesData);
    });

    it('should delete a toggle via xhr', function() {
      $httpBackend.flush(); // load the toggles

      var toggle = scope.toggles[0];

      $httpBackend.expectDELETE('http://127.0.0.1:8080/toggles/toggling').
        respond('OK');

      scope.delete(toggle);

      $httpBackend.flush();

      expect(scope.toggles.length).toEqual(2);
    });

    it('should update a toggle via xhr', function() {
      $httpBackend.flush(); // load the toggles

      var toggle = scope.toggles[0];

      toggle.conditions[0].key = 'company_id';

      $httpBackend.expectPUT('http://127.0.0.1:8080/toggles/toggling').
        respond(204, '');

      scope.update(toggle);

      $httpBackend.flush();

      var newToggle = togglesData[0];
      newToggle.conditions[0].key = 'company_id';
      expect(scope.toggles[0]).toEqualData(newToggle);
    });

    it('should add an empty toggle', function() {
      $httpBackend.flush(); // load the toggles

      scope.add();

      expect(scope.toggles.length).toEqual(4);
    });

    it('it should save a new toggle', function() {
      $httpBackend.flush(); // load the toggles

      scope.add();

      var toggle = scope.toggles[scope.toggles.length - 1];

      toggle.name = 'toggling4';
      toggle.status = 'always-active';

      $httpBackend.expectPUT('http://127.0.0.1:8080/toggles/toggling4').
        respond(204, '');

      scope.update(toggle);

      $httpBackend.flush();
    });

    it('should add an empty condition', function() {
      $httpBackend.flush(); // load the toggles

      scope.addCondition(scope.toggles[0]);

      expect(scope.toggles[0].conditions.length).toEqual(4);
    });

    it('should delete an existing condition', function() {
      $httpBackend.flush(); // load the toggles

      scope.deleteCondition(scope.toggles[0].conditions[0], scope.toggles[0]);

      expect(scope.toggles[0].conditions.length).toEqual(2);
    });


    it('deletes and creates a toggle when renamed', function() {
      $httpBackend.flush(); // load the toggles

      var toggle = scope.toggles[0];

      toggle.name = 'toggling4';

      $httpBackend.expectPUT('http://127.0.0.1:8080/toggles/toggling4').
        respond(204, '');

      $httpBackend.expectDELETE('http://127.0.0.1:8080/toggles/toggling').
        respond(200, '');

      scope.update(toggle);

      $httpBackend.flush();

      var newToggle = togglesData[0];
      newToggle.name = 'toggling4';

      expect(scope.toggles[0]).toEqualData(newToggle);
    });
  });
});
