import styled from 'styled-components'
import SVGDelete from './SVG/SVGDelete'
import * as palette from '../../assets/Variables'
import { useContext } from 'react'
import { NoteContext } from '../../context/NoteContext'
import { NotesContext } from '../../context/NotesContext'
const Container = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  border-radius: 6px;
  position: absolute;
  right: 0;
  top: 50px;
  background-color: ${palette.BLACK_SECONDARY};
  z-index: 9999;
  & > div {
    display: flex;
    gap: 15px;
    cursor: pointer;
    width: 100%;
    padding: 15px;
    & > span {
      font-weight: 500;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`

const ThreeDotPopup = () => {
  const { deleteNote } = useContext(NotesContext)
  const { note, setNote } = useContext(NoteContext)
  const handleDeleteNote = () => {
    deleteNote(note.id)
    setNote({ title: '', date: '', content: '', id: 0, userId: 0 })
  }
  return (
    <Container>
      <div onClick={() => handleDeleteNote()}>
        <SVGDelete />
        <span>Delete</span>
      </div>
    </Container>
  )
}

export default ThreeDotPopup