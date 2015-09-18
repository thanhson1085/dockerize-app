'use strict';
var config = require('config');
var fs = require('fs');
var db = require('../models');
var consumer = {};

consumer.name = 'deployNextStep';

consumer.task = function(job, done){
    var data = job.data;
    var spawn = require('child_process').spawn;
    var exec = require('child_process').exec;
    var path = require('path');

    var logStream = fs.createWriteStream(data.logFile, {flags: 'a'});

    // clone new source code
    var child = spawn(data.cmd, data.params, data.env);

    child.on('exit', function(){
        db.Deploy.find({
            where: {
                id: data.id
            }
        }).then(function(deploy) {
            if (deploy) {
                deploy.updateAttributes({
                    deployStatus: 'FINISH'
                }).then(function(){
                    logStream.write('FINISH!!!');
                });
            }
        });
    });

    // save log to file
    child.stdout.pipe(logStream);
    child.stderr.pipe(logStream);

    done();
};

module.exports = consumer;
