'use strict';

/* Directives */

angular.module('myApp.directives', [])
  .directive('appVersion', function (appname) {
    return function(scope, elm, attrs) {
      elm.text(appname);
    };
  })
  .directive('fastRepeat', function(){
      return{
          restrict: 'E',
          scope:{
              data: '='
          },
          link:function(scope, el, attrs){
              scope.$watch('data', function(newValue, oldValue){
                  React.renderComponent(
                      MYLIST({data:newValue}),
                      el[0]
                  );
              })
          }
      }
  });
