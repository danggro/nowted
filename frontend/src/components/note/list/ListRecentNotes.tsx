import { useState } from 'react'
import { Note } from 'types/types'
import ListRecentNotesItem from './ListRecentNotesItem'
import { ContainerList, HeaderList, List } from './ListComponents'

const ListRecentNotes = ({ data }: { data: Note[] }) => {
  const [select, setSelect] = useState<number>(0)
  const filteredRecentNotes = () => {
    const orderedNotes = data.sort(
      (a, b) =>
        new Date(b.updatedAt as string).getTime() -
        new Date(a.updatedAt as string).getTime()
    )
    return orderedNotes.slice(0, 3)
  }

  return (
    <ContainerList>
      <HeaderList>
        <span>Recents</span>
      </HeaderList>
      <List>
        {filteredRecentNotes().map((note) => {
          return (
            <ListRecentNotesItem
              key={note.id}
              note={note}
              select={select}
              setSelect={setSelect}
            />
          )
        })}
      </List>
    </ContainerList>
  )
}

export default ListRecentNotes
