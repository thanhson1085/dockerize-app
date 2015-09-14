'use strict';
/**
 * @ngdoc function
 * @name DockerizeApp.controller:AppCtrl
 * @description
 * # UserCtrl
 * Controller of the DockerizeApp
 */
angular.module('DockerizeApp')
.controller('ViewAppCtrl', function($scope, $stateParams, Apps) {
    Apps.get($stateParams.id).then(function(data){
        $scope.app = data;
    });

    $scope.updateApp = function(){
        var appData = {
            id: $scope.app.id,
        };
        Apps.update(appData).then(function(){
            $scope.update_message = 'Updated successfully!';
        });
    };
    $scope.forUnitTest = true;
})
.controller('DeployAppCtrl', function($scope, $stateParams, Apps, Websocket) {
    Apps.get($stateParams.id).then(function(data){
        $scope.app = data;
    });

    $scope.logData = Websocket;

    $scope.forUnitTest = true;
});
