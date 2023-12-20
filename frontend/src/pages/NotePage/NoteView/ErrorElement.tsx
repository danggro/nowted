import styled from 'styled-components'
import * as palette from 'assets/Variables'
import { useAppSelector } from 'redux/store'
const Span = styled.span`
  display: block;
  color: ${palette.RED};
  position: absolute;
  bottom: -25px;
  /* opacity: var(--opacityErrNote, 0); */
`

const ErrorElement = ({ name }: { name: string }) => {
  const error = useAppSelector((state) => state.note.actionError)

  const filterInput = () => {
    if (error.title && name === 'title') {
      return error.title
    }
    if (error.date && name === 'date') {
      return error.date
    }
  }
  return (
    <Span style={{ left: name === 'title' ? '0' : '120px' }}>
      {filterInput()}
    </Span>
  )
}

export default ErrorElement
