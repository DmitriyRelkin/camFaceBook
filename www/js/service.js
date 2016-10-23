angular
.module('starter.service', []);

angular
.module('starter.service')
.factory('MyService', MyService);
MyService.$inject = ['$http'];
function MyService($http) {
  this.uploadFileToUrl = function(file, title, text, uploadUrl){
    var payload = new FormData();

    payload.append("title", title);
    fd.append('text', text);
    fd.append('file', file);

    return $http({
      url: uploadUrl,
      method: 'POST',
      data: payload,
      //assign content-type as undefined, the browser
      //will assign the correct boundary for us
      headers: { 'Content-Type': undefined},
      //prevents serializing payload.  don't do it.
      transformRequest: angular.identity
    });
  }
}
