angular.module('starter.controllers', [])

.controller('CameraCtrl', function($scope, $cordovaCamera) {

  $scope.takePhoto = function () {
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
          $scope.imgURI = "data:image/jpeg;base64," + imageData;
      }, function (err) {
          // An error occured. Show a message to the user
      });
  }

  $scope.choosePhoto = function () {
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
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function (err) {
        // An error occured. Show a message to the user
    });
  }
})
.controller("SocialCtrl", function($scope, $cordovaOauth, $location, $window) {

    $scope.login = function() {
        $cordovaOauth.facebook("321686544890415", ["email", "user_website", "user_location", "user_relationships"]).then(function(result) {
          $window.localStorage.setItem.accessToken = result.access_token;
          $location.path("/profile");
        }, function(error) {
          alert("There was a problem signing in!");
          console.log(error);
        });
    };

})
//
// .controller("ProfileCtrl", function($scope, $http, $location) {
//
//     $scope.init = function() {
//         if(window.localStorage.hasOwnProperty("accessToken") === true) {
//             $http.get("https://graph.facebook.com/v2.2/me", { params: { access_token: window.localStorage.accessToken, fields: "id,name,gender,location,website,picture,relationship_status", format: "json" }}).then(function(result) {
//                 $scope.profileData = result.data;
//             }, function(error) {
//                 alert("There was a problem getting your profile.  Check the logs for details.");
//                 console.log(error);
//             });
//         } else {
//             alert("Not signed in");
//             $location.path("/login");
//         }
//     };
//
// })
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
