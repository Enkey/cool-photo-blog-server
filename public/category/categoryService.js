(function () {
    'use strict';


    angular
        .module('app')
        .run(run)
        .service('categoryService', categoryService);


    run.$inject = ['categoryService'];
    function run(categoryService) {
        categoryService.init();
    }

    categoryService.$inject = ['$http', '$rootScope'];
    function categoryService($http, $rootScope) {
        this.init = init;
        function init() {
            return $http
                .get('/categories')
                .then(function (res) {

                    if (!$rootScope.globals) {
                        $rootScope.globals = {};
                    }

                    $rootScope.globals.categories = res.data.data;
                    console.log('categories-loaded', $rootScope.globals.categories);
                    return res;
                });
        }

    }


})();
