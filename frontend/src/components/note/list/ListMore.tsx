import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { Note } from 'types/types'
import { useAppSelector } from 'redux/store'
import ListMoreItem from './ListMoreItem'

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

const ListMore = () => {
  const favorite = useAppSelector((state) => state.folder.favorite)
  const archived = useAppSelector((state) => state.folder.archived)

  return (
    <Container>
      <Header>
        <span>More</span>
      </Header>
      <List>
        <ListMoreItem title="Favorites" state={favorite} />
        <ListMoreItem title="Archived Notes" state={archived} />
      </List>
    </Container>
  )
}

export default ListMore
