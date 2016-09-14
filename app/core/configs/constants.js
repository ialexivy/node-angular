(function(angular) {
    'use strict';

    var core = angular.module('nodeApp.core');

    var config = {
        serviceRoot: 'http://localhost:3000/api/v1/',
        viewsRoot: '',
        templatesRoot: '/Templates/'
    };

    core.constant('$config', config);
})(angular);