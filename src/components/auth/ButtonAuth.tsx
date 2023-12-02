// eslint-disable-next-line import/no-named-as-default
import styled from 'styled-components'
import * as palette from '../../assets/Variables'

const Button = styled.button`
  text-align: center;
  padding: 14px 10px;
  border-radius: 12px;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 1px;

  &:hover {
    opacity: 0.8;
  }
`
const ButtonAuth = ({ children, page }: { children: string; page: string }) => {
  const stylePage =
    page === 'login'
      ? { background: palette.GRADIENT_LOGIN }
      : { background: palette.GRADIENT_SIGNUP }

  return (
    <Button style={stylePage} type="submit">
      {children}
    </Button>
  )
}
export default ButtonAuth
