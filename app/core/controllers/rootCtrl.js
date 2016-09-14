(function() {
    "use strict";

    angular
        .module("nodeApp")
        .controller("RootCtrl", RootCtrl);

    RootCtrl.$inject = ["$scope", "$state"];

    function RootCtrl($scope, $state) {
        $scope.title = "Hello angular";

        function _init() {

            //expose public functions
        }

        _init();
    }
})();