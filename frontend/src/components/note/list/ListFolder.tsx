import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGAddFolder from '../svg/SVGAddFolder'
import { useState } from 'react'
import ListFolderItem from './ListFolderItem'
import InputFolder from '../input/InputFolder'

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

const ListFolder = () => {
  const [showInputFolder, setShowInputFolder] = useState<Boolean>(false)
  return (
    <Container>
      <Header>
        <span>Folders</span>
        <button onClick={() => setShowInputFolder(true)}>
          <SVGAddFolder />
        </button>
      </Header>
      <List>
        {showInputFolder && (
          <InputFolder value={showInputFolder} setState={setShowInputFolder} />
        )}
        <ListFolderItem />
      </List>
    </Container>
  )
}

export default ListFolder
