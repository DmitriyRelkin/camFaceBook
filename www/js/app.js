angular
.module('starter', [
  'ionic',
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
  $urlRouterProvider.otherwise('/tab/camera');
  $stateProvider
  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controllerAs: 'vm'
  })
  // Each tab has its own nav history stack:
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

  .state('tab.social', {
    url: '/social',
    views: {
      'tab-social': {
        templateUrl: 'templates/tab-social.html',
        controller: 'SocialCtrl',
        controllerAs: 'vm'
      }
    }
  })

  .state('tab.profile', {
    url: '/profile',
    views: {
      'tab-profile': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'vm'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
};
