module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Drivers", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phno: {
      allowNull: false,
      unique: true,
      type: Sequelize.BIGINT,
    },
    associationId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Associations",
        key: "id",
        as: "associationId",
      },
    },
    cardno: {
      type: Sequelize.BIGINT
    },
    otp: {
      type: Sequelize.INTEGER
    },
    token: {
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Drivers")
}
