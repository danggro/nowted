/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as palette from '../../assets/Variables'

const Span = styled.span<{ page: string }>`
  text-align: center;
  margin-top: 50px;
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
  return (
    <Span page={page}>
      {someText} <Link to={to}>{textTo}</Link>
    </Span>
  )
}
export default AnotherAuth
