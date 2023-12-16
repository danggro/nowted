import styled from 'styled-components'
import * as palette from 'assets/Variables'

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

const ErrorElement = styled.span`
  color: ${palette.RED};
  font-size: 0.9rem;
  display: block;
  opacity: var(--opacityErr, 0);
  position: absolute;
  bottom: -25px;
  left: 15px;
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
    <Container className="contInput">
      <Input
        type={type}
        placeholder={placeholder}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        minLength={minlength}
      />
      <ErrorElement>error</ErrorElement>
    </Container>
  )
}
export default InputAuth
