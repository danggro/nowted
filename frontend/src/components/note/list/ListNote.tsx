import { Note } from 'types/types'
import ListNoteItem from './ListNoteItem'
import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { useState } from 'react'

const Container = styled.div`
  padding: ${palette.WHITE_SPACE};
  display: flex;
  flex-direction: column;
  gap: ${palette.WHITE_SPACE};
  background-color: rgba(255, 255, 255, 0.015);
`

const TitleFolder = styled.div`
  font-size: 20px;
  font-weight: 600;
`

const ListNote = ({ data }: { data: Note[] }) => {
  const [select, setSelect] = useState<number>(0)

  return (
    <Container>
      <TitleFolder>Folder</TitleFolder>
      {data.map((note: Note) => {
        return (
          <ListNoteItem
            key={note.id}
            id={note.id}
            title={note.title}
            date={note.date}
            content={note.content}
            select={select}
            setSelect={setSelect}
          />
        )
      })}
    </Container>
  )
}
export default ListNote
