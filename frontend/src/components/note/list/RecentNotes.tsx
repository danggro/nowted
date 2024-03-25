import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { useState } from 'react'
import { Note } from 'types/types'
import RecentNotesItem from './RecentNotesItem'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${palette.TEXT_SECONDARY};
  span {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }
`

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 14px;
  }
  button:hover {
    color: ${palette.WHITE};
  }
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const RecentNotes = ({ data }: { data: Note[] }) => {
  const [select, setSelect] = useState<number>(0)
  const filteredRecentNotes = () => {
    const orderedNotes = data.sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    return orderedNotes.slice(0, 3)
  }

  return (
    <Container>
      <Header>
        <span>Recents</span>
      </Header>
      <List>
        {filteredRecentNotes().map((note) => {
          return (
            <RecentNotesItem
              key={note.id}
              note={note}
              select={select}
              setSelect={setSelect}
            />
          )
        })}
      </List>
    </Container>
  )
}

export default RecentNotes
