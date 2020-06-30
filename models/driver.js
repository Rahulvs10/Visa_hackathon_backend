module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Driver", {
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    associationId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    phno: {
      allowNull: false,
      unique: true,
      type: DataTypes.BIGINT
    },
    cardno: {
      allowNull: false,
      unique: true,
      type: DataTypes.BIGINT
    },
  })
}
