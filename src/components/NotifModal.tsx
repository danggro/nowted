import styled from 'styled-components'
import * as palette from 'assets/Variables'
const Container = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  background-color: ${palette.BLACK_SECONDARY};
  padding: 15px 30px;
  border-radius: 5px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.2);
  span {
    font-weight: 600;
  }
`

const NotifModal = ({ message }: { message: string }) => {
  if (!message) return null
  return (
    <>
      <Container>
        <span>{message}</span>
      </Container>
    </>
  )
}

export default NotifModal
