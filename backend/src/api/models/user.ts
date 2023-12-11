import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../../config/db'
import { UserForm, User as UserType } from '../../types/types'

class User extends Model<UserType, UserForm> {
  declare id: number
  declare username: string
  declare email: string
  declare passwordHash: string
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user',
  }
)

export default User
