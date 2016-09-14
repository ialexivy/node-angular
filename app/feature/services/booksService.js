(function() {
    'use strict';

    angular
        .module('nodeApp.feature')
        .factory('booksFactory', booksFactory);

    booksFactory.$inject = ['$resource', '$cacheFactory', '$config'];

    function booksFactory($resource, $cacheFactory, $config) {
        var service = $resource($config.serviceRoot + 'books/:bookId', {
            bookId: '@id'
        }, {
            'getBooks': {
                method: "GET",
                q: '*',
                isArray: true,
                cache: false
            },
            'getBook': {
                method: "GET",
                params: {
                    jobId: "@id"
                }
            }
        });

        return service;
    }
})();