import styled from 'styled-components'
import * as palette from 'assets/Variables'
const Container = styled.div`
  background-color: ${palette.BLACK};
  color: ${palette.WHITE};
  height: 100vh;
  display: grid;
  place-items: center;
  h1 {
    text-align: center;
    font-size: 8rem;
    font-weight: 700;
    line-height: 1;
  }
  h2 {
    font-size: 5rem;
    font-weight: 500;
    line-height: 1;
  }
`

const NotFound404 = () => {
  return (
    <Container>
      <div>
        <h1>404</h1>
        <h2>Not Found</h2>
      </div>
    </Container>
  )
}

export default NotFound404
