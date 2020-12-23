'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      'comments',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'users',
            key: 'id',
          }
        },
        article_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          onDelete: 'CASCADE',
          references: {
            model: 'articles',
            key: 'id',
          }
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          onUpdate : Sequelize.NOW,
        },
      },
      {
        charset: 'utf8mb4',
      }
    ),

  down: (queryInterface) => queryInterface.dropTable('comments'),
};
