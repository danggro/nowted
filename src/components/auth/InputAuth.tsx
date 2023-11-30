import styled from 'styled-components'

const Input = styled.input`
  border-radius: 12px;
  border: 1px solid var(--white);
  padding: 14px 16px;
  color: var(--white);
  &::placeholder {
    color: var(--white);
    opacity: 1;
  }
`

const InputAuth = ({
  type,
  placeholder,
  id,
  name,
}: {
  type: string
  placeholder: string
  id: string
  name: string
}) => {
  return <Input type={type} placeholder={placeholder} id={id} name={name} />
}
export default InputAuth
