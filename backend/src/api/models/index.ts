import Note from './note'
import User from './user'

User.hasMany(Note)
Note.belongsTo(User)

export { Note, User }
