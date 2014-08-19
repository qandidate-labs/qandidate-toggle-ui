'use strict';

angular.module('toggle-ui-test', ['toggle-ui', 'ngRoute', 'ngMockE2E'])
.run(function($httpBackend) {
  var toggles = [
      {
          "name": "toggling",
          "conditions": [
              {
                  "name": "operator-condition",
                  "key": "user_id",
                  "operator": {
                      "name": "less-than",
                      "value": 42
                  }
              }
          ]
      },
      {
          "name": "toggling2",
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
      }
  ];

  $httpBackend.whenGET('http://toggles.dev/toggles').respond(toggles);
  $httpBackend.whenGET().passThrough();
  $httpBackend.whenDELETE(/http:\/\/toggles.dev\/toggles/).respond(200);
});
