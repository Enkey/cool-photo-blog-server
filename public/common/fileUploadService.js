angular.module('app')
    .service('fileUploadService', ['$http', function($http) {
       this.uploadFileToUrl = function (file, uploadUrl) {
           var fd = new FormData();

           fd.append('image', file)

           $http.post(uploadUrl, fd, {
               transformRequest: angular.identity,
               headers: {'Content-Type': undefined}
           }).then(function (response) {
               console.log(response);
           });
       }
    }]);