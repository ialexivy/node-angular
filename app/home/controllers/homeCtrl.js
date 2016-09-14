(function() {
    'use strict';

    angular
        .module('nodeApp.home')
        .controller('homeCtrl', homeCtrl);

    homeCtrl.$inject = ['$scope', '$timeout', '$resource'];

    function homeCtrl($scope, $timeout, $resource) {
        $scope.Title = "Home";

    }
})();