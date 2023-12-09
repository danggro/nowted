import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { styleInputError } from 'utils/utils'
import { useEffect } from 'react'

const Input = styled.input`
  font-size: 2rem;
  font-weight: 600;
  width: 95%;
  border-bottom: 2px solid transparent;
  &:focus {
    border-bottom: 2px solid ${palette.BLACK_TERTIARY};
  }
`

const ErrorElement = styled.span`
  display: block;
  color: ${palette.RED};
  position: absolute;
  bottom: -20px;
  left: 0;
  opacity: var(--opacityErrNote, 0);
`

interface Props {
  value: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const InputTitle = (props: Props) => {
  useEffect(() => {
    const errorElement = document.getElementById('title')
      ?.nextElementSibling as HTMLSpanElement
    styleInputError(errorElement).valid()
  }, [props.value])

  return (
    <div style={{ position: 'relative' }}>
      <Input
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={props.value}
        onChange={({ target }) => {
          props.setState(target.value)
          styleInputError(target.nextElementSibling as HTMLSpanElement).valid()
        }}
      />
      <ErrorElement></ErrorElement>
    </div>
  )
}

export default InputTitle
