'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    FirstName: DataTypes.STRING,
    LastName: DataTypes.STRING,
    EmailAddress: DataTypes.STRING,
    Telephone: DataTypes.STRING,
    DateOfBirth: DataTypes.DATE,
    DeleteDate: DataTypes.DATE
  });

    Customer.associate = function(models) {
      
    }
  return Customer;
};