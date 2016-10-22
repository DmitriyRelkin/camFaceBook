angular
.module('starter.controllers', []);

angular
.module('starter.controllers')
.controller('CameraCtrl', CameraCtrl);
CameraCtrl.$inject = ['$scope', '$cordovaCamera']
function CameraCtrl($scope, $cordovaCamera) {

  var vm = this;

  vm.takePhoto = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
        vm.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
        // An error occured. Show a message to the user
    });
  }

  vm.choosePhoto = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
        vm.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
        // An error occured. Show a message to the user
    });
  }
}

angular
.module('starter.controllers')
.controller('SocialCtrl', SocialCtrl);
SocialCtrl.$inject = ['$scope', '$cordovaOauth', '$location', '$window']
function SocialCtrl($scope, $cordovaOauth, $location, $window) {

  var vm = this;

  vm.login = function() {
    $cordovaOauth.facebook("321686544890415", [
      "email",
      "user_website",
      "user_location",
      "user_relationships"]).then(function(result) {
      $window.localStorage.setItem('accessToken', JSON.stringify(result.access_token));
      $location.path("/tab/profile");
      console.log( JSON.parse($window.localStorage.getItem('accessToken')));
    }, function(error) {
      alert("There was a problem signing in!");
      console.log(error);
    });
  };
}

angular
.module('starter.controllers')
.controller('ProfileCtrl', ProfileCtrl);
ProfileCtrl.$inject = ['$scope', '$location', '$window', '$http']
function ProfileCtrl($scope, $location, $window, $http) {
  var vm = this;

  vm.init = function() {
    return $http.get('https://graph.facebook.com/v2.2/me', {
      params: {
        access_token: JSON.parse($window.localStorage.getItem('accessToken')),
        fields: 'id,name,gender,location,website,picture,email',
        format: 'json'
      }
    }).then(function (result) {
      console.log(result);
      vm.profileData = result.data;
    }).catch(function (error) {
      alert('There was a problem getting your profile.  Check the logs for details.');
      console.log(error);
    });
  }


}

// // .controller("FeedCtrl", function($scope, $http, $location) {
// //
// //     $scope.init = function() {
// //         if(window.localStorage.hasOwnProperty("accessToken") === true) {
// //             $http.get("https://graph.facebook.com/v2.2/me/feed", { params: { access_token: window.localStorage.accessToken, format: "json" }}).then(function(result) {
// //                 $scope.feedData = result.data.data;
// //                 $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: window.localStorage.accessToken, fields: "picture", format: "json" }}).then(function(result) {
// //                     $scope.feedData.myPicture = result.data.picture.data.url;
// //                 });
// //             }, function(error) {
// //                 alert("There was a problem getting your profile.  Check the logs for details.");
// //                 console.log(error);
// //             });
// //         } else {
// //             alert("Not signed in");
// //             $location.path("/login");
// //         }
// //     };
// //
// // });
