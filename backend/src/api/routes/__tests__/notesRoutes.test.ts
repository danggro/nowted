import supertest from 'supertest'
import app from '../../../app'
import {
  addNote,
  addUser,
  getNotes,
  login,
  newNoteObject,
  updateNotes,
} from '../../../utils/test-helper'
import { Note, User } from '../../../db/models'
import { clientRedis } from '../../../config/redis'
import { getDefaultDate } from '../../../utils/utils'
const api = supertest(app)

describe('Notes', () => {
  let token: string

  beforeEach(async () => {
    await Note.destroy({ where: {} })
    await User.destroy({ where: {} })
    await addUser()
    clientRedis.connect()
    const resLogin = await login()
    token = resLogin.token
  })
  afterEach(async () => {
    await clientRedis.quit()
  })
  describe('create', () => {
    it('will success if input valid and have session', async () => {
      const newNote = await addNote(token)
      const notes = await getNotes(token)

      expect(newNote.title).toEqual(notes[0].title)
      expect(newNote.date).toEqual(notes[0].date)
      expect(newNote.content).toEqual(notes[0].content)
    })
    it('will success if input date empty and will fill with date now', async () => {
      const newNote = await addNote(token, { ...newNoteObject, date: '' })
      const notes = await getNotes(token)

      expect(newNote.date).toEqual(notes[0].date)
      expect(newNote.date).toEqual(getDefaultDate())
    })
    it('will fails if input title empty', async () => {
      await api
        .post('/api/notes/')
        .send({
          title: '',
          date: newNoteObject.date,
          content: newNoteObject.content,
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
    it('will fails if input date not valid', async () => {
      await api
        .post('/api/notes/')
        .send({
          title: newNoteObject.title,
          date: '31/40/2025',
          content: newNoteObject.content,
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })

  it('should return notes as json according to userId', async () => {
    const notes = await getNotes(token)
    expect(notes.length).toBeGreaterThanOrEqual(0)
  })
  describe('update', () => {
    let newNote: supertest.Response['body']
    beforeEach(async () => {
      newNote = await addNote(token)
    })
    it('will success if input valid and according to request body', async () => {
      const noteObject = {
        title: 'This is updated title',
        date: '01/01/2023',
        content: 'This is updated content',
      }
      const noteBeforeUpdate = await getNotes(token)
      const updatedNote = await updateNotes(token, noteObject, newNote.id)
      const noteAfterUpdate = await getNotes(token)
      expect(noteBeforeUpdate[0]).not.toEqual(noteAfterUpdate[0])
      expect(updatedNote).toEqual(noteAfterUpdate[0])
    })
    it('will fails if input title empty', async () => {
      await api
        .put(`/api/notes/${newNote.id}`)
        .send({
          title: '',
          date: newNoteObject.date,
          content: newNoteObject.content,
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
    it('will fails if input date not valid', async () => {
      await api
        .put(`/api/notes/${newNote.id}`)
        .send({
          title: newNoteObject.title,
          date: '31/40/2025',
          content: newNoteObject.content,
        })
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
    })
  })
  describe('delete', () => {
    let newNote: supertest.Response['body']

    beforeEach(async () => {
      newNote = await addNote(token)
    })
    it('will success if id match with note in database', async () => {
      await api
        .delete(`/api/notes/${newNote.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
    })
    it('will fails if id not match with note in database', async () => {
      await api
        .delete(`/api/notes/${0}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(404)
    })
  })
})
