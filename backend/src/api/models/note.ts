import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../../config/db'
import { checkDate } from '../../utils/utils'

class Note extends Model {
  declare id: number
  declare title: string
  declare date: string
  declare content: string
  declare userId: number
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
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 10],
        isDateFormat(value: string) {
          const check = checkDate(value)
          if (!check) throw Error('Format date invalid')
          return true
        },
      },
    },
    content: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'note',
  }
)

export default Note
