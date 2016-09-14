(function(angular) {
    "use strict";

    var core = angular.module("nodeApp.core");

    core.config(configure);

    configure.$inject = [
        "$config",
        "$locationProvider",
        "$stateProvider"
    ];

    /* @ngInject */
    function configure($config, $locationProvider, $stateProvider) {


        configureRouting();

        function configureRouting() {
            //create base layout
            $stateProvider.state("layout", {
                abstract: true, //makes this view only viewable from one of its child states
                templateUrl: $config.viewsRoot + "shared/Layout.html"
            });


            $stateProvider.state("layout.home", {
                url: "/",
                controller: "homeCtrl",
                templateUrl: $config.viewsRoot + "home/Index.html"
            });

            $stateProvider.state("layout.feature", {
                url: "/feature",
                controller: "featureCtrl",
                templateUrl: $config.viewsRoot + "feature/Index.html"
            });

            $stateProvider.state("otherwise", {
                url: "*path",
                templateUrl: $config.viewsRoot + "shared/404.html",
                authenticate: false
            });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        };
    }
})(angular);