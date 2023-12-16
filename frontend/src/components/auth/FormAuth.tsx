import { ReactNode } from 'react'
import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 35px;
  margin-top: 25px;
`
const FormAuth = ({
  children,
  onSubmit,
}: {
  children: ReactNode
  onSubmit: (e: React.SyntheticEvent) => void
}) => {
  return <Form onSubmit={onSubmit}>{children}</Form>
}
export default FormAuth
