angular
.module('starter.directive', []);

angular
.module('starter.directive')
.directive("fileModel",['$parse', function ($parse) {
  return {
    restrict: 'A',
    link: link
  };
  function link(scope, element, attrs) {
    var model = $parse(attrs.fileModel);
    var modelSetter = model.assign;

    element.bind('change', function(){
      scope.$apply(function(){
        modelSetter(scope, element[0].files[0]);
      });
    });
  }
}]);
