'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sale = sequelize.define('Sale', {
    SalePrice: DataTypes.DOUBLE,
    InvoiceDate: DataTypes.DATEONLY,
    PaymentReceivedDate: DataTypes.DATEONLY,
    DeleteDate: DataTypes.DATE
  });
      Sale.associate = function(models) {
        // associations can be defined here
        models.Sale.belongsTo(models.Vehicle, {foreignKey: 'vehicle_id'});
        models.Sale.belongsTo(models.Customer, {foreignKey: 'customer_id'});
      }
  return Sale;
};