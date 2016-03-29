(function () {
    'use strict';
    angular
        .module('app')
        .directive('compareTo', function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    comparable: '=compareTo'
                },
                link: function (scope, el, attr, ngModel) {
                    ngModel.$validators.compareTo = function (modelValue) {
                        var result = modelValue === scope.comparable;
                        scope.$parent.$broadcast('validation-checker-check');
                        return result;
                    };

                    scope.$watch('comparable', function () {
                        ngModel.$validate();
                    });

                }
            };
        });
})();