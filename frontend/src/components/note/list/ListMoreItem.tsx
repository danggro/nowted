import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { selectMoreAction, setActiveAction } from 'redux/actions/folderActions'
import SVGStar from '../svg/SVGStar'
import { setNoteAction } from 'redux/actions/noteActions'
import SVGArchived from '../svg/SVGArchived'

const ListItem = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: ${palette.WHITE_SPACE};
  background-color: ${({ selected }) =>
    selected ? palette.BLACK_TERTIARY : 'transparent'};
  color: ${({ selected }) => (selected ? palette.WHITE : 'inherit')};
  &:hover {
    background-color: ${palette.BLACK_TERTIARY};
    color: ${palette.WHITE};
  }
  svg {
    width: 20px;
    height: 20px;
  }
`

interface Props {
  title: string
  state: boolean
  // handleChangeListNote: () => void
}

const ListMoreItem = ({ title, state }: Props) => {
  const dispatch = useAppDispatch()
  const noteState = useAppSelector((state) => state.note.note)
  return (
    <ListItem
      selected={state}
      onClick={() => {
        dispatch(
          setNoteAction({
            ...noteState,
            id: 0,
          })
        )
        dispatch(setActiveAction(false))
        let favorite: boolean = false
        let archived: boolean = false
        if (title === 'Favorites') favorite = true
        if (title === 'Archived Notes') archived = true
        dispatch(selectMoreAction({ favorite, archived }))
        // handleChangeListNote()
      }}
    >
      {title === 'Favorites' ? <SVGStar /> : <SVGArchived />}
      <span>{title}</span>
    </ListItem>
  )
}

export default ListMoreItem
