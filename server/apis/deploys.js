'use strict';
var express = require('express'), 
    router = express.Router(), 
    config = require('config'),
    db = require('../models');

// new deployments
router.post('/create', function(req, res){
    var path = require('path');
    var logFile = path.join(config.get('logs'), req.body.appId + '.log');
    db.Deploy.create({
        AppId: req.body.appId,
        deployStatus: req.body.deployStatus,
        logFile: logFile,
        deployUrl: req.body.deployUrl,
        gitUrl: req.body.gitUrl,
        htmlUrl: req.body.htmlUrl,
        dockerFile: req.body.dockerFile,
        dockerCompose: req.body.dockerCompose,
	awsAccessKeyId: req.body.awsAccessKeyId,
	awsSecretAccessKey: req.body.awsSecretAccessKey,
	awsVpcId: req.body.awsVpcId
    }).then(function(deploy){
        res.send(JSON.stringify(deploy));
    }).catch(function(e){
        console.log(e);
        res.status(500).send(JSON.stringify(e));
    });

});

// list deployments
router.get('/list/:AppId/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    var AppId = req.params.AppId;
    db.Deploy.findAndCountAll({
        include: [],
        where:{
            AppId: AppId
        },
        limit: limit,
        offset: offset

    }).then(function(deploys) {
        res.send(JSON.stringify(deploys));
    });
});

// deploy detail
router.get('/view/:id', function(req, res){
    db.Deploy.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(deploy){
        res.send(JSON.stringify(deploy));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update deploy
router.put('/update/:id', function(req, res){
    db.Deploy.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(app) {
        if (app) {
            app.updateAttributes({
                deployStatus: req.body.deployStatus
            }).then(function() {
                res.send(JSON.stringify(deploy));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

module.exports = router;
