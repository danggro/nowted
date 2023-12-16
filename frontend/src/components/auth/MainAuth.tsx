import { ReactNode } from 'react'
import styled from 'styled-components'

const Main = styled.main<{ page: string }>`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: var(--black);
  color: var(--white);
  position: relative;
  z-index: 0;
  &::before {
    content: '';
    width: 302px;
    height: 302px;
    position: absolute;
    border-radius: 302px;
    top: 15%;
    right: 25%;
    z-index: -1;

    background: ${({ page }) =>
      page === 'login'
        ? 'linear-gradient(180deg, #530061 0%, #0d0a30 100%)'
        : 'linear-gradient(180deg, #190061 0%, #0a1b30 100%)'};
  }

  &::after {
    content: '';
    width: 220px;
    height: 220px;
    position: absolute;
    border-radius: 220px;
    bottom: 15%;
    left: 25%;
    z-index: -1;
    background: ${({ page }) =>
      page === 'login'
        ? 'linear-gradient(180deg, #530061 0%, #0d0a30 100%)'
        : 'linear-gradient(180deg, #190061 0%, #0a1b30 100%)'};
  }
`

const MainAuth = ({
  children,
  page,
}: {
  children: ReactNode
  page: string
}) => {
  return <Main page={page}>{children}</Main>
}
export default MainAuth
