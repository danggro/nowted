import type { Migration } from '..'
import { DataTypes } from 'sequelize'

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('folders', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
  })
  await sequelize.getQueryInterface().addColumn('folders', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  })
  await sequelize.getQueryInterface().addColumn('notes', 'folder_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'folders', key: 'id' },
  })
}

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('folders')
  await sequelize.getQueryInterface().removeColumn('folders', 'user_id')
  await sequelize.getQueryInterface().removeColumn('notes', 'folder_id')
}
