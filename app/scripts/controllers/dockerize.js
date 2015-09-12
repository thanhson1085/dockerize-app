'use strict';
/**
 * @ngdoc function
 * @name DockerizeApp.controller:DockerizeCtrl
 * @description
 * # UserCtrl
 * Controller of the DockerizeApp
 */
angular.module('DockerizeApp')
    .controller('GithubCtrl', function($scope, APP_CONFIG, $location, Github, $cookies) {
        //get query param
        var parseLocation = function(location) {
            var pairs = location.substring(1).split('&');
            var obj = {};
            var pair;
            var i;

            for ( i in pairs ) {
                if ( pairs[i] === '' ) continue;

                pair = pairs[i].split('=');
                obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
            }

            return obj;
        };
        $scope.dockerize = true
        var githubCode = parseLocation(window.location.search)['code'];

        var access_token = $cookies.get('github_access_token');

        if (githubCode && !access_token){
            Github.getAccessToken(githubCode).then(function(data){
                var access_token = data.access_token;
                $cookies.put('github_access_token', access_token);
                Github.getRepos(access_token).then(function(data){
                    $scope.repos = data;
                });
            });
        } else {
            Github.getRepos(access_token).then(function(data){
                $scope.repos = data;
            });
        }
        
    })
    .controller('DockerizeCtrl', function($scope, APP_CONFIG, $location) {
        $scope.dockerize = true

        $scope.connectGithub = function(){
            var url = 'https://github.com/login/oauth/authorize?scope=repo&client_id=' + 
                    APP_CONFIG.github.client_id + '&redirect_url=' + APP_CONFIG.github.redirect_uri;
            window.location.replace(url);
        };

    });
