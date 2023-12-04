import styled from 'styled-components'
import HeaderNotePage from './HeaderNotePage'
import ListNote from './ListNote'
import { useEffect, useState } from 'react'
import { NoteType, Session } from '../../types/types'
import axios from 'axios'
import * as palette from '../../assets/Variables'
import NoteView from './NoteView'
import { useNavigate } from 'react-router'
import { useAppSelector } from '../../hooks/hooks'
import auth from '../../services/auth'

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
  const [notes, setNotes] = useState<NoteType[]>([])
  const navigate = useNavigate()

  const sessionLocal = window.localStorage.getItem('loggedUser')

  useEffect(() => {
    if (!sessionLocal) return navigate('/login')
    const getSessionDb = async () => {
      const data = await auth.getSession(JSON.parse(sessionLocal).username)

      if (!data[0]) {
        window.localStorage.clear()
        return navigate('/login')
      }
    }
    getSessionDb()

    const getData = async () => {
      const { data } = await axios.get('http://localhost:3001/api/notes')
      setNotes(data)
    }
    getData()
  }, [])

  if (!sessionLocal) return null

  return (
    <Container>
      <Navigate>
        <HeaderNotePage />
        <ListNote data={notes} />
      </Navigate>
      <Content>
        <NoteView note={null} />
      </Content>
    </Container>
  )
}
export default NotePage
