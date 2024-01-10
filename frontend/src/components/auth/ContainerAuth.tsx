import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  padding: clamp(60px, 9.5vh, 97px) 0 clamp(27px, 4.6vh, 47px) 0;
  padding-inline: clamp(30px, 4vh, 40px);
  border-radius: clamp(15px, 2vh, 20px);
  border: 1px solid #858585;
  background: linear-gradient(
      321deg,
      rgba(191, 191, 191, 0.06) 5.98%,
      rgba(0, 0, 0, 0) 66.28%
    ),
    rgba(0, 0, 0, 0.14);

  box-shadow: -8px 4px 5px 0px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(26.5px);
`
const ContainerAuth = ({ children }: { children: ReactNode }) => {
  return <Container>{children}</Container>
}
export default ContainerAuth
