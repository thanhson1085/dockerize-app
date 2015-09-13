'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('DockerizeApp')
.directive('headerNotification',function(){
    return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
        replace: true,
        scope: {
        },
        controller: function($scope, Apps, $location) {
            Apps.list(1,10).then(function(data){
                if (data.rows.len === 0){
                    $location.path('/dockerize/start');
                }
                $scope.apps = data.rows;
            });
        }
    }
});


