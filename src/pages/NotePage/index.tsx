import styled from 'styled-components'
import HeaderNotePage from './HeaderNotePage'
import ListNote from './ListNote'
import { useEffect, useState } from 'react'
import { NoteType, Session } from '../../types/types'
import * as palette from '../../assets/Variables'
import NoteView from './NoteView'
import { useNavigate } from 'react-router'
import auth from '../../services/auth'
import notes from '../../services/notes'

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
  const [notesData, setNotesData] = useState<NoteType[]>([])
  const navigate = useNavigate()

  const sessionLocal = window.localStorage.getItem('loggedUser')

  useEffect(() => {
    if (!sessionLocal) return navigate('/login')
    const parseSession = JSON.parse(sessionLocal)
    const getSessionDb = async () => {
      const data = await auth.getSession(parseSession.username)

      if (!data[0]) {
        window.localStorage.clear()
        return navigate('/login')
      }
    }
    getSessionDb()

    const getData = async () => {
      const { data } = await notes.get(parseSession.token)
      console.log(parseSession)

      setNotesData(data)
    }
    getData()
  }, [])

  if (!sessionLocal) return null

  return (
    <Container>
      <Navigate>
        <HeaderNotePage />
        <ListNote data={notesData} />
      </Navigate>
      <Content>
        <NoteView note={null} />
      </Content>
    </Container>
  )
}
export default NotePage
