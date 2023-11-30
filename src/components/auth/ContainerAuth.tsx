import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  padding: 97px 40px 47px 40px;
  border-radius: 20px;
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
