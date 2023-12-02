import { NoteType } from 'types/types'
import Note from './ListNoteItem'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ListNote = ({ data }: { data: NoteType[] }) => {
  return (
    <Container>
      {data.map((note: NoteType) => {
        return (
          <Note
            key={note.id}
            title={note.title}
            date={note.date}
            content={note.content}
          />
        )
      })}
    </Container>
  )
}
export default ListNote
