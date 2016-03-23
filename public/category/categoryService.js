angular.module('app')
    .run(['categoryService', 'mediator', function (categoryService, mediator) {
        categoryService.init().then(function () {
            console.log('run-categoryService-file');
            mediator.$emit('categories:loaded');
        });
    }])
    .service('categoryService', ['$http', function ($http) {
        this.categories = [];
        var _this = this;
        this.init = function () {
            return $http({
                method: 'GET',
                url: '/categories'
            }).then(function (response) {
                _this.categories = response.data.data;
                return response;
            });
        };
    }]);
