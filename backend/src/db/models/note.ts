import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../'
import { checkDate } from '../../utils/utils'

class Note extends Model {
  declare id: number
  declare title: string
  declare date: string
  declare content: string
  declare userId: number
  declare folderId: number
  declare favorite: boolean
  declare archived: boolean
}

Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty',
        },
      },
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        isDateFormat(value: string) {
          const check = checkDate(value)
          if (!check) throw Error('Date not valid')
          return true
        },
      },
    },
    content: {
      type: DataTypes.STRING,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    archived: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'note',
  }
)

export default Note
