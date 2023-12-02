import styled from 'styled-components'
import logoSrc from '../../assets/logo.png'
import * as palette from '../../assets/Variables'
import SVGAdd from './SVGAdd'

const Header = styled.header`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 0;
  background-color: ${palette.BLACK};
`

const Button = styled.button`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 3px;
  background-color: ${palette.BLACK_SECONDARY};
  cursor: pointer;
  &:hover {
    background-color: ${palette.BLACK_TERTIARY};
  }
`

const HeaderNotePage = () => {
  return (
    <Header>
      <img
        src={logoSrc}
        alt="logo-application"
        style={{ width: 'fit-content' }}
      />
      <Button>
        <SVGAdd />
        <span>New Note</span>
      </Button>
    </Header>
  )
}
export default HeaderNotePage
