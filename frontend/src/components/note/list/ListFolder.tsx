import SVGAddFolder from '../svg/SVGAddFolder'
import { useState } from 'react'
import ListFolderItem from './ListFolderItem'
import InputFolder from '../input/InputFolder'
import { Folder } from 'types/types'
import { ContainerList, HeaderList, List } from './ListComponents'

const ListFolder = ({ data }: { data: Folder[] }) => {
  const [showInputFolder, setShowInputFolder] = useState<boolean>(false)

  return (
    <ContainerList>
      <HeaderList>
        <span>Folders</span>
        <button onClick={() => setShowInputFolder(true)}>
          <SVGAddFolder />
        </button>
      </HeaderList>
      <List>
        {showInputFolder && (
          <InputFolder value={showInputFolder} setState={setShowInputFolder} />
        )}
        {data.map((folder) => {
          return <ListFolderItem key={folder.id} folder={folder} />
        })}
      </List>
    </ContainerList>
  )
}

export default ListFolder
