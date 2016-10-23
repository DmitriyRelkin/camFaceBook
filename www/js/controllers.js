angular
.module('starter.controllers', []);

angular
.module('starter.controllers')
.controller('CameraCtrl', CameraCtrl);
CameraCtrl.$inject = ['$scope', '$cordovaCamera', '$http', '$window']
function CameraCtrl($scope, $cordovaCamera, $http, $window) {

  var vm = this;
  vm.takePhoto = takePhoto;
  vm.choosePhoto = choosePhoto;
  vm.message = message;

  function takePhoto() {
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
    },function (err) {
        // An error occured. Show a message to the user
    });
  };

  function choosePhoto() {
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
  };

  function message() {
    return $http.post('https://graph.facebook.com/v2.2/me/feed', {
      // params: {
        message: "Test Message!!",
        access_token: $window.localStorage.getItem('accessToken'),
        // format: 'json'
      // }
    }).then(function (result) {
      console.log(result);
    });
  };
}

angular
.module('starter.controllers')
.controller('LoginCtrl', LoginCtrl);
LoginCtrl.$inject = ['$scope', '$cordovaOauth', '$location', '$window']
function LoginCtrl($scope, $cordovaOauth, $location, $window) {

  var vm = this;
  vm.login = login;
  vm.init = init;

  function init() {
    if ($window.localStorage.getItem('accessToken') != null) {
      $location.path("/tab/profile");
    } else {
      $location.path("/login");
    }
  };

  function login() {
    $cordovaOauth.facebook("321686544890415", [
      "email",
      "user_website",
      "user_location",
      "publish_actions",
      "user_about_me",
      "user_relationships"]).then(function(result) {
      $window.localStorage.setItem('accessToken', result.access_token);
      $location.path("/tab/profile");
      console.log($window.localStorage.getItem('accessToken'));
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
  vm.init = init;
  vm.exit = exit;
  // vm.profileData = {};

  function init() {
    return $http.get('https://graph.facebook.com/v2.2/me', {
      params: {
        access_token: $window.localStorage.getItem('accessToken'),
        fields: 'id,name,gender,location,website,picture,email',
        format: 'json'
      }
    }).then(function (result) {
      // console.log(result);
      vm.profileData = result.data;
    }).catch(function (error) {
      // alert('There was a problem getting your profile.  Check the logs for details.');
      console.log(error);
    });
  }
  function exit() {
    $window.localStorage.clear();
    vm.profileData = {};
    $location.path("/login");
  }

}

// angular
// .module('starter.controllers')
// .controller('homeCtrl', ProfileCtrl);
// homeCtrl.$inject = ['$scope', '$location', '$window', '$http']
// function homeCtrl($scope, $location, $window, $http) {}
