import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { useAppDispatch } from 'redux/store'
import { clearMessage } from 'redux/actions/authActions'

const Span = styled.span<{ page: string }>`
  text-align: center;
  margin-top: clamp(20px, 4.88vh, 50px);
  font-weight: 500;
  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
      background: ${({ page }) =>
        page === 'login' ? palette.GRADIENT_LOGIN : palette.GRADIENT_SIGNUP};
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`

const AnotherAuth = ({
  someText,
  to,
  textTo,
  page,
}: {
  someText: string
  to: string
  textTo: string
  page: string
}) => {
  const dispatch = useAppDispatch()
  return (
    <Span page={page}>
      {someText}{' '}
      <Link to={to} onClick={() => dispatch(clearMessage())}>
        {textTo}
      </Link>
    </Span>
  )
}
export default AnotherAuth
