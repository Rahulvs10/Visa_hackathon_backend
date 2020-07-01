module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Associations", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING
    },
    phno: {
      allowNull: false,
      unique: true,
      type: Sequelize.BIGINT,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    token: {
      type: Sequelize.STRING
    },
    cardno: {
      type: Sequelize.BIGINT
    },
    acquiringBin: {
      type: Sequelize.BIGINT
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
  down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Associations")
}
