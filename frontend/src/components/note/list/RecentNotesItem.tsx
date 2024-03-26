import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGFile from '../svg/SVGFile'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { useEffect } from 'react'
import { setNoteAction } from 'redux/actions/noteActions'
import { Note } from 'types/types'
import {
  selectFolderAction,
  selectMoreAction,
} from 'redux/actions/folderActions'

const ListItem = styled.button<{ selected: boolean }>`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: ${palette.WHITE_SPACE};
  background-color: ${({ selected }) =>
    selected ? palette.BLUE : 'transparent'};
  color: ${({ selected }) => (selected ? palette.WHITE : 'inherit')};
  &:hover {
    background-color: ${palette.BLUE};
    color: ${palette.WHITE};
  }
  svg {
    width: 20px;
    height: 20px;
  }
`

interface Props {
  select: number
  setSelect: React.Dispatch<React.SetStateAction<number>>
  note: Note
}

const RecentNotesItem = ({ note, select, setSelect }: Props) => {
  const dispatch = useAppDispatch()
  const noteState = useAppSelector((state) => state.note.note)
  useEffect(() => {
    setSelect(noteState.id as number)
  }, [noteState.id])
  return (
    <ListItem
      selected={select === note.id && (noteState.id as number) > 0}
      onClick={() => {
        dispatch(
          setNoteAction({
            ...note,
            view: true,
          })
        )
        dispatch(selectFolderAction(note.folderId))
        setSelect(note.id as number)
        dispatch(selectMoreAction({ favorite: false, archived: false }))
      }}
    >
      <SVGFile />
      <span>{note.title}</span>
    </ListItem>
  )
}

export default RecentNotesItem
