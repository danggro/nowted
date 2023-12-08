import { Note } from 'types/types'
import ListNoteItem from './ListNoteItem'
import styled from 'styled-components'

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const ListNote = ({ data }: { data: Note[] }) => {
  return (
    <Container>
      {data.map((note: Note) => {
        return (
          <ListNoteItem
            key={note.id}
            id={note.id}
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
