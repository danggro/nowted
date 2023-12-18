import styled from 'styled-components'
import SVGDelete from '../SVG/SVGDelete'
import * as palette from 'assets/Variables'
import { deleteNoteAction } from 'redux/actions/noteActions'
import { useAppDispatch, useAppSelector } from 'redux/store'

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
  & > button {
    display: flex;
    gap: 15px;
    cursor: pointer;
    width: 100%;
    padding: 15px;
    align-items: center;
    & > span {
      font-weight: 500;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`

const ThreeDotPopup = () => {
  const dispatch = useAppDispatch()
  const note = useAppSelector((state) => state.note.note)

  const handleDeleteNote = () => {
    dispatch(deleteNoteAction(note.id as number))
  }
  return (
    <Container>
      <button onClick={() => handleDeleteNote()}>
        <SVGDelete />
        <span>Delete</span>
      </button>
    </Container>
  )
}

export default ThreeDotPopup
