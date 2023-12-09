import styled from 'styled-components'
import HeaderNotePage from './HeaderNotePage'
import ListNote from './ListNote'
import { useContext, useEffect } from 'react'
import * as palette from 'assets/Variables'
import NoteView from './NoteView'
import { useNavigate } from 'react-router'
import auth from 'services/auth'
import { NotesContext } from 'context/NotesContext'
import { getLocalSession } from 'utils/utils'
import NoteContextProvider from 'context/NoteContext'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${palette.BLACK};
  color: ${palette.WHITE};
  display: flex;
  position: relative;
`

const Navigate = styled.div`
  width: 350px;
  flex-shrink: 0;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 0.015);
  &::-webkit-scrollbar {
    display: none;
  }
`

const Content = styled.div`
  width: 100%;
`
const NotePage = () => {
  const { notes, getInitialNotes } = useContext(NotesContext)
  const navigate = useNavigate()
  const sessionLocal = getLocalSession()
  useEffect(() => {
    if (!sessionLocal) return navigate('/login')
    const getSessionDb = async () => {
      const data = await auth.getSession(sessionLocal.username)

      if (!data[0]) {
        window.localStorage.clear()
        return navigate('/login')
      }
    }
    getSessionDb()
    getInitialNotes(sessionLocal.token)
  }, [])

  if (!sessionLocal || !notes) return null

  return (
    <NoteContextProvider>
      <Container>
        <Navigate>
          <HeaderNotePage />
          <ListNote data={notes} />
        </Navigate>
        <Content>
          <NoteView />
        </Content>
      </Container>
    </NoteContextProvider>
  )
}
export default NotePage
