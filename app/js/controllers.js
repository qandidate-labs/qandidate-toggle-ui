'use strict';

/*
 * This file is part of the qandidate/toggle-ui package.
 *
 * (c) Qandidate.com <opensource@qandidate.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* Controllers */

angular.module('toggle-ui.controllers', [])
  .controller('ToggleCtrl', ['$scope', 'Toggle', function($scope, Toggle) {
    $scope.toggles = Toggle.query(function(toggles) {
        angular.forEach(toggles, function(t) {
            t.originalName = t.name;
        });
    });

    $scope.operators = [
        {value: 'less-than', label: 'less than'},
        {value: 'greater-than', label: 'greater than'},
        {value: 'less-than-equal', label: 'less than equal'},
        {value: 'greater-than-equal', label: 'greater than equal'},
        {value: 'percentage', label: 'percentage'},
        {value: 'in-set', label: 'in set'},
        {value: 'has-intersection', label: 'has intersection'}
    ];
    $scope.statuses = [
        {value: 'always-active', label: 'always active'},
        {value: 'inactive', label: 'inactive'},
        {value: 'conditionally-active', label: 'conditionally active'}
    ];

    $scope.delete = function(toggle) {
        toggle.$delete(function() {
            $scope.toggles.splice( $scope.toggles.indexOf(toggle), 1);
        });
    }

    $scope.update = function(toggle) {
        var originalName = toggle.originalName;
        toggle.originalName = toggle.name;
        toggle.$put();

        if (originalName != '' && originalName != toggle.name) {
            var oldToggle = {};
            angular.copy(toggle, oldToggle);
            oldToggle.name = originalName;
            oldToggle.$delete();
        }
    }

    $scope.add = function() {
      var toggle = new Toggle();
      toggle.conditions = [];
      toggle.status = "conditionally-active";
      toggle.originalName = '';

      $scope.toggles.push(toggle);
    }

    $scope.addCondition = function(toggle) {
      var condition = {
        "name": "operator-condition",
        "operator": {
          "name": "less-than",
          "value": ""
        }
      };
      toggle.conditions.push(condition);
    }

    $scope.deleteCondition = function(condition, toggle) {
      toggle.conditions.splice(toggle.conditions.indexOf(condition), 1);
    }

    $scope.addValueInSet = function(value, operator, scope) {
        if (operator.values.indexOf(value) == -1) {
            operator.values.push(value);
        }
        scope.multipleValue = '';
    }

    $scope.deleteValueOfSet = function(value, operator) {
        operator.values.splice(operator.values.indexOf(value), 1);
    }

    $scope.changeOperator = function(operator) {

        if ('in-set' == operator.name || 'has-intersection' == operator.name) {
            operator.values = [];
            delete operator.value;
            delete operator.percentage;
            delete operator.shift;
        } else if ('percentage' == operator.name ) {
            operator.percentage = 0;
            operator.shift = 0;
            delete operator.value;
            delete operator.values;
        } else {
            if (typeof operator.value == 'undefined') {
                operator.value = '';
            }
            delete operator.values;
            delete operator.percentage;
            delete operator.shift;
        }
    }

  }]);
