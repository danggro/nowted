import styled from 'styled-components'
import SVGDelete from '../svg/SVGDelete'
import * as palette from 'assets/Variables'
import { deleteNoteAction, updateNoteAction } from 'redux/actions/noteActions'
import { useAppDispatch, useAppSelector } from 'redux/store'
import SVGStar from '../svg/SVGStar'
import SVGArchived from '../svg/SVGArchived'

const Container = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  align-items: flex-start;
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
      color: ${palette.WHITE};
    }
    svg {
      color: ${palette.WHITE};
    }
  }
`

const ThreeDotPopup = () => {
  const dispatch = useAppDispatch()
  const note = useAppSelector((state) => state.note.note)

  return (
    <Container>
      <button
        onClick={() => {
          const favorite: boolean = !note.favorite
          dispatch(updateNoteAction({ ...note, favorite }))
        }}
      >
        <SVGStar />
        <span>Favorite</span>
      </button>
      <button
        onClick={() => {
          const archived: boolean = !note.archived
          dispatch(updateNoteAction({ ...note, archived }))
        }}
      >
        <SVGArchived />
        <span>Archived</span>
      </button>
      <button onClick={() => dispatch(deleteNoteAction(note.id as number))}>
        <SVGDelete />
        <span>Delete</span>
      </button>
    </Container>
  )
}

export default ThreeDotPopup
