import styled from 'styled-components'
import * as palette from '../../../assets/Variables'
import SVGFile from '../SVG/SVGFile'

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100%;
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    text-align: center;
  }
  p {
    line-height: 26px;
    text-align: center;
    color: ${palette.TEXT_SECONDARY};
    width: 460px;
  }
  div {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
`

const NoteNoView = () => {
  return (
    <Container>
      <div>
        <SVGFile />
        <h2>Select a note to view</h2>
        <p>
          Choose a note from the list on the left to view its contents, or
          create a new note to add to your collection.
        </p>
      </div>
    </Container>
  )
}

export default NoteNoView
