module.exports = (sequelize, DataTypes) => {
  let Truck = sequelize.define("Truck", {
    title: DataTypes.STRING,
  })
  Truck.associate = function (models) {
    Truck.belongsTo(models.Association, {
      onDelete: "CASCADE",
      foreignKey: "id",
    })
  }
  return Truck
}
