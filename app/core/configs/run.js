(function() {
    "use strict";

    angular
        .module("nodeApp.core")
        .run(runConfig);

    runConfig.$inject = ["$templateCache", "$rootScope", "$state"];

    function runConfig($templateCache, root, $state, authService, editableOptions, editableThemes) {

        root.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {

        });

        root.$on("$stateChangeSuccess", function(event, toState, toParams, fromState, fromParams) {

        });

        root.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {

        });

        root.$on("$stateNotFound", function(event, unfoundState, fromState, fromParams) {
            $state.transitionTo("otherwise");
        });
    }
})();