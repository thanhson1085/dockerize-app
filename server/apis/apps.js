'use strict';
var express = require('express'), 
    router = express.Router(), 
    db = require('../models');

// new app
router.post('/create', function(req, res){
    db.App.create({
        UserId: req.body.userId,
        appName: req.body.appName,
        deployUrl: req.body.deployUrl,
        gitUrl: req.body.gitUrl,
        htmlUrl: req.body.htmlUrl,
        dockerFile: req.body.dockerFile,
        dockerCompose: req.body.dockerCompose
    }).then(function(app){
        res.send(JSON.stringify(app));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });

});

// list app
router.get('/list/:UserId/:page/:limit', function(req, res){
    var limit = (req.params.limit)? req.params.limit: 10;
    var offset = (req.params.page)? limit * (req.params.page - 1): 0;
    var UserId = req.params.UserId;
    db.App.findAndCountAll({
        include: [],
        where:{
            UserId: UserId
        },
        limit: limit,
        offset: offset

    }).then(function(apps) {
        res.send(JSON.stringify(apps));
    });
});

// app detail
router.get('/view/:id', function(req, res){
    db.App.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(app){
        res.send(JSON.stringify(app));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// deploy app
router.get('/deploy/:id', function(req, res){
    db.App.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(app){
        var q = require('../queues');
        q.create('deploy', app).priority('high').save();
        res.send(JSON.stringify());
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});
// get app by app name
router.get('/getByAppName', function(req, res){
    db.App.findOne({
        where: {
            appName: req.query.appName
        }
    }).then(function(app){
        res.send(JSON.stringify(app));
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

// update app
router.put('/update/:id', function(req, res){
    db.App.find({ 
        where: {
            id: req.params.id
        } 
    }).then(function(app) {
        if (app) {
            app.updateAttributes({
                deployUrl: req.body.deployUrl,
                gitUrl: req.body.gitUrl,
                htmlUrl: req.body.htmlUrl,
                dockerFile: req.body.dockerFile,
                dockerCompose: req.body.dockerCompose,
                awsAccessKeyId: req.body.awsAccessKeyId,
                awsSecretAccessKey: req.body.awsSecretAccessKey,
                awsVpcId: req.body.awsVpcId
            }).then(function() {
                res.send(JSON.stringify(app));
            });
        }
    }).catch(function(e){
        res.status(500).send(JSON.stringify(e));
    });
});

module.exports = router;
