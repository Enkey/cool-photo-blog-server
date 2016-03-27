(function () {
    'use strict';

    angular
        .module('app')
        .service('authService', authService);

    authService.$inject = ['$http', '$q', '$rootScope'];
    function authService($http, $q, $rootScope) {

        this.register = register;
        this.login = login;
        this.logout = logout;
        this.checkCurrentUser = checkCurrentUser;


        function register(credentials) {

            return $http
                .post('auth/signup', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(function (res) {

                    if (res.data.success === true) {

                        setCurrentUser(res.data);
                        return res.data;
                    }
                    return $q.reject(res.data);
                });
        }

        function login(credentials) {

            return $http
                .post('auth/signin', {
                    username: credentials.username,
                    password: credentials.password
                })
                .then(function (res) {
                    console.log(res.data);
                    if (res.data.success === true) {
                        setCurrentUser(res.data);
                        return res.data;
                    }
                    return $q.reject(res.data);
                });

        }

        function logout() {

            return $http
                .get('auth/logout')
                .then(function (res) {
                    if (res.data.success === true) {
                        clear();
                    }
                });
        }

        function checkCurrentUser() {

            return $http
                .get('auth/is-authenticated')
                .then(function (res) {
                    if (res.data.isAuthenticated === true) {
                        setCurrentUser(res.data);
                        return res.data;
                    }
                    else {
                        clear();
                        return $q.reject(res.data);
                    }
                });
        }

        //private
        function setCurrentUser (data) {

            if (!$rootScope.globals) {
                $rootScope.globals = {};
            }

            $rootScope.globals.isAuthenticated = true;
            $rootScope.globals.user = data.user


            if (!data.user.avatar) {
                $rootScope.globals.user.avatar = "images/alien.png";
            }
            $rootScope.$broadcast('globals:changed');

        }

        //private
        function clear() {
            if ($rootScope.globals) {
                $rootScope.globals.user = null;
                $rootScope.globals.isAuthenticated = false;
            }
        }

    }
})();