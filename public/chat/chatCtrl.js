angular.module('app')
    .controller('chatCtrl', ['$scope', 'chatService', 'userService', 'socket',
        function ($scope, chatService, userService, socket) {

            $scope.loadingMessages = true;

            $scope.showModalDialog = function () {
                $('#usersModalDialog').modal('show');
                $("body.modal-open").removeAttr("style");
            };

            chatService
                .getMessages()
                .then(function (data) {
                    console.log('getMessages', data);
                    $scope.loadingMessages = false;
                    initChat(data.messages);
                })
                .catch(function () {
                    $scope.loadingMessages = false;
                });


            var initChat = function (messages) {

                $scope.currentUser = null;
                $scope.users = [];

                socket.emit('init');

                socket.on('init', function (data) {
                    $scope.currentUser = data.currentUser;
                    $scope.users = data.users;
                    console.log('init', data);
                    initSockets(messages)
                });

            };

            var initSockets = function (messages) {
                $scope.messages = messages;

                $scope.sendMessage = function () {
                    socket.emit('send:message', {
                        message: $scope.message
                    });

                    // add the message to our model locally
                    $scope.messages.push({
                        user: $scope.currentUser,
                        text: $scope.message
                    });

                    // clear message box
                    $scope.message = '';
                };

                $scope.getMessageClass = function (message) {
                    var className = 'chat-message';


                    if (message.user && message.user.username == $scope.currentUser.username) {
                        className += ' chat-message-out'
                    } else if (message.system === true) {
                        className += ' chat-message-system chat-message-in'
                    } else {
                        className += ' chat-message-in';
                    }

                    return className;
                };


                socket.on('send:message', function (message) {
                    $scope.messages.push(message);
                });

                socket.on('user:join', function (data) {
                    console.log('user:join', data);
                    $scope.messages.push({
                        system: true,
                        text: 'User ' + data.username + ' has joined.'
                    });
                    if (data) {
                        $scope.users.push(data);
                    }
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
            };

        }]);