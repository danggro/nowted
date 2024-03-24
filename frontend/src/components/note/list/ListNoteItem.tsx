import styled from 'styled-components'
import { Note } from 'types/types'
import * as palette from 'assets/Variables'
import { getLocalSession } from 'utils/utils'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { setNoteAction } from 'redux/actions/noteActions'
import { useEffect } from 'react'

const NoteStyle = styled.div<{ selected: boolean }>`
  display: grid;
  grid-template: 1fr 25px / 75px 1fr;
  row-gap: clamp(0px, 1.2vw, 5px);
  column-gap: 10px;
  border-radius: 3px;
  padding: ${palette.WHITE_SPACE};
  width: 300px;
  background-color: ${({ selected }) =>
    selected ? palette.BLACK_TERTIARY : palette.BLACK_SECONDARY};

  cursor: pointer;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: ${palette.BLACK_TERTIARY};
  }
  h2 {
    grid-area: 1/1/2/3;
    font-size: 1.125rem;
    font-weight: 600;
  }
  span {
    grid-area: 2/1/3/2;
    color: ${palette.TEXT_TERTIARY};
  }
  p {
    grid-area: 2/2/3/3;
    color: ${palette.TEXT_SECONDARY};
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`
interface Props extends Note {
  select: number
  setSelect: React.Dispatch<React.SetStateAction<number>>
}
const ListNoteItem = ({
  id,
  title,
  date,
  content,
  folderId,
  select,
  setSelect,
}: Props) => {
  const session = getLocalSession()
  const dispatch = useAppDispatch()
  const note = useAppSelector((state) => state.note.note)
  useEffect(() => {
    setSelect(note.id as number)
  }, [note.id])
  return (
    <NoteStyle
      onClick={() => {
        dispatch(
          setNoteAction({
            id,
            title,
            date,
            content,
            userId: session?.userId,
            view: true,
            folderId,
          })
        )
        setSelect(id as number)
      }}
      className="test-note"
      selected={select === id && (note.id as number) > 0}
    >
      <h2>{title}</h2>
      <span>{date}</span>
      <p>{content}</p>
    </NoteStyle>
  )
}
export default ListNoteItem
