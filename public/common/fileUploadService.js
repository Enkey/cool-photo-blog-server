(function () {
    'use strict';

    angular
        .module('app')
        .service('fileUploadService', ['$http', '$q', function ($http, $q) {
            this.uploadFileToUrl = function (file, uploadUrl) {
                var fd = new FormData();

                fd.append('image', file);

                return $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                }).then(function (response) {

                    if (response.data.success === true) {
                        return response.data;
                    }
                    else {
                        return $q.reject(response.data);
                    }

                });
            }
        }]);


})();