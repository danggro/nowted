import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGClosedFolder from '../svg/SVGClosedFolder'
import { useAppSelector } from 'redux/store'

const SelectFolderContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.TEXT_SECONDARY};
  position: relative;
  & > span {
    margin-left: 20px;
    margin-right: 60px;
    font-weight: 600;
  }
  select {
    width: 126px;
    cursor: pointer;
  }
`

interface Props {
  folder: number
  setFolder: React.Dispatch<React.SetStateAction<number>>
  setSelectFolder: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectFolder = (props: Props) => {
  const folders = useAppSelector((state) => state.folder.folders)

  return (
    <SelectFolderContainer>
      <SVGClosedFolder />
      <span>Folder</span>
      <select
        name="folder-select"
        id="folder-select"
        value={String(props.folder)}
        onChange={({ target }) => {
          props.setFolder(Number(target.value))
          props.setSelectFolder(false)
        }}
      >
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </SelectFolderContainer>
  )
}

export default SelectFolder
