import styled from 'styled-components'
import { useEffect } from 'react'
import * as palette from 'assets/Variables'
import { useNavigate } from 'react-router'
import { getLocalSession } from 'utils/utils'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { initializeAuth } from 'redux/actions/authActions'
import { setInitialNotesAction } from 'redux/actions/noteActions'
import HeaderNotePage from 'components/note/header/HeaderNotePage'
import ListNote from 'components/note/list/ListNote'
import NoteView from 'components/note/view/NoteView'
import ListFolder from 'components/note/list/ListFolder'
import { setInitialFolderAction } from 'redux/actions/folderActions'

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${palette.BLACK};
  color: ${palette.WHITE};
  display: flex;
  position: relative;
`

const Navigate = styled.div`
  width: clamp(250px, 24vw, 350px);
  flex-shrink: 0;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`

const Content = styled.div`
  width: 100%;
`
const NotePage = () => {
  const navigate = useNavigate()
  const sessionLocal = getLocalSession()

  const dispatch = useAppDispatch()
  const notes = useAppSelector((state) => state.note.notes)
  const folders = useAppSelector((state) => state.folder.folders)

  useEffect(() => {
    if (!sessionLocal) return navigate('/login')
    const getSessionDb = async () => {
      await dispatch(initializeAuth(navigate))
      await dispatch(setInitialNotesAction())
      await dispatch(setInitialFolderAction())
    }
    getSessionDb()
  }, [])

  if (!sessionLocal || !notes) return null

  return (
    <Container>
      <Navigate>
        <HeaderNotePage />
        <ListFolder data={folders} />
      </Navigate>
      <ListNote data={notes} />
      <Content>
        <NoteView />
      </Content>
    </Container>
  )
}
export default NotePage
