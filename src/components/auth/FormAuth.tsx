import { ReactNode } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 25px;
`
const FormAuth = ({ children }: { children: ReactNode }) => {
  return <Form>{children}</Form>
}
export default FormAuth
