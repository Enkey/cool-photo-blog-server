angular.module('app')
    .controller('chatCtrl', ['$scope', 'chatService', 'locationService', 'userService', 'mediator', 'socket',
    function ($scope, chatService, locationService, userService, mediator, socket) {

        if (!userService.isAuthenticated) {
            locationService.changeLocation('#/chat', '#/signin');
        }

        mediator.$on('data:changed', function () {
            if (userService.user) {
                locationService.restoreLocation();
            }
        });

        $scope.getMessageClass = function (message) {
            var className =  'chat-message';


            if(message.user && message.user.username == $scope.currentUser.username) {
                className += ' chat-message-out'
            } else if(message.system === true) {
                className += ' chat-message-system'
            } else {
                className += ' chat-message-in';
            }

            console.log('getClassName',message, className);
            return className;
        };

        socket.emit('init');

        socket.on('init', function (data) {
            $scope.currentUser = data.currentUser;
            $scope.users = data.users;
            console.log('init', data);
        });

        socket.on('send:message', function (message) {
            $scope.messages.push(message);
        });

        socket.on('user:join', function (data) {
            console.log('user:join', data);
            $scope.messages.push({
                system: true,
                text: 'User ' + data.username + ' has joined.'
            });
            $scope.users.push(data);
        });

        // add a message to the conversation when a user disconnects or leaves the room
        socket.on('user:left', function (data) {
            console.log('user:left', data);
            $scope.messages.push({
                system: true,
                text: 'User ' + data.username + ' has left.'
            });
            var i, user;
            for (i = 0; i < $scope.users.length; i++) {
                user = $scope.users[i].username;
                if (user === data.username) {
                    $scope.users.splice(i, 1);
                    break;
                }
            }
        });

        $scope.messages = [];

        $scope.sendMessage = function () {
            socket.emit('send:message', {
                message: $scope.message
            });

            // add the message to our model locally
            $scope.messages.push({
                user: $scope.currentUser,
                text: $scope.message
            });

            console.log($scope.message);
            console.log($scope.messages);

            // clear message box
            $scope.message = '';
        };

    }]);