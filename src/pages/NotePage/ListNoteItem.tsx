import styled from 'styled-components'
import { NoteFormType } from 'types/types'
import * as palette from '../../assets/Variables'

const NoteStyle = styled.div`
  display: grid;
  grid-template:
    repeat(2, 1fr) / fit-content,
    1fr,
    1fr;
  gap: 10px;
  border-radius: 3px;
  padding: 20px;
  background-color: ${palette.BLACK_SECONDARY};
  cursor: pointer;
  box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
  &:hover {
    background-color: ${palette.BLACK_TERTIARY};
  }
  h2 {
    grid-area: 1/1/2/4;
    font-size: 1.125rem;
    font-weight: 600;
  }
  span:nth-child(2) {
    grid-area: 2/1/3/2;
    color: ${palette.TEXT_TERTIARY};
  }
  p {
    grid-area: 2/2/3/4;
    color: ${palette.TEXT_SECONDARY};
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`

const Note = ({ title, date, content }: NoteFormType) => {
  return (
    <NoteStyle>
      <h2>{title}</h2>
      <span>{date}</span>
      <p>{content}</p>
    </NoteStyle>
  )
}
export default Note
