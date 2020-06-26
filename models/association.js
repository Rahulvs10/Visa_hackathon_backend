module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Association", {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    phno:{
      allowNull: false,
      unique: true,
      type: DataTypes.BIGINT
    },
    password:{
      allowNull: false,
      type: DataTypes.STRING
    },
    token:{
      type: DataTypes.STRING
    }
  })
}
