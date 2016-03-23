angular.module('app')
    .controller('categoryCtrl', ['$scope', 'categoryService', 'mediator',
        function ($scope, categoryService, mediator) {
            mediator.$on('categories:loaded', function () {
                init();
            });

            function init() {
                $scope.categories = categoryService.categories;
            }
        }]);
