(function(angular) {
    "use strict";
    angular.module("nodeApp.feature")
        .controller("featureCtrl", featureCtrl);
    featureCtrl.$inject = ['$scope', '$timeout', '$resource', 'booksFactory'];

    function featureCtrl($scope, $timeout, $resource, booksFactory) {
        function _init() {
            loadBooks();
        }

        function loadBooks() {
            booksFactory.getBooks().$promise.then(function(data) {
                $scope.books = data;
            }, function(error) {
                console.log(error);
            }).then(function() {
                $scope.busy = false;
            });
        }

        _init();
    }

})(angular);