import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { ReactNode } from 'react'
import { useAppSelector } from 'redux/store'
const Span = styled.span`
  display: block;
  color: ${palette.RED};
  position: absolute;
  bottom: -25px;
  /* opacity: var(--opacityErrNote, 0); */
`

const ErrorElement = ({ name }: { name: string }) => {
  const errorMessage = useAppSelector((state) => {
    if (name === 'title' && state.note.actionError.includes('title')) {
      return state.note.actionError
    }
    if (name === 'date' && state.note.actionError.includes('date')) {
      return state.note.actionError
    }
  })
  return (
    <Span style={{ left: name === 'title' ? '0' : '120px' }}>
      {errorMessage}
    </Span>
  )
}

export default ErrorElement
