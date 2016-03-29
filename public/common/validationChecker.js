(function () {
    'use strict';

    angular
        .module('app')
        .directive('validationChecker', showErrors);

    showErrors.$inject = ['$timeout'];

    function showErrors($timeout) {
        return {
            restrict: 'A',
            require: '^form',
            link: function (scope, el, attrs, formCtrl) {
                var inputEl = el[0].querySelector('[name]');
                var inputNgEl = angular.element(inputEl);
                var inputName = inputNgEl.attr('name');

                inputNgEl.bind('blur', function () {
                    toggleClass();
                });

                inputNgEl.bind('focus', function () {
                    removeClass();
                });


                scope.$on('validation-checker-check', function () {
                    toggleClass();
                });

                scope.$on('validation-checker-reset', function () {
                    $timeout(function () {
                        removeClass();
                    }, 0, false); // 3-rd invoke apply, default: true
                });

                function toggleClass() {
                    $timeout(function () {
                        el.toggleClass('has-error', formCtrl[inputName].$invalid && formCtrl[inputName].$touched);
                        el.toggleClass('has-success', formCtrl[inputName].$valid && formCtrl[inputName].$touched);
                    }, 0, false);
                }

                function removeClass() {
                    el.removeClass('has-error');
                    el.removeClass('has-success');
                }

            }
        }
    }

})();