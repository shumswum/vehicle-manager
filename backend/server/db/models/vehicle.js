'use strict';
module.exports = (sequelize, DataTypes) => {
  var Vehicle = sequelize.define('Vehicle', {
    Make: DataTypes.STRING,
    Model: DataTypes.STRING,
    Year: DataTypes.INTEGER,
    Color: DataTypes.STRING,
    VehicleType: DataTypes.STRING,
    RetailPrice: DataTypes.DOUBLE,
    DeleteDate: DataTypes.DATE
  });

    Vehicle.associate = function(models) {
      
    }
  return Vehicle;
};