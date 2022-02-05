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
    // hooks: {
    //   beforeCreate: (newPost) => {
    //     newPost.
    //   },
    // //   beforeCreate: async (dateTime) => {
    // //     dateTime.createdAt = await formatDate(dateTime.createdAt);
    // //     return dateTime;
    // //   },
    // },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;
