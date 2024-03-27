import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGFile from '../svg/SVGFile'
import { useAppSelector } from 'redux/store'
import SVGArchived from '../svg/SVGArchived'
import SVGStar from '../svg/SVGStar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 100%;
  gap: ${palette.WHITE_SPACE};
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    text-align: center;
  }
  svg {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    color: ${palette.WHITE};
  }
`

const ListNoNote = () => {
  const favorite = useAppSelector((state) => state.folder.favorite)
  const archived = useAppSelector((state) => state.folder.archived)
  return (
    <Container>
      {favorite ? (
        <>
          <SVGStar />
          <h2>Give favorite mark to certain note</h2>
        </>
      ) : archived ? (
        <>
          <SVGArchived />
          <h2>Archive certain note</h2>
        </>
      ) : (
        <>
          <SVGFile />
          <h2>Create a new note</h2>
        </>
      )}
    </Container>
  )
}
export default ListNoNote
