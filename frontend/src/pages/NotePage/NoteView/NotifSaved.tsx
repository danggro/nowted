import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { useEffect } from 'react'
import { clearMessage } from 'redux/actions/noteActions'
const Container = styled.div`
  padding: 20px 30px;
  background-color: ${palette.BLACK_SECONDARY};
  border-radius: 5px;
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  right: 40px;
  transition: all 450ms ease-in-out;
  span {
    font-weight: 600;
  }
`

const NotifSaved = () => {
  const dispatch = useAppDispatch()
  const success = useAppSelector((state) => state.note.successMessage)

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearMessage())
    }, 2500)
  }, [success])

  const style = {
    transform: success ? 'translateY(40%)' : 'translateY(-100%)',
  }
  return (
    <Container style={style}>
      <span>Note Saved</span>
    </Container>
  )
}

export default NotifSaved
