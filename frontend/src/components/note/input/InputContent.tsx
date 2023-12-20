import styled from 'styled-components'
import * as palette from 'assets/Variables'

const Input = styled.textarea`
  width: 100%;
  height: 100%;
  line-height: 1.75;
  padding-left: 5px;
  margin-left: -5px;
  border-left: 2px solid transparent;

  &:focus {
    border-left: 2px solid ${palette.BLACK_TERTIARY};
    background-color: ${palette.BLACK_SECONDARY};
  }
  &::-webkit-scrollbar {
    display: none;
  }
`

interface Props {
  value: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const InputContent = (props: Props) => {
  return (
    <Input
      id="content"
      name="content"
      placeholder="Write in"
      value={props.value}
      spellCheck="false"
      onChange={({ target }) => props.setState(target.value)}
    />
  )
}

export default InputContent
