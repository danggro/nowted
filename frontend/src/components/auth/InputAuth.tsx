import styled from 'styled-components'
import * as palette from 'assets/Variables'
import ErrorElement from './ErrorElement'

const Input = styled.input`
  border-radius: 12px;
  border: 1px solid ${palette.WHITE};
  padding: 14px 16px;
  color: ${palette.WHITE};
  width: 100%;
  &::placeholder {
    color: var(--placeholderColor, ${palette.WHITE});
    opacity: 1;
  }
`

const Container = styled.div`
  position: relative;
`

interface Props {
  type: string
  placeholder: string
  id: string
  name: string
  value: string
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  minlength?: number
}

const InputAuth = (props: Props) => {
  const { type, placeholder, id, name, value, onChange, minlength } = props

  return (
    <Container>
      <Input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        minLength={minlength}
        autoComplete="on"
      />
      <ErrorElement id={id} />
    </Container>
  )
}
export default InputAuth
