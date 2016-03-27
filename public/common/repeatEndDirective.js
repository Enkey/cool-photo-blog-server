(function () {
    'use strict';

    angular
        .module('app')
        .directive("repeatEnd", function () {
            return {
                restrict: "A",
                link: function (scope, element, attrs) {
                    if (scope.$last) {
                        scope.$eval(attrs.repeatEnd);

                    }
                }
            };
        });
})();