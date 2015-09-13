'use strict';
module.exports = function(sequelize, DataTypes){
    var App = sequelize.define('App', {
        appName: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        deployUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        awsAccessKeyId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        awsSecretAccessKey: {
            type: DataTypes.STRING,
            allowNull: true
        },
        awsVpsId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        htmlUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gitUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dockerFile: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },
        dockerCompose: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                App.belongsTo(models.User, {
                    onDelete: 'CASCADE',
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });

    return App;
};
