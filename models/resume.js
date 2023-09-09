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
      resume.belongsTo(models.User, { foreignKey: 'userId' })
      resume.belongsToMany(models.company, {
        through: models.record,
        foreignKey: 'resumeId',
        as: 'Jobsearchrecord'
      })
    }
  }
  resume.init({
    name: DataTypes.STRING,
    tel: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    education: DataTypes.STRING,
    image: DataTypes.STRING,
    resumeName: DataTypes.STRING,
    userId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'resume',
    tableName: 'resumes',
    underscored: true
  });
  return resume;
};