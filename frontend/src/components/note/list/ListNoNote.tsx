import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGFile from '../svg/SVGFile'

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
`

const ListNoNote = () => {
  return (
    <Container>
      <SVGFile />
      <h2>Create a new note</h2>
    </Container>
  )
}
export default ListNoNote
