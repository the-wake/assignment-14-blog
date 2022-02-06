const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const formatDate = require('../utils/helpers.js');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
