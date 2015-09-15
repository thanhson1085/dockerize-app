'use strict';
var Tail = require('tail').Tail;
var config = require('config');
var path = require('path');
module.exports = function(ws) {
    ws.on('message', function(msg) {
        var logFile = path.join(config.get('logs'), msg + '.log');
        try{
            var tail = new Tail(logFile);
            tail.on('line', function(data) {
                    ws.send(data + '\n');
            });
        } catch(e){
            console.log(e);
        }
    });
};
