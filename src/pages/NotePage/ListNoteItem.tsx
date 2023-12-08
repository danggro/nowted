import styled from 'styled-components'
import { Note } from '../../types/types'
import * as palette from '../../assets/Variables'
import { getLocalSession } from '../../utils/utils'
import { useContext } from 'react'
import { NoteContext } from '../../context/NoteContext'

const NoteStyle = styled.div`
  display: grid;
  grid-template: 1fr 25px / 75px 1fr;
  row-gap: 5px;
  column-gap: 10px;
  border-radius: 3px;
  padding: 20px;
  background-color: ${palette.BLACK_SECONDARY};
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

const ListNoteItem = ({ id, title, date, content }: Note) => {
  const session = getLocalSession()
  const { setNote } = useContext(NoteContext)

  return (
    <NoteStyle
      onClick={() => {
        setNote({ id, title, date, content, userId: session.token, view: true })
      }}
    >
      <h2>{title}</h2>
      <span>{date}</span>
      <p>{content}</p>
    </NoteStyle>
  )
}
export default ListNoteItem
