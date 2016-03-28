angular.module('app').service('chatService',['$http', '$q', function($http, $q) {

    this.getMessages = getMessages;

    function getMessages() {
        return $http
            .get('messages/')
            .then(function (res) {
                if (res.data.success === true) {
                    return res.data;
                }
                else {
                    return $q.reject(res.data);
                }
            });
    }

}]);
angular.module('app').factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});