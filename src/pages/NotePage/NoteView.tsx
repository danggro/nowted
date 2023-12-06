import { Note } from '../../types/types'
import styled from 'styled-components'
import SVGDate from './SVGDate'
import * as palette from '../../assets/Variables'
import NoteNoView from './NoteNoView'
import { useContext, useState } from 'react'
import { NoteContext } from '../../context/NoteContext'
import SVGThreeDot from './SVGThreeDot'
import ThreeDotPopup from './ThreeDotPopup'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
  position: relative;
`

const Input = styled.input`
  color: var(--white);
`

const InputTitle = styled(Input)`
  font-size: 2rem;
  font-weight: 600;
`

const InputDate = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.TEXT_SECONDARY};
  input::placeholder {
    color: ${palette.TEXT_SECONDARY} !important;
    opacity: 1;
  }
  span {
    margin-left: 20px;
    margin-right: 60px;
  }
`

const InputContent = styled.textarea`
  width: 100%;
  height: 100%;
  line-height: 1.75;
`

const ThreeDotContainer = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 5px;
  border-radius: 150px;
  border: 1px solid ${palette.TEXT_SECONDARY};
  color: ${palette.TEXT_SECONDARY};
  display: grid;
  place-items: center;
  cursor: pointer;
  position: absolute;
  right: 50px;
`

const NoteView = () => {
  const { note } = useContext(NoteContext)
  const [popup, setPopup] = useState<Boolean>(false)

  if (!note.title) {
    return <NoteNoView />
  }

  return (
    <Container>
      {popup ? <ThreeDotPopup /> : null}
      <ThreeDotContainer onClick={() => setPopup(!popup)}>
        <SVGThreeDot />
      </ThreeDotContainer>
      <InputTitle
        type="text"
        id="title"
        name="title"
        placeholder={note.title}
        value={note.title}
      />
      <InputDate>
        <SVGDate />
        <span>Date</span>
        <input
          type="text"
          id="date"
          name="date"
          placeholder={note.date}
          value={note.date}
        />
      </InputDate>
      <InputContent
        id="content"
        name="content"
        placeholder={note.content}
        value={note.content}
      />
    </Container>
  )
}
export default NoteView
