import { Model, DataTypes } from 'sequelize'
import { sequelize } from '..'
import { UserForm, User as UserType } from '../../types'

class User extends Model<UserType, UserForm> {
  declare id: number
  declare username: string
  declare email: string
  declare password: string
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
      unique: {
        name: 'username',
        msg: 'Username not available',
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        name: 'email',
        msg: 'Email not available',
      },
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty',
        },
      },
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
