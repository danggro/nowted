import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGOpenedFolder from '../svg/SVGOpenedFolder'
import { keyPressEnter } from 'utils/utils'
import { useAppDispatch } from 'redux/store'
import { addFolderAction } from 'redux/actions/folderActions'
import { useState } from 'react'

const ContainerInputFolder = styled.div`
  padding: 10px 20px;
  display: flex;
  gap: ${palette.WHITE_SPACE};
  color: ${palette.WHITE};
  background-color: ${palette.BLACK_TERTIARY};
  svg {
    flex-shrink: 0;
  }
`

const InputFolderTag = styled.input`
  display: flex;
  color: ${palette.WHITE};
  font-weight: 600;
  width: 100%;
  background-color: ${palette.BLACK_TERTIARY};
`
interface Props {
  value: Boolean
  setState: React.Dispatch<React.SetStateAction<Boolean>>
}

const InputFolder = (props: Props) => {
  const [folder, setFolder] = useState<string>('')
  const dispatch = useAppDispatch()
  return (
    <ContainerInputFolder>
      <SVGOpenedFolder />
      <InputFolderTag
        autoFocus
        onKeyDown={(e) =>
          keyPressEnter(e, () => {
            props.setState(!props.value)
            dispatch(
              addFolderAction({
                name: folder,
              })
            )
          })
        }
        onBlur={() => {
          props.setState(!props.value)
          dispatch(
            addFolderAction({
              name: folder,
            })
          )
        }}
        value={folder}
        onChange={({ target }) => setFolder(target.value)}
        id="input-folder"
        name="input-folder"
        placeholder="New Folder"
      />
    </ContainerInputFolder>
  )
}

export default InputFolder
