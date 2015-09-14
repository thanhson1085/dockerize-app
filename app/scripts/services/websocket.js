'use strict';
angular.module('DockerizeApp').factory('Websocket', function($websocket) {
    // Open a WebSocket connection
    var dataStream = $websocket('ws://192.168.1.191:3001/');

    var collection = [];

    dataStream.onMessage(function(message) {
        console.log(message);
        collection.push(JSON.parse(message.data));
    });
    dataStream.onOpen(function(message) {
        console.log(message);
    });

    var methods = {
        collection: collection,
        get: function() {
            dataStream.send(JSON.stringify({ action: 'get' }));
        }
    };

    return methods;
})
