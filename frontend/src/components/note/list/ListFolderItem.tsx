import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGClosedFolder from '../svg/SVGClosedFolder'
import SVGOpenedFolder from '../svg/SVGOpenedFolder'
import { Folder } from 'types/types'

const ListItem = styled.button`
  padding: 10px 20px;
  display: flex;
  gap: ${palette.WHITE_SPACE};
  &:hover {
    background-color: ${palette.BLACK_TERTIARY};
    color: ${palette.WHITE};
  }
`

const ListItemActive = styled.div`
  padding: 10px 20px;
  display: flex;
  gap: ${palette.WHITE_SPACE};
  color: ${palette.WHITE};
  background-color: ${palette.BLACK_TERTIARY};
`

const ListFolderItem = ({ folder }: { folder: Folder }) => {
  return (
    <>
      {/* <ListItemActive>
        <SVGOpenedFolder />
        <span>This is Active Folder</span>
      </ListItemActive> */}
      {folder.name && (
        <ListItem>
          <SVGClosedFolder />
          <span>{folder.name}</span>
        </ListItem>
      )}
    </>
  )
}

export default ListFolderItem
