import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGClosedFolder from '../svg/SVGClosedFolder'
import SVGOpenedFolder from '../svg/SVGOpenedFolder'

const ListItem = styled.button`
  padding: 10px 20px;
  display: flex;
  gap: ${palette.WHITE_SPACE};
  &:hover {
    background-color: ${palette.BLACK_TERTIARY};
  }
`

const ListItemActive = styled.div`
  padding: 10px 20px;
  display: flex;
  gap: ${palette.WHITE_SPACE};
  color: ${palette.WHITE};
  background-color: ${palette.BLACK_TERTIARY};
`

const ListFolderItem = () => {
  return (
    <>
      <ListItemActive>
        <SVGOpenedFolder />
        <span>This is Active Folder</span>
      </ListItemActive>
      <ListItem>
        <SVGClosedFolder />
        <span>This is Closed Folder</span>
      </ListItem>
    </>
  )
}

export default ListFolderItem
