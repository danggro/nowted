import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../'

class Folder extends Model {
  declare id: number
  declare name: string
  declare userId: number
}

Folder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'folder',
  }
)

export default Folder
