module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Trucks", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    numberplate: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    associationId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Associations",
        key: "id",
        as: "associationId",
      },
    },
    driverId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "Drivers",
        key: "id",
        as: "driverId",
      },
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

  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Trucks")
}
