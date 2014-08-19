'use strict';

/*
 * This file is part of the qandidate/toggle-ui package.
 *
 * (c) Qandidate.com <opensource@qandidate.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* App */

var toggleApp = angular.module('toggle-ui', ['ngRoute', 'toggle-ui.controllers', 'toggle-ui.services'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/toggles.html', controller: 'ToggleCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }])
  // copied from @_PandaJS: http://stackoverflow.com/questions/15417125/submit-form-on-pressing-enter-with-angularjs#17364716
  .directive('ngEnter', function() {
    return function(scope, element, attrs) {
      element.bind("keypress", function(event) {
        if(event.which === 13) {
          scope.$apply(function() {
            scope.$eval(attrs.ngEnter);
          });
          event.preventDefault();
        }
      });
    };
});
