'use strict';
var config = require('config');
var fs = require('fs');
var consumer = {};

consumer.name = 'deploy';

consumer.task = function(job, done){
    var data = job.data;
    var spawn = require('child_process').spawn;
    var path = require('path');

    var dest = path.join(config.get('repositories'), data.App.appName);

    var child = spawn('git', [
      'clone', '--verbose', '--progress', data.gitUrl, dest
    ]);

    child.on('close', function (code) {
        // create docker file
        var dockerFile = path.join(dest, 'Dockerfile');
        fs.writeFile(dockerFile, data.dockerFile);

        // create docker compose
        var dockerCompose = path.join(dest, 'docker-compose.yml');
        fs.writeFile(dockerCompose, data.dockerCompose);

        // Run script
        var env = {
            DOCKER_MACHINE_NAME: data.App.appName.replace('/', '_'),
            DOCKER_BUILD_TAG: data.App.appName,
            DOCKER_BUILD_PATH: dest
        }
        var deploy = spawn(config.get('bash.deploy'), [], {env: env});

        // save log
        deploy.stdout.pipe(logStream);
        deploy.stderr.pipe(logStream);

    });

    // save log to file
    var logStream = fs.createWriteStream(data.logFile, {flags: 'a'});
    child.stdout.pipe(logStream);
    child.stderr.pipe(logStream);


    done();
};

module.exports = consumer;
