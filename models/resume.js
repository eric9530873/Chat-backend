'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class resume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  resume.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    education: DataTypes.STRING,
    duringwork: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'resume',
    underscored: true,
  });
  return resume;
};