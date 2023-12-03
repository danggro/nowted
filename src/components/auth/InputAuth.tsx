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

interface Props {
  type: string
  placeholder: string
  id: string
  name: string
  value: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const InputAuth = (props: Props) => {
  const { type, placeholder, id, name, value, setState } = props
  return (
    <Input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      value={value}
      onChange={({ target }) => setState(target.value)}
    />
  )
}
export default InputAuth
