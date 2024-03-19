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
  folder: string
  setFolder: React.Dispatch<React.SetStateAction<string>>
}

const SelectFolder = (props: Props) => {
  const foldersName = useAppSelector((state) =>
    state.folder.folders.map((folder) => folder.name)
  )

  return (
    <SelectFolderContainer>
      <SVGClosedFolder />
      <span>Folder</span>
      <select
        name="folder-select"
        id="folder-select"
        value={props.folder}
        onChange={({ target }) => props.setFolder(target.value)}
      >
        {foldersName.map((folder, index) => (
          <option key={index} value={folder}>
            {folder}
          </option>
        ))}
      </select>
    </SelectFolderContainer>
  )
}

export default SelectFolder
