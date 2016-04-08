angular.module('app').directive('onEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.onEnter);
                });

                event.preventDefault();
            }
        });
    };
});
angular.module('app')
    .directive('scrollBottom', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    //alert('last');
                    //setTimeout(function () {
                    //    var $messagesBox = $(element).closest('.messages-list');
                    //    //var $lastMessage = $messagesBox.find('.chat-message:last');
                    //    $messagesBox.scrollTop($($messagesBox).height());
                    //}, 1000);

                }
            }
        }
    });