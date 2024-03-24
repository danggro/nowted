import Note from './note'
import User from './user'
import Folder from './folder'

User.hasMany(Note)
Note.belongsTo(User)

User.hasMany(Folder)
Folder.belongsTo(User)

Folder.hasMany(Note)
Note.belongsTo(Folder)

export { Note, User, Folder }
