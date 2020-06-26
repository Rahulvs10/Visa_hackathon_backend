module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Driver", {
    email: DataTypes.STRING,
  })
}
