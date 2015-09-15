'use strict';
/**
 * @ngdoc function
 * @name DockerizeApp.controller:AppCtrl
 * @description
 * # UserCtrl
 * Controller of the DockerizeApp
 */
angular.module('DockerizeApp')
.controller('ViewAppCtrl', function($scope, $stateParams, Apps, $location) {
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
    $scope.deploy = function(){
        Apps.deploy($stateParams.id).then(function(){
            $location.path('/dashboard/app/deploy/' + $stateParams.id);
        });
    };
    $scope.forUnitTest = true;
})
.controller('DeployAppCtrl', function($scope, $stateParams, Apps, Websocket) {
    $scope.logData = Websocket.logs($stateParams.id).collection;
    $scope.forUnitTest = true;
});
