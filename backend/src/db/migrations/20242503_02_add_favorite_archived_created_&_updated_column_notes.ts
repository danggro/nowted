import type { Migration } from '..'
import { DataTypes } from 'sequelize'

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().addColumn('notes', 'favorite', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  await sequelize.getQueryInterface().addColumn('notes', 'archived', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  await sequelize.getQueryInterface().addColumn('notes', 'created_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
  await sequelize.getQueryInterface().addColumn('notes', 'updated_at', {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
}

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().removeColumn('notes', 'favorite')
  await sequelize.getQueryInterface().removeColumn('notes', 'archived')
  await sequelize.getQueryInterface().removeColumn('notes', 'created_at')
  await sequelize.getQueryInterface().removeColumn('notes', 'updated_at')
}
