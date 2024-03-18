import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGClosedFolder from '../svg/SVGClosedFolder'
import SVGOpenedFolder from '../svg/SVGOpenedFolder'
import { Folder } from 'types/types'
import { useAppDispatch, useAppSelector } from 'redux/store'
import {
  deleteFolderAction,
  selectFolderAction,
} from 'redux/actions/folderActions'
import SVGDelete from '../svg/SVGDelete'

const ListItem = styled.button`
  padding: 10px 20px;
  display: flex;
  align-items: center;
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
  align-items: center;
  span {
    width: 100%;
  }
  svg {
    flex-shrink: 0;
  }
`

const BtnDelete = styled.button`
  height: 20px;
  &:hover {
    opacity: 0.7;
  }
`

const ListFolderItem = ({ folder }: { folder: Folder }) => {
  const dispatch = useAppDispatch()
  const activeFolder = useAppSelector((state) => state.folder.folder.active)
  const folderId = useAppSelector((state) => state.folder.folder.id)

  return (
    <>
      {activeFolder && folderId === folder.id ? (
        <ListItemActive>
          <SVGOpenedFolder />
          <span>{folder.name}</span>
          <BtnDelete onClick={() => dispatch(deleteFolderAction(folder.id))}>
            <SVGDelete />
          </BtnDelete>
        </ListItemActive>
      ) : (
        <ListItem onClick={() => dispatch(selectFolderAction(folder))}>
          <SVGClosedFolder />
          <span>{folder.name}</span>
        </ListItem>
      )}
    </>
  )
}

export default ListFolderItem
