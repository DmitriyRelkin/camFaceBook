angular
.module('starter', [
  'ionic',
  // 'starter.directive',
  // 'starter.service',
  'starter.controllers',
  'ngCordova',
  'ngCordovaOauth'
]);

angular
.module('starter')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

angular
.module('starter')
.config(config);
function config($stateProvider, $urlRouterProvider) {
  $stateProvider
  /*LoginPage*/
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'vm'
  })
  /*TabsTemplate*/
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controllerAs: 'vm'
  })
  /*Tab-Camera*/
  .state('tab.camera', {
    url: '/camera',
    views: {
      'tab-camera': {
        templateUrl: 'templates/tab-camera.html',
        controller: 'CameraCtrl',
        controllerAs: 'vm'
      }
    }
  })
  /*Tab-Profile*/
  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm'
      }
    }
  });
  $urlRouterProvider.otherwise('/login');
};
