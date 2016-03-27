(function () {
    'use strict';

    angular
        .module('app')
        .service('userService', userService);

    userService.$inject = ['$http', '$q', '$rootScope']
    function userService($http, $q, $rootScope) {

        this.setAvatar = setAvatar;

        function setAvatar(avatar_id) {

            return $http
                .post('users/save', {
                    avatar_id: avatar_id
                })
                .then(function (res) {
                    if (res.data.success === true) {
                        $rootScope.globals.user = res.data.user;
                        return res.data;
                    }
                    else {
                        return $q.reject(res.data);
                    }
                });
        }

    }


})();
