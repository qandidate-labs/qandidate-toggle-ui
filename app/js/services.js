'use strict';

/*
 * This file is part of the qandidate/toggle-ui package.
 *
 * (c) Qandidate.com <opensource@qandidate.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/* Services */

angular.module('toggle-ui.services', ['ngResource'])
    .factory('Toggle', function($resource, TOGGLE_API_BASE_URL) {
        if (! TOGGLE_API_BASE_URL) {
            throw new Error("No TOGGLE_API_BASE_URL set, have you configured it?");
        }

        return $resource(TOGGLE_API_BASE_URL + '/toggles/:name', {name: '@name'}, {
            query: {method:'GET', isArray: true},
            delete: {method: 'DELETE'},
            put: {method: 'PUT'}
        });
    })
    .constant('TOGGLE_API_BASE_URL', '');
