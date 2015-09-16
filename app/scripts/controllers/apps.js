'use strict';
/**
 * @ngdoc function
 * @name DockerizeApp.controller:AppCtrl
 * @description
 * # UserCtrl
 * Controller of the DockerizeApp
 */
angular.module('DockerizeApp')
.controller('ViewAppCtrl', function($scope, $stateParams, Apps, $location, Deploys) {
    Apps.get($stateParams.id).then(function(data){
        $scope.app = data;
    });

    $scope.updateApp = function(){
        var appData = $scope.app;
        Apps.update(appData).then(function(data){
            console.log(data);
            $scope.update_message = 'Updated successfully!';
        });
    };
    $scope.deploy = function(){
        Apps.deploy($stateParams.id).then(function(){
            var data = $scope.app;
            data.appId = $scope.app.id;
            data.deployStatus = 'RUNNING';
            delete data.id;
            Deploys.create(data).then(function(){
                $location.path('/dashboard/app/deploy/' + $stateParams.id);
            });
        });
    };
    $scope.forUnitTest = true;
})
.controller('DeployAppCtrl', function($scope, $stateParams, Apps, Websocket) {
    $scope.logData = Websocket.logs($stateParams.id).collection;
    $scope.forUnitTest = true;
})
.controller('DeploysAppCtrl', function($scope, $stateParams, Deploys) {
    Deploys.list($stateParams.id, 1, 10).then(function(data){
        console.log(data);
        $scope.deploys = data.rows;
    });
    $scope.forUnitTest = true;
})
.controller('MonitorAppCtrl', function($scope, $stateParams) {
    $scope.forUnitTest = true;
})
.controller('LogsAppCtrl', function($scope, $stateParams) {
    $scope.forUnitTest = true;
});
