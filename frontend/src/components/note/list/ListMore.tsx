import { useAppSelector } from 'redux/store'
import ListMoreItem from './ListMoreItem'
import { ContainerList, HeaderList, List } from './ListComponents'

const ListMore = () => {
  const favorite = useAppSelector((state) => state.folder.favorite)
  const archived = useAppSelector((state) => state.folder.archived)

  return (
    <ContainerList>
      <HeaderList>
        <span>More</span>
      </HeaderList>
      <List>
        <ListMoreItem title="Favorites" state={favorite} />
        <ListMoreItem title="Archived Notes" state={archived} />
      </List>
    </ContainerList>
  )
}

export default ListMore
