import { Note } from 'types/types'
import ListNoteItem from './ListNoteItem'
import styled from 'styled-components'
import * as palette from 'assets/Variables'
const Container = styled.div`
  padding: ${palette.WHITE_SPACE};
  display: flex;
  flex-direction: column;
  gap: ${palette.WHITE_SPACE};
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
