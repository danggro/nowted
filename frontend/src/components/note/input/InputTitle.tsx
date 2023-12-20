import styled from 'styled-components'
import * as palette from 'assets/Variables'
import ErrorElement from './ErrorElement'
import { useAppDispatch, useAppSelector } from 'redux/store'
import { setActionError } from 'redux/actions/noteActions'

const Input = styled.input`
  font-size: 2rem;
  font-weight: 600;
  width: 95%;
  border-bottom: 2px solid transparent;
  &:focus {
    border-bottom: 2px solid ${palette.BLACK_TERTIARY};
  }
`

interface Props {
  value: string
  setState: React.Dispatch<React.SetStateAction<string>>
}

const InputTitle = (props: Props) => {
  const dispatch = useAppDispatch()
  const actionError = useAppSelector((state) => state.note.actionError)
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
          if (!target.value) {
            return dispatch(
              setActionError({ title: 'Title empty', date: actionError.date })
            )
          }
          return dispatch(setActionError({ title: '', date: actionError.date }))
        }}
      />
      <ErrorElement name="title" />
    </div>
  )
}

export default InputTitle
