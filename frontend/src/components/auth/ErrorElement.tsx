import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { useAppSelector } from 'redux/store'

const Span = styled.span`
  display: block;
  color: ${palette.RED};
  position: absolute;
  bottom: -27px;
  left: 15px;
`

const ErrorElement = ({ id }: { id: string }) => {
  const error = useAppSelector((state) => state.auth.authError)

  const filterInput = (): string => {
    if (error.username && id === 'username') {
      return error.username
    }
    if (error.email && id === 'email') {
      return error.email
    }
    if (error.password && id === 'password') {
      return error.password
    }
    return ''
  }

  return <Span>{filterInput()}</Span>
}

export default ErrorElement
